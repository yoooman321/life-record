import { register } from '@/api/user';
import { useMutation } from '@tanstack/react-query';

export function useRegister() {
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.accessToken);
    },
  });
}
