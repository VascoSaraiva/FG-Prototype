import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'

import App from '@/App.jsx'
import MainLayout from '@/components/layouts/MainLayout';
import { TooltipProvider } from "@/components/ui/tooltip"



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<MainLayout />}>
            <Route index element={<App />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </StrictMode>
)
