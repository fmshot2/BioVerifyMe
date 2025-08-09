import { redirect } from 'react-router-dom';

export function action() {
  console.log('logout', 'logout');
  
  localStorage.removeItem('user');
  return redirect('/');
}