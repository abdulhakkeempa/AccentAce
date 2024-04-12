import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

genai.configure(api_key=os.environ['GOOGLE_API_KEY'])


file = genai.get_file(name="files/3r867z5lv3c")
print(f"Retrieved file '{file.display_name}' as: {file.uri}")

model = genai.GenerativeModel(model_name="models/gemini-1.5-pro-latest")

response = model.generate_content(["Translate the audio the english text.", file])

print(f"Generated content: {response.text}")