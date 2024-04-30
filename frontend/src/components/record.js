"use client";

import { useState } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default function Recorder({ onRecording }) {
  const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setBlobURL] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);

  navigator.getUserMedia({ audio: true },
    () => {
      console.log('Permission Granted');
      setIsBlocked(false);
    },
    () => {
      console.log('Permission Denied');
      setIsBlocked(true);
    },
  );

  const start = () => {
    if (isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          setIsRecording(true);
        }).catch((e) => console.error(e));
    }
  };

  const stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(async ([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob)
        setBlobURL(blobURL);
        setIsRecording(false);

        // Call the onRecording function with the blob
        onRecording(blob);
      }).catch((e) => console.log(e));
  };

  return (
    <div className="p-4">
      <button onClick={start} disabled={isRecording} className="record-button">
        {isRecording ? <i class="bi bi-stop-fill"></i> : <i class="bi bi-mic-fill"></i>}
      </button>
      <button onClick={stop} disabled={!isRecording} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Stop
      </button>
      <div>
        <p className='text-sm text-slate-500	'>Press the <span><i class="bi bi-mic-fill"></i></span> button and start reading the text above.</p>
      </div>
      <audio src={blobURL} controls="controls" />
    </div>
  );
}
