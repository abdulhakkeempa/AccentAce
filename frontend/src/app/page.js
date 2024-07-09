"use client";

import Recorder from '../components/record';
import Response from '../components/response';
import Text from '../components/script';
import Title from '@/components/title';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import app from './firebase/config';
import { getAuth, signOut } from 'firebase/auth';

export default function Home() {
  const [user, setUser] = useState(null);

  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
      }
    });
  
    return () => unsubscribe();
  }, []);
  
  const [audioFile, setAudioFile] = useState(null);
  const [text, setText] = useState('');

  const handleRecording = (file) => {
    setAudioFile(file);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    user && (
    <div className="container mx-auto p-4 h-screen flex flex-col items-center">
      <div className="w-full flex justify-end mb-4">
        <button onClick={handleLogout} className='text-white p-2 rounded  bg-[#4285F4]'>Logout</button>
      </div>
      <p className="text-lg">Welcome, {user.displayName}</p>
      <Title title="Ace your Accent ✨" subtitle="Your personal AI pronounciation helper ⚡"/>
      <div className="flex flex-col items-center">
        <Text text={text} setText={setText} />
        <Recorder onRecording={handleRecording} />
        <Response audioFile={audioFile} speechText={text}/>
      </div>
    </div>
  ));
}
