"use client";

import app from '../firebase/config';
import {getAuth} from 'firebase/auth'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Login() {
  const auth = getAuth(app);
  const googleAuth = new GoogleAuthProvider();

  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithPopup(auth, googleAuth);

      if (user) {
        router.push('/');
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        {/* Left: Accent & Illustration */}
        <div className="md:flex md:items-center md:justify-center mb-6">
          <div className="mb-4 md:mb-0 text-center">
            <h1 className="text-3xl font-semibold text-gray-900">Accent Ace</h1>
            <p className="text-lg font-medium text-gray-600">
              Unlock Your Confident Voice.
            </p>
          </div>
        </div>
        <div className="sign-in-section">
          <button 
            className="google-sign-in-button" 
            onClick={handleGoogleLogin}
          >
            <div className='gsi-material-button-icon' >
              <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" style={{display: 'block'}}>
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
            </div>
            <span className="button-text">Sign in with Google</span> 
          </button>
        </div>

      </div>
    </div>
  );


  return (
    <div className="login-page">
      <div className="login-container">
        {/* Product Info Section */}
        <div className="product-info">
          <h1 className="product-title">Accent Ace</h1>
          <p className="product-description">
            Unlock Your Confident Voice. <br /> 
            AI-Powered Pronunciation Help, Tailored to You.
          </p>
        </div>

        <div className="sign-in-section">
          <button 
            className="google-sign-in-button" 
            onClick={handleGoogleLogin}
          >
            <div className='gsi-material-button-icon' >
              <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" style={{display: 'block'}}>
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
            </div>
            <span className="button-text">Sign in with Google</span> 
          </button>
        </div>
        </div>
    </div>
  );
}
