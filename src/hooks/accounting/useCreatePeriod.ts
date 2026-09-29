import { createPeriod } from '@/api';
import { useMutation } from '@tanstack/react-query';

export function useCreatePeriod() {
  return useMutation({
    mutationFn: createPeriod,
  });
}
