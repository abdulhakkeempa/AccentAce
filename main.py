import google.generativeai as genai
from dotenv import load_dotenv
import os
from src.gemini import Gemini

load_dotenv()

gemini = Gemini(api_key=os.environ['GEMINI_API_KEY'])
# gemini.infer("Translate the audio to english text.", "files/w1b3thksnl7")
gemini.list_files()
# genai.configure(api_key=os.environ['GOOGLE_API_KEY'])

# sample_file = genai.upload_file(path="./audio/script.m4a",
#                             display_name="Script Recording")

# print(f"Uploaded file '{sample_file.display_name}' as: {sample_file.uri}")
# print(f"Sample File Name: {sample_file.name}")

