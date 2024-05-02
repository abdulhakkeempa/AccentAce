from google.api_core.exceptions import ResourceExhausted

def handle_resource_exhausted(func):
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except ResourceExhausted as e:
            raise Exception(f"Resource exhausted: {str(e)}")
    return wrapper
