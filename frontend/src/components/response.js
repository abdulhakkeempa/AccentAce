"use client";

import { useEffect, useState } from 'react';

export default function Response({ audioFile, speechText }) {
  const [response, setResponse] = useState('');

  useEffect(() => {
    if (audioFile) {
      console.log(speechText);
      const formData = new FormData();
      formData.append('audio_file', audioFile, 'audio_file.mp3');
      formData.append('speech_text', speechText);

      console.log(formData);

      fetch('http://127.0.0.1:8000/analyse_voice', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => setResponse(data));
    }
  }, [audioFile]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Response from API:</h1>
      <p className="text-lg">{response}</p>
    </div>
  );
}
