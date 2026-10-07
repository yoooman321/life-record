import { finishCurrentPeriod } from '@/api';
import { useMutation } from '@tanstack/react-query';

export function useCreateSlime() {
  return useMutation({
    mutationFn: finishCurrentPeriod,
  });
}
