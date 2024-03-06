import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import "./App.css";
import Home from './Pages/Home';
import RootLayout from './Pages/Root';
import ErrorPage from './Pages/Error';

import About from './Pages/About'

import Config from './Pages/Config'
import Gallery from './Pages/Gallery'
import EditGallery from './Pages/EditGallery'
import EditSlider from './Pages/EditSlider'
import Partners from './Pages/Partners' 
import PreviousEvents from './Pages/PreviousEvents'
import Services from './Pages/Services' 
import Slider from './Pages/Slider' 
import Vulcs from './Pages/vulcaniser/Vulc'
import EditVulc from './Pages/vulcaniser/EditVulc'
import AddVulc from './Pages/vulcaniser/Addvulc'
import Volunteers from './Pages/volunteers/Volunteers'
import EditVolunteer from './Pages/volunteers/EditVolunteer'
import AddVolunteer from './Pages/volunteers/AddVolunteer'
import Topics from './Pages/Topics'
import Speakers from './Pages/Speaker' 
import Statistics from './Pages/Statistics' 
import Testimonials from './Pages/Testimonial' 
import UpcomingEvents from './Pages/UpcomingEvents'
import EditUpcoming from './Pages/EditUpcoming'
import EditPrevious from './Pages/EditPrevious'
import Events from './Pages/Events'
import Array from './Pages/array'
import EventDetails from './Pages/EventDetails'
import EditEvent from './Pages/EditEvents'
import EditUser from './Pages/EditUser'
import EditServices from './Pages/EditServices' 
import EditStatistics from './Pages/EditStatistics'
import EditTestimonials from './Pages/EditTestimonials'
import AddAbout from './Pages/AddAbout' 
import AddEvent from './Pages/AddEvents' 
import AddTopic from './Pages/AddTopic' 
import AddSpeaker from './Pages/AddSpeakers' 
import AddAttendee from './Pages/AddAttendees' 
import Attendees from './Pages/Attendees' 
import AddServices from './Pages/AddServices' 
import AddStatistics from './Pages/AddStatistics'
import AddConfig from './Pages/AddConfig' 
import AddTestimonials from './Pages/AddTestimonial';
import EditTopics from './Pages/EditTopics';
import EditSpeakers from './Pages/EditSpeakers';
import Login from './Pages/AuthPages/Login';
import Profile from './Pages/AuthPages/Profile';
import Register from './Pages/AuthPages/Register';
import Users from './Pages/Users'




const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: '/', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: "users", element: <Users /> },
      { path: "volunteers", element: <Volunteers /> },
      { path: "addvolunteer", element: <AddVolunteer /> },
      { path: "editvolunteer", element: <EditVolunteer/> },
      { path: "vulcs", element: <Vulcs /> },
      { path: "addvulc", element: <AddVulc/> },
      { path: "editvulc", element: <EditVulc/> },
      { path: "", element: <About /> },
      { path: "abouts", element: <About /> },
      { path: "topics", element: <Topics /> },
      { path: "speakers", element: <Speakers /> },
      { path: "config", element: <Config /> },
      { path: "galleries", element: <Gallery />}  ,
      { path: "editgallery/:id", element: <EditGallery />}  ,
      { path: "editslider/:id", element: <EditSlider />}  ,
      { path: "partners", element: <Partners />}  ,
      { path: "previousevents", element: <PreviousEvents /> },
      { path: "services", element: <Services />}  ,
      { path: "sliders", element: <Slider />}  ,
      { path: "statistics", element: <Statistics />}  ,
      { path: "testimonials", element: <Testimonials />}  ,
      { path: "upcomingevents", element: <UpcomingEvents /> },
      { path: "events", element: <Events /> },
      { path: "attendees", element: <Attendees /> },
      { path: "editupcoming/:id", element: <EditUpcoming /> },
      { path: "editprevious/:id", element: <EditPrevious /> },
      { path: "eventdetails/:id", element: <EventDetails /> },
      { path: "editevent/:id", element: <EditEvent />}  ,
      { path: "editservice/:id", element: <EditServices />}  ,
      { path: "editstatistic/:id", element: <EditStatistics /> },
      { path: "edittestimonial/:id", element: <EditTestimonials /> },
      { path: "edittopics/:id", element: <EditTopics /> },
      { path: "editspeakers/:id", element: <EditSpeakers /> },
      { path: "editusers/:id", element: <EditUser /> },
      { path: "editspeakers", element: <EditSpeakers /> },
      { path: "addtestimonials", element: <AddTestimonials /> },
      { path: "addabout", element: <AddAbout /> },
      { path: "event/:id/addtopic", element: <AddTopic /> },
      { path: "item/:id/addspeaker", element: <AddSpeaker /> },
      { path: "addevents", element: <AddEvent /> },
      { path: "addstatistics", element: <AddStatistics /> },
      { path: "addconfig", element: <AddConfig /> },
      { path: "addservices", element: <AddServices /> },
      { path: "addattendee", element: <AddAttendee /> },
      { path: "array", element: <Array /> },
    ],
  },
]);

function App() {
    return <RouterProvider router={router} />;    
}

export default App;
