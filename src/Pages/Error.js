import { useRouteError } from 'react-router-dom';
import Sidebar from '../Components/Sidebar/Sidebar'
import Navbar from '../Components/Navbar'

import PageContent from '../Components/PageContent';

function ErrorPage() {
  const error = useRouteError();

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  return (
      <div className="page-wrapper">
    <Sidebar />
    <div className="page-content">
      <Navbar />
      <div className="main-container">
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </div>
    </div>
    </div>
  );
}

export default ErrorPage;
