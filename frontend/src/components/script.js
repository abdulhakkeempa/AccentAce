"use client";

import { useEffect, useState } from 'react';

export default function Text({ text, setText }) {

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (typeof window !== 'undefined' && isLoading) {
      fetch(process.env.NEXT_PUBLIC_API_URL)
        .then(response => response.json())
        .then(data => {
          setText(data.speech);
          setIsLoading(false); 
        })
        .catch((e) => {
          console.error(e)
          setIsLoading(false); 
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
      <h1 className="md:text-2xl text-base font-medium mb-4">Text for analysing your pronounciation 📖</h1>
      <div className='flex flex-col md:flex-row items-center'>
        <div className='max-w-screen-sm max-w-lg script-box p-7' style={{ height: 'auto', minHeight: '150px' }}>
          {isLoading ? (
            <div role="status" className="max-w-lg animate-pulse">
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-lg mb-2.5"></div>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-lg mb-2.5"></div>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-lg mb-2.5"></div>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-lg mb-2.5"></div>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-lg"></div>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <p className="text-justify text-base">{text}</p>
          )}
        </div>
        <div className='ml-3 lg:pt-6 mt-4 lg:mt-0 flex flex-row items-center'>
          <button onClick={speakText} className={`play-button ${isSpeaking ? 'stop' : 'play'}`}>
            {isSpeaking ? <i className="bi bi-stop-fill"></i> : <i className="bi bi-play-fill"></i>}
          </button>
          <button onClick={refreshText} className="refresh-button">
            <i className="bi bi-arrow-clockwise"></i>
          </button>
        </div>
      </div>
    </div>
  );
}