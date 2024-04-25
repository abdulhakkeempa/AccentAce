from fastapi import FastAPI, Request
from dotenv import load_dotenv
import os
from src.gemini import Gemini
from src.prompt import speech_prompt

from slowapi.errors import RateLimitExceeded
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address


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