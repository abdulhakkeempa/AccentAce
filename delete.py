import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

genai.configure(api_key=os.environ['GOOGLE_API_KEY'])


genai.delete_file("<delete_id>")

