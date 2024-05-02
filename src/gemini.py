import google.generativeai as genai
from .exception import handle_resource_exhausted
class Gemini:
    def __init__(self, api_key):
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel(model_name="models/gemini-1.5-pro-latest")
        self.upload_files = []
        self.upload_files_display_names = []
  
    def upload_file(self, file_path, display_name) -> str:
        uploaded_file = genai.upload_file(
                        path=file_path,
                        display_name=display_name
                    )
        print(f"Uploaded file '{uploaded_file.display_name}' as: {uploaded_file.uri}")
        self.upload_files.append(uploaded_file.name)  
        self.upload_files_display_names.append(display_name)
        return uploaded_file.name

    def get_file(self, file_name):  
        try:
            file = genai.get_file(name=file_name)
            print(f"Retrieved file '{file.display_name}' as: {file.uri}")
        except Exception as e:
            raise Exception(f"{e}")
        return file
    
    def delete_file(self, file_name):
        try:
            genai.delete_file(file_name)
            print(f"Deleted file '{file_name}'")
        except Exception as e:
            raise Exception(f"{e}")


    def print_files_uploaded(self):
        for fileName, displayName in zip(self.files_uploaded, self.upload_files_display_names):
            print(f"Display Name: {displayName} => File Name: {fileName}")

    @handle_resource_exhausted
    def run(self, prompt, file) -> str:
        response = self.model.generate_content([prompt, file])
        return response.text

    @handle_resource_exhausted
    def generate_content(self, prompt) -> str:
        return self.model.generate_content([prompt]).text

    def infer(self, prompt, file_name) -> str:
        file = self.get_file(file_name)
        result = self.run(prompt, file)
        return result

