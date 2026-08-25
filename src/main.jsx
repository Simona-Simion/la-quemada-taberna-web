import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource-variable/inter/wght.css'
import '@fontsource-variable/cormorant-garamond/wght.css'

import './index.css'
import './i18n'

import AppRoutes from './AppRoutes'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>
)