"use client";

import { useEffect, useState } from 'react';

export default function Text({ text, setText }) {

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && isLoading) {
      fetch('http://localhost:8000')
        .then(response => response.json())
        .then(data => {
          setText(data.speech);
          setIsLoading(false);
        })
        .catch((e) => {
          console.error(e)
          setIsLoading(true);
        });
    }
  }, [isLoading]);

  const refreshText = () => {
    setIsLoading(true);
  };

  const speakText = () => {
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.onend = () => {
      setIsSpeaking(false);
    };
  
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
      <div className='max-w-lg script-box p-7' style={{ height: 'auto', minHeight: '150px' }}>
        {isLoading ? (
          <div role="status" class="max-w-lg animate-pulse">
            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-lg mb-4"></div>
            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-lg mb-2.5"></div>
            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-lg mb-2.5"></div>
            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-lg mb-2.5"></div>
            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-lg mb-2.5"></div>
            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-lg"></div>
            <span class="sr-only">Loading...</span>
          </div>
        ) : (
          <p className="text-justify text-base">{text}</p>
        )}
        </div>
        <div className='ml-3 lg:pt-6'>
            <button onClick={speakText} className={`play-button ${isSpeaking ? 'stop' : 'play'}`}>
              {isSpeaking ? <i class="bi bi-stop-fill"></i> : <i class="bi bi-play-fill"></i>}
            </button>
            <button onClick={refreshText} className="refresh-button">
              <i class="bi bi-arrow-clockwise"></i>
            </button>
        </div>
      </div>
    </div>
  );
}