import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'

import App from '@/App.jsx'
import MainLayout from '@/components/shared/layouts/MainLayout';
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "@/components/ThemeProvider"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from "@/components/ui/sonner"
import Testing from '@/views/Testing';

const env = import.meta.env.MODE // 'development' or 'production'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
      retry: 0 // default: 3
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider>

          <BrowserRouter>
            <Routes>

              <Route path="/" element={<MainLayout />}>
                <Route index element={<App />} />
                <Route path="testing" element={<Testing />} />
              </Route>

              <Route path="*" element={404} />

            </Routes>
          </BrowserRouter>
          
          <Toaster />

        </TooltipProvider>
      </ThemeProvider>

      {env === 'development' &&
        <ReactQueryDevtools initialIsOpen={false} />
      }

    </QueryClientProvider>
  </StrictMode>
)
