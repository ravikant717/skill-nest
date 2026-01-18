import React from 'react'
import './App.css'
import AppRoutes from './Routes'
import { BrowserRouter } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
     <AppRoutes></AppRoutes>
  </BrowserRouter>
    
  
  )
}

export default App