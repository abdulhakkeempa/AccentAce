"use client";

import { useState } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default function Record() {
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

        // Create a FormData instance
        const formData = new FormData();
        // Add the file to the form data
        formData.append('audio_file', blob, 'audio_file.mp3');

        // Send the POST request
        const response = await fetch('http://127.0.0.1:8000/analyse_voice', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
      }).catch((e) => console.log(e));
  };

  return (
    <div>
      <h1>Record your voice</h1>
      <button onClick={start} disabled={isRecording}>Start</button>
      <button onClick={stop} disabled={!isRecording}>Stop</button>
      <audio src={blobURL} controls="controls" />
    </div>
  );
}
