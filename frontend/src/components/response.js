"use client";

import { useEffect, useState } from 'react';

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

  if (response.words) {
    console.log(words);
  }

  return (
    <div className="p-4 flex flex-col items-center">
      {response && (
      <div>
        <h1 className="text-2xl mb-4 font-semibold">Your overall pronounciation score is: <span className='bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text font-bold'> {response.score}</span></h1>
          <div>
            <p className="text-lg"><strong>Remarks:</strong> {response.remarks}</p>
          </div>
        </div>
      )}
    </div>
  );
}

