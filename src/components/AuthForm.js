import { 
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation} from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {
  const data = useActionData();
  const navigation = useNavigation();

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';

  return (
    <>
      <Form method="post" className={classes.form}>
      {data && data.error && (
          <ul>
            {data.error.split(',').map((err, index) => (
              <h5 className="text-danger" key={index}>{err}</h5>
            ))}
          </ul>
        )}
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button>Save</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
