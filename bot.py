import google.generativeai as genai
from dotenv import load_dotenv
import os
from prompt import get_pronunciation_analysis_prompt

load_dotenv()

expected_text = """
Rain lashed against the windowpanes, a rhythmic counterpoint to the crackling fire in the hearth. Curled up with a well-worn book, I savored the cozy atmosphere. The scent of cinnamon and cloves, wafting from the kitchen where a pie baked, filled the air with warmth. Outside, the storm raged, but inside, all was peace and comfort.
"""

genai.configure(api_key=os.environ['GOOGLE_API_KEY'])


file = genai.get_file(name="files/w1b3thksnl7f")
print(f"Retrieved file '{file.display_name}' as: {file.uri}")

prompt = get_pronunciation_analysis_prompt(expected_text)
print(prompt)

model = genai.GenerativeModel(model_name="models/gemini-1.5-pro-latest")

response = model.generate_content([prompt, file])

print(f"Generated content: {response.text}")




