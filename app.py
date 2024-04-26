from fastapi import FastAPI, Request, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from dotenv import load_dotenv
import os

from src.gemini import Gemini
from src.prompt import speech_prompt

from slowapi.errors import RateLimitExceeded
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address

import aiofiles


load_dotenv()

app = FastAPI()

origins = ["http://localhost:3000", "http://127.0.0.1:3000"]

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

@app.get("/")
@limiter.limit("3/minute")
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
async def analyse_voice(request: Request, audio_file: UploadFile=File(...)) -> dict:
    out_file_path = f"uploads/{audio_file.filename}"
    async with aiofiles.open(out_file_path, 'wb') as out_file:
        content = await audio_file.read()  
        await out_file.write(content) 

    try:
        uploaded_file = gemini.upload_file(out_file_path, audio_file.filename)
        result = gemini.infer("Translate the audio to english text.", uploaded_file)
        return {"result": result}
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}", "status": 500}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)

    