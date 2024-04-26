"use client";

import { useEffect, useState } from 'react';

export default function Response({ audioFile }) {
  const [response, setResponse] = useState('');

  useEffect(() => {
    if (audioFile) {

      const formData = new FormData();
      formData.append('audio_file', audioFile, 'audio_file.mp3');


      fetch('http://127.0.0.1:8000/analyse_voice', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.text())
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
