import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

genai.configure(api_key=os.environ['GEMINI_API_KEY'])


# file = genai.get_file(name="files/w1b3thksnl7f")
# print(f"Retrieved file '{file.display_name}' as: {file.uri}")

audio_file_uri = "gs://cloud-samples-data/generative-ai/audio/pixel.mp3"
audio_file = genai.Part.from_uri(audio_file_uri, mime_type="audio/mpeg")


model = genai.GenerativeModel(model_name="models/gemini-1.5-pro-latest")

response = model.generate_content(["Translate the audio the english text.", audio_file])

print(f"Generated content: {response.text}")