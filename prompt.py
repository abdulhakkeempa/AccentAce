def get_pronunciation_analysis_prompt(expected_text=None):
  """
  This function generates a prompt for Gemini for pronunciation analysis.

  Args:
      expected_text (optional): The expected text corresponding to the audio.

  Returns:
      A string containing the complete prompt for Gemini.
  """

  prompt = f"""
  My goal is to identify and analyze any potential pronunciation errors in the audio.

  Passage A (Expected Text): {expected_text}

  Here's what I'd like you to do:

  1. **Extract Text:**  Use your Automatic Speech Recognition (ASR) capabilities to extract text from this audio to (Passage B).

  2. **Analyze Pronunciation:**  Compare the extracted text (Passage B) with provided expected text (Passage A) with a standard pronunciation for the language used in the audio.

  For each identified discrepancy:

  * Indicate the exact word/phrase where the discrepancy occurs in Passage B with respect to Passage A.
  * Suggest the correct pronunciation for the identified word/phrase.  
  * Analyze the potential reason for the error (if possible). This could include factors like phoneme confusion, stress or intonation issues, etc.

  Additionally, if you can identify any broader trends in the pronunciation errors (e.g., consistent vowel mispronunciations), please mention them.
  Also, you should not give the Passage A as the extracted text, you should give the Passage B as extracted text in the below format.
  Response:

  You should provide me the response for this prompt in the form of a JSON. Strictly you should follow the JSON format as shown below:

  """ + """{
    "extracted_text": "This is the extracted text",
    "words": [
      {
        "actual_word": "string",
        "pronounced_word": "string",,
      },
      {
        "actual_word": "string",
        "pronounced_word": "string",
      }
    ],
    "remarks": "The remark the speaker should be provided for the pronunciation of the word"
  }""" + """

  extracted_text: The extracted text from the audio.
  words: A list of words/phrases identified as mispronounced.
  actual_word: The word/phrase as it appears in the expected text.
  pronounced_word: The word/phrase as it appears in the extracted text.
  remarks: Any additional remarks or analysis on the pronunciation errors, suggestions and improvements required.

  3. **Submit Response:** Submit the response in the specified JSON format. You should not alter any other part of the response.
    
  """
  return prompt
