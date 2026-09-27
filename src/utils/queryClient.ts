import { QueryClient } from '@tanstack/react-query';

// Create a client with default options
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Time before data is considered stale (10 minutes)
      staleTime: 1000 * 60 * 10,
      // Time before inactive queries are garbage collected (10 minutes)
      gcTime: 1000 * 60 * 10,
      // Retry failed requests once
      retry: 1,
      // Refetch on window focus
      refetchOnWindowFocus: false,
    },
  },
});
