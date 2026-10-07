import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router/dom';
import { router } from '@/route';
import { queryClient } from './utils/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { DialogProvider } from './components/ui/dialog/DialogProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <DialogProvider>
        <RouterProvider router={router} />
      </DialogProvider>
    </QueryClientProvider>
  </StrictMode>,
);
