import google.generativeai as genai

class Gemini:
    def __init__(self, api_key):
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel(model_name="models/gemini-1.5-pro-latest")
        self.upload_files = []
        self.upload_files_display_names = []
  
    def upload_file(self, file_path, display_name):
        uploaded_file = genai.upload_file(
                        path=file_path,
                        display_name=display_name
                    )
        print(f"Uploaded file '{uploaded_file.display_name}' as: {uploaded_file.uri}")
        self.files_uploaded.append(uploaded_file)  
        self.upload_files_display_names.append(display_name)

    def get_file(self, file_name):  
        file = genai.get_file(name=file_name)
        print(f"Retrieved file '{file.display_name}' as: {file.uri}")
        return file
    
    def print_files_uploaded(self):
        for fileName, displayName in zip(self.files_uploaded, self.upload_files_display_names):
            print(f"Display Name: {displayName} => File Name: {fileName}")

    def run(self, prompt, file):
        response = self.model.generate_content([prompt, file])
        print(f"Generated content: {response.text}")

    def infer(self, prompt, file_name):
        file = self.get_file(file_name)
        self.run(prompt, file)