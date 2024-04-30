"use client";

import { useEffect, useState } from 'react';

export default function Text({ text, setText }) {

  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetch('http://localhost:8000')
        .then(response => response.json())
        .then(data => setText(data.speech))
        .catch((e) => console.error(e));
    }
    }, []);

  const speakText = () => {
    const utterance = new SpeechSynthesisUtterance(text);

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };
  
  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-4">Text for analysing your pronounciation 📖</h1>
      <div className='flex items-start'>
        <div className='max-w-lg script-box p-7'>
          <div>
            <p className="text-justify text-base">{text}</p>
          </div>
        </div>
        <div className='ml-3 lg:pt-6'>
            <button onClick={speakText} className={`play-button ${isSpeaking ? 'stop' : 'play'}`}>
              {isSpeaking ? <i class="bi bi-stop-fill"></i> : <i class="bi bi-play-fill"></i>}
            </button>
        </div>
      </div>
    </div>
  );
}