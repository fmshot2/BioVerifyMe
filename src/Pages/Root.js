import { Outlet } from 'react-router-dom';

import Sidebar from '../Components/Sidebar/Sidebar'
import Navbar from '../Components/Navbar'
import TopCards from '../Components/TopCards'

function RootLayout() {

  return (
      <div className="page-wrapper">
    <Sidebar />
    <div className="page-content">
      <Navbar />
      <div className="main-container">
      <TopCards />

      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </div>
    </div>
      </div>
  );
}

export default RootLayout;
