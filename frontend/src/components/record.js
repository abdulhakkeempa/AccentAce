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

  const startRecording = () => {
    if (!isBlocked) {
      Mp3Recorder
        .start()
        .then(() => {
          setIsRecording(true);
        }).catch((e) => console.error(e));
    } else {
      console.log('Permission Denied');
    }
  };

  const stopRecording = () => {
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

  const cancelRecording = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(async ([buffer, blob]) => {
        setIsRecording(false);
      }).catch((e) => console.log(e));
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <div className='mb-2 flex justify-center space-x-4'>
        <button onClick={isRecording ? stopRecording : startRecording} className={`record-button ${isRecording ? 'record-button-recording' : ''}`}>
          {isRecording ? <i class="bi bi-stop-fill"></i> : <i class="bi bi-mic-fill"></i>}
        </button>
        {isRecording && (
          <button onClick={cancelRecording} className="record-button-cancel">
            <i class="bi bi-x-lg"></i>
          </button>
        )}
      </div>
      <div>
        <p className='text-sm text-slate-500'>Press the <span><i class="bi bi-mic-fill"></i></span> button and start reading the text above.</p>
      </div>
      {blobURL && (
        <div  className='p-5'>
          <audio src={blobURL} controls="controls" />
        </div>
      )}
    </div>
  );
}
