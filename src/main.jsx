import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Router/Router.jsx'
import { ThemeProvider } from '@material-tailwind/react'
import AuthProvider from './Providers/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SearchProvider from './Providers/SearchProvider.jsx'


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
        <SearchProvider>
        <RouterProvider router={router}></RouterProvider>
        </SearchProvider>  
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
