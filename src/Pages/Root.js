import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar';
import TopCards from '../components/TopCards';

function RootLayout() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Listen for sidebar state changes
    const handleSidebarToggle = (event) => {
      setIsSidebarExpanded(event.detail.expanded);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    window.addEventListener('sidebarStateChanged', handleSidebarToggle);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
      window.removeEventListener('sidebarStateChanged', handleSidebarToggle);
    };
  }, []);

  const getMarginLeft = () => {
    if (isMobile) return '0px';
    return isSidebarExpanded ? '256px' : '64px';
  };

  return (
    <div className="">
      <Sidebar />
      <div 
        className="page-content transition-all duration-300 ease-in-out"
        style={{
          marginLeft: getMarginLeft()
        }}
      >
        <Navbar />
        <div className="main-container">
          <TopCards />
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default RootLayout;

// import React, { useState, useEffect } from 'react';
// import { Outlet } from 'react-router-dom';
// import Sidebar from '../components/Sidebar/Sidebar';
// import Navbar from '../components/Navbar';
// import TopCards from '../components/TopCards';

// function RootLayout() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     const handleToggleDesktopSidebar = () => {
//       setIsSidebarOpen(prev => !prev);
//     };

//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);
//     window.addEventListener('toggleDesktopSidebar', handleToggleDesktopSidebar);
    
//     return () => {
//       window.removeEventListener('resize', checkScreenSize);
//       window.removeEventListener('toggleDesktopSidebar', handleToggleDesktopSidebar);
//     };
//   }, []);

//   return (
//     <div>
//       <Sidebar />
//       {/* <div className="page-wrapper"> */}
//       <div 
//         className="page-content transition-all duration-300 ease-in-out"
//         style={{
//           marginLeft: !isMobile ? (isSidebarOpen ? '256px' : '20px') : '0px'
//         }}
//       >
//         <Navbar />
//         <div className="main-container">
//           <TopCards />
//           <main>
//             <Outlet />
//           </main>
//         </div>
//       </div>
//     </div>
//     // </div>
//   );
// }

// export default RootLayout;





// import { Outlet } from 'react-router-dom';

// import Sidebar from '../components/Sidebar/Sidebar'
// import Navbar from '../components/Navbar'
// import TopCards from '../components/TopCards'

// function RootLayout() {

//   return (
//       <div className="page-wrapper">
//     <Sidebar />
//     <div className="page-content">
//       <Navbar />
//       <div className="main-container">
//       <TopCards />

//       <main>
//         {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
//         <Outlet />
//       </main>
//     </div>
//     </div>
//       </div>
//   );
// }

// export default RootLayout;

