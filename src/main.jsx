import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Router/Router.jsx'
import { ThemeProvider } from '@material-tailwind/react'
import AuthProvider from './Providers/AuthProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <ThemeProvider>
    <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
)
