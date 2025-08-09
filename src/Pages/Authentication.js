import { json, redirect } from 'react-router-dom';

import AuthForm from '../components/AuthForm';
import AuthService from '../Services/Auth/auth.service'

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  if (mode !== 'login' && mode !== 'signup') {
    throw json({ message: 'Unsupported mode.' }, { status: 422 });
  }

  const data = await request.formData();
  // const authData = {
  const email = data.get('email');
  const password = data.get('password');
  // };

  try {
    if (mode == 'signup') {
      await AuthService.register(email, password)
    }
    if (mode == 'login') {
      await AuthService.login(email, password)
    }
  } catch (error) {
    // console.log('auth error', error.response);
    
    if (error.response) {
      console.log('auth error 1', error.response);

      return error.response.data;
    } else {
      console.log('auth error 2', error.response);

      return error.response.data;
    }
    // const resMessage =
    //   (error.response &&
    //     error.response.data &&
    //     error.response.data.message) ||
    //   error.message ||
    //   error.toString();
    // throw json({ message: 'Could not authenticate user.' }, { status: 500 });
  }

  // const response = await fetch('http://localhost:8080/' + mode, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(authData),
  // });

  // if (response.status === 422 || response.status === 401) {
  //   return response;
  // }

  // if (!response.ok) {
  //   throw json({ message: 'Could not authenticate user.' }, { status: 500 });
  // }

  // soon: manage that token
  return redirect('/');
}
