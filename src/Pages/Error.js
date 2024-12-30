import { useRouteError } from 'react-router-dom';
import Sidebar from '../Components/Sidebar/Sidebar'
import Navbar from '../Components/Navbar'

import PageContent from '../Components/PageContent';

function ErrorPage() {
  const error = useRouteError();

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (error.status === 500) {
    // use this if u built your own response object in Events.js page
    // message = JSON.parse(error.data).message
    // use this if u're using react's json function in Events.js page

    message = error.data.message


    console.log('eroorpagemessage in 500', message);

  }

  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
    console.log('eroorpagemessagein 404', message);
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
