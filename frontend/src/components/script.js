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

    const test = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."

    const utterance = new SpeechSynthesisUtterance(test);

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
      <h1 className="text-2xl font-bold mb-4">Text from API:</h1>
      <div className='max-w-lg script-box p-7 pr-4 flex'>
        <div>
          <p className="text-justify text-base">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
        </div>
        <div className='ml-3'>
          <button onClick={speakText} className={`play-button ${isSpeaking ? 'stop' : 'play'}`}>
            {isSpeaking ? '\u25A0' : '\u25B6'}
          </button>
        </div>
      </div>
    </div>
  );
}