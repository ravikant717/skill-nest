import React from 'react'
import './App.css'
import AppRoutes from './Routes'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes></AppRoutes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App