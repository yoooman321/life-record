import { redirect } from 'react-router';

export async function loginLoader() {
  const hasToken = Boolean(localStorage.getItem('access_token'));
  if (hasToken) {
    throw redirect('/');
  }
  return null;
}
