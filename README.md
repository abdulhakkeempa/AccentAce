# Accent Ace :- Ace your Accent

![2024-05-0221-32-31-ezgif com-video-to-gif-converter](https://github.com/abdulhakkeempa/AccentAce/assets/92361680/17569ffa-1573-4756-9268-baf00e9be5b7)

Accent Ace is an AI-powered software that generates text for users and records their voice to analyze their pronunciation. The goal of this project is to enable users to improve their pronunciation skills independently.

You can checkout out the [product](https://accent-ace.vercel.app/) here.

## Tech Stack
- Frontend: Next.js
- Backend: FastAPI
- LLM: Gemini (Gemini-1.5-Pro)
- Authentication: Firebase (Google-Auth)
- Deployment: Vercel (Frontend) + Google Cloud Run (Serverless Container for Backend)

[![My Skills](https://skillicons.dev/icons?i=nextjs,tailwind,python,fastapi,gcp,firebase,docker,vercel)]()

## How to run this locally?
1. Setting Up Frontend  
1.1 Copy the `frontend/.env.local.example` file as `.env.local`.  
1.2 Fill in the Firebase configuration values in the `.env.local` file.  

2. Setting Up Backend  
2.1 Copy the `backend/.env.example` file as `.env`.  
2.2 Fill in the GEMINI API Key in the `.env` file.
   
3. Running the Application  
3.1 Use `docker-compose` to start the application:  
```
docker-compose up
```
3.2 Once the application is running, you can access it locally at `http://localhost:3000`.

#### Build with ♥️ by [Abdul Hakkeem P A](https://www.linkedin.com/in/abdul-hakkeem-pa/)
  
