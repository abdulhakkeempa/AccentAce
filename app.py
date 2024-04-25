from fastapi import FastAPI, Request, UploadFile, File
from dotenv import load_dotenv
import os

from src.gemini import Gemini
from src.prompt import speech_prompt

from slowapi.errors import RateLimitExceeded
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address

import aiofiles

limiter = Limiter(key_func=get_remote_address)

load_dotenv()

app = FastAPI()

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


    