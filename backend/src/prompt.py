def speech_prompt():
    prompt = """
        As a speech trainer, generate one short paragraphs (under 50 words each) specifically designed to help me practice and improve my overall English pronunciation. These paragraphs should be rich in a variety of challenging sounds, including vowel and consonant combinations, and should progressively increase in difficulty. Please provide only the paragraphs in your response.    
    """
    return prompt



def get_pronunciation_analysis_prompt(expected_text=None):
  """
  This function generates a prompt for Gemini for pronunciation analysis.

  Args:
      expected_text (optional): The expected text corresponding to the audio.

  Returns:
      A string containing the complete prompt for Gemini.
  """

  prompt = f"""
  Goal: Identify and analyze potential pronunciation errors in a given audio clip.

  Input:

    expected_text: A string containing the expected transcript of the audio. 

    expected_text =  {expected_text}

  Instructions:

  1. Speech Recognition: Use Automatic Speech Recognition (ASR) to generate a text transcript (`extracted_text`) from the provided audio.

  2. Pronunciation Comparison:  Compare `extracted_text` with the `expected_text`, using standard pronunciation rules for the language spoken in the audio.

  3. Error Analysis:  For each pronunciation discrepancy found:
    * Identify: Indicate the specific word/phrase in `extracted_text` that differs from `expected_text`.
    * Correct: Provide the correct pronunciation of the mispronounced word/phrase.
    * Explain (if possible): Briefly analyze the potential cause of the error (e.g., phoneme confusion, incorrect stress). 

  4. Overall Trends (if any): Identify and describe any broader patterns in the pronunciation errors (e.g., consistent mispronunciation of a particular vowel sound).

  5. Pronunciation Score: Assign an overall score (out of 10.0) reflecting the speaker's pronunciation accuracy.

  6. Remarks: Provide constructive feedback and suggestions for improvement based on the analysis.

  Response Format:
  Return your analysis in the following JSON format:

  """ + """{
    "extracted_text": "This is the extracted text from the audio",
    "words": [
      {
        "actual_word": "correctly",
        "pronounced_word": "currectly",
      },
      {
        "actual_word": "photography",
        "pronounced_word": "fotography",
      }
    ],
    "score": 7.5,
    "remarks": "The remark the speaker should be provided for the pronunciation of the word"
  }""" + """

  
  Fields:
  * "extracted_text": The ASR-generated transcript of the audio.
  * "words": A list of objects, each representing a mispronounced word/phrase.
      * "actual_word": The word/phrase as it appears in `expected_text`.
      * "pronounced_word": The word/phrase as transcribed from the audio.
  * "score":  An overall pronunciation score out of 10.0.
  * "remarks": General remarks about the speaker's pronunciation and areas for improvement.

  Important: Provide only the JSON response. Do not include any extraneous text or formatting.
    
  """
  return prompt
