import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { NavBarComponent } from './components/NavBarComponent'
import { BrowserRouter } from 'react-router-dom'
import { CarRentalApp } from './CarRentalApp'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <CarRentalApp/>
    </StrictMode>
  </BrowserRouter>
    
)
