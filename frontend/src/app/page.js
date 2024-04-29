"use client";

import Recorder from '../components/record';
import Response from '../components/response';
import Text from '../components/script';

import { useState } from 'react';

export default function Home() {
  const [audioFile, setAudioFile] = useState(null);
  const [text, setText] = useState('');

  const handleRecording = (file) => {
    setAudioFile(file);
  };

  return (
    <div className="container mx-auto p-4">
      <Text text={text} setText={setText} />
      <Recorder onRecording={handleRecording} />
      <Response audioFile={audioFile} speechText={text} />
    </div>
  );
}
