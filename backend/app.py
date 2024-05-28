from fastapi import FastAPI, Request, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Form
from fastapi import BackgroundTasks

from dotenv import load_dotenv
import os

from src.gemini import Gemini
from src.prompt import speech_prompt, get_pronunciation_analysis_prompt
from text_processing import remove_substrings

from slowapi.errors import RateLimitExceeded
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address

import aiofiles
import json

load_dotenv()

app = FastAPI()

origins = ["https://accent-ace.vercel.app", "http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

gemini = Gemini(api_key=os.environ['GEMINI_API_KEY'])

async def delete_gemini_file_in_background(gemini, file_name):
    print("Deleting file in background...")
    gemini.delete_file(file_name)


@app.get("/")
@limiter.limit("5/minute")
def root(request: Request) -> dict:
    prompt = speech_prompt()
    try:
        response = gemini.generate_content(prompt)
    except Exception as e:
        response = f"An error occurred: {str(e)}"
        return {"error": response, "status": 500}
    return {"speech": response}


@app.post("/analyse_voice")
@limiter.limit("3/minute")
async def analyse_voice(background_tasks: BackgroundTasks, request: Request, speech_text: str = Form(...), audio_file: UploadFile=File(...)) -> dict:
    out_file_path = f"uploads/{audio_file.filename}"
    async with aiofiles.open(out_file_path, 'wb') as out_file:
        content = await audio_file.read()  
        await out_file.write(content) 

    try:
        uploaded_file = gemini.upload_file(out_file_path, audio_file.filename)

        prompt = get_pronunciation_analysis_prompt(speech_text)

        result = gemini.infer(prompt, uploaded_file)
        result = remove_substrings(result, ["```", "json"])
        result = json.loads(result)
        
        background_tasks.add_task(delete_gemini_file_in_background, gemini, uploaded_file)
 
        return result
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}", "status": 500}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=int(os.environ.get("PORT", 8080)), reload=True)

    