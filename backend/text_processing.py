def remove_substrings(response: str, substrings: list) -> str:
    for substring in substrings:
        response = response.replace(substring, "")
    return response
