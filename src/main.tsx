import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router.tsx'
import AsideProvider from './providers/AsideProvider.tsx'
import AuthProvider from './providers/AuthProvider.tsx'
import LabProvider from './providers/LabProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <AuthProvider>
        <AsideProvider>
          <LabProvider>
            <RouterProvider router={router}/>
          </LabProvider>

        </AsideProvider>
  </AuthProvider>
  </StrictMode>,
)
