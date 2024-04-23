from fastapi import FastAPI
from dotenv import load_dotenv
import os
from src.gemini import Gemini
from src.prompt import speech_prompt

load_dotenv()

app = FastAPI()

gemini = Gemini(api_key=os.environ['GEMINI_API_KEY'])


@app.get("/")
def root():
    prompt = speech_prompt()
    response = gemini.generate_content(prompt)
    return {"speech": response}
