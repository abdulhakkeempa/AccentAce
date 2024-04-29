"use client";

import { useEffect, useState } from 'react';

function findNewWords(real_speech, extracted_text) {
  if (!real_speech || !extracted_text) return [];
  const realSpeechWords = new Set(real_speech.split(' '));
  const extractedTextWords = new Set(extracted_text.split(' '));

  const newWords = [...extractedTextWords].filter(word => !realSpeechWords.has(word));

  return newWords;
}



export default function Response({ audioFile, speechText, realSpeech }) {
  const [response, setResponse] = useState('');

  useEffect(() => {
    if (audioFile) {
      const formData = new FormData();
      formData.append('audio_file', audioFile, 'audio_file.mp3');
      formData.append('speech_text', speechText);

      fetch('http://127.0.0.1:8000/analyse_voice', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => setResponse(data));
    }
  }, [audioFile]);

  const newWords = findNewWords(realSpeech, response.extracted_text);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Response from API:</h1>
      {response && (
        <>
          <p className="text-lg"><strong>Extracted Text:</strong> {response.extracted_text.split(' ').map((word, index) => newWords.includes(word) ? <span key={index} className="text-red-600">{word}</span> : word).join(' ')}</p>
          <p className="text-lg"><strong>Remarks:</strong> {response.remarks}</p>
        </>
      )}
    </div>
  );
}

