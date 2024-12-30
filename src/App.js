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
import Testimonial from './Pages/Testimonial'
import UpcomingEvents from './Pages/UpcomingEvents'
import EditUpcoming from './Pages/EditUpcoming'
import EditPrevious from './Pages/EditPrevious'
import Events, { loader as eventsLoader } from './Pages/Events';
import Array from './Pages/array'
import EventDetails, { loader as eventDetailLoader } from './Pages/EventDetails'
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

import EventsDataService from './Services/EventsService'




const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: '/', element: <Home /> },
      { path: 'about', element: <About /> },
      {
        path: 'events',
        // element: <RootLayout />,
        children: [
          {
            index: true, element: <Events />,
            loader: eventsLoader
          },
          {
            path: ':id',
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetails />,
              },
              { path: 'edit', element: <EditEvent /> },
            ],
          },
          { path: "addevent", element: <AddEvent /> },

        ],
      },
      {
        path: 'testimonials',
        // element: <RootLayout />,
        children: [
          { index: true, element: <Testimonial /> },
          { path: ':id', element: <EditTestimonials /> },
          { path: ':id/edit', element: <EditTestimonials /> },
        ],
      },
      {
        path: 'galleries',
        children: [
          { index: true, element: <Gallery /> },
          { path: ':id/edit', element: <EditGallery /> },
        ],
      },
      // { path: "galleries", element: <Gallery />},
      // { path: "editgallery/:id", element: <EditGallery />}  ,

      // { path: "testimonial", element: <Testimonial />},
      // { path: "edittestimonial/:id", element: <EditTestimonials /> },

      { path: "config", element: <Config /> },
      { path: "sliders", element: <Slider /> },
      { path: "statistics", element: <Statistics /> },
      { path: "users", element: <Users /> },
      { path: "volunteers", element: <Volunteers /> },
      { path: "addvolunteer", element: <AddVolunteer /> },
      { path: "editvolunteer", element: <EditVolunteer /> },
      { path: "vulcs", element: <Vulcs /> },
      { path: "addvulc", element: <AddVulc /> },
      { path: "editvulc", element: <EditVulc /> },
      { path: "", element: <About /> },
      { path: "abouts", element: <About /> },
      { path: "topics", element: <Topics /> },
      { path: "speakers", element: <Speakers /> },
      { path: "editslider/:id", element: <EditSlider /> },
      { path: "partners", element: <Partners /> },
      // { path: "previousevents", element: <PreviousEvents /> },
      { path: "services", element: <Services /> },
      { path: "upcomingevents", element: <UpcomingEvents /> },
      { path: "attendees", element: <Attendees /> },
      { path: "editupcoming/:id", element: <EditUpcoming /> },
      { path: "editprevious/:id", element: <EditPrevious /> },
      { path: "editservice/:id", element: <EditServices /> },
      { path: "editstatistic/:id", element: <EditStatistics /> },
      { path: "edittopics/:id", element: <EditTopics /> },
      { path: "editspeakers/:id", element: <EditSpeakers /> },
      { path: "editusers/:id", element: <EditUser /> },
      { path: "editspeakers", element: <EditSpeakers /> },
      { path: "addtestimonials", element: <AddTestimonials /> },
      { path: "addabout", element: <AddAbout /> },
      { path: "event/:id/addtopic", element: <AddTopic /> },
      { path: "item/:id/addspeaker", element: <AddSpeaker /> },
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
