import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Gizlilik from './pages/Gizlilik'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Gizlilik />
  </StrictMode>,
)
