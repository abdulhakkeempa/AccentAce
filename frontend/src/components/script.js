"use client";

import { useEffect, useState } from 'react';

export default function Text() {
  const [text, setText] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000')
      .then(response => response.json())
      .then(data => setText(data.speech));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Text from API:</h1>
      <p className="text-lg">{text}</p>
    </div>
  );
}
