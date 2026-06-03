import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, Link } from 'react-router-dom'
import { router } from './router.tsx'
import './index.css'
import App from './App.tsx'
import { AuthContextProvider } from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <h1 className='text-center text-3xl'>
      TrickFusion
    </h1>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
    <App />
  </StrictMode>
)
