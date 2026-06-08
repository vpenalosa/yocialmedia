import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <>
    <h1 className='text-center text-3xl'>
      TrickFusion
    </h1>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </>
)


