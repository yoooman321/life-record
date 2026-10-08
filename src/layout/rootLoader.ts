import { redirect } from 'react-router';

export async function rootLoader() {
  const hasToken = Boolean(localStorage.getItem('access_token'));
  if (!hasToken) {
    throw redirect('/login');
  }
  return null;
}
