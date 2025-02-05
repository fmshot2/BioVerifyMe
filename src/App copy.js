import "./App.css";

import Sidebar from './Components/Sidebar'
import Navbar from './Components/Navbar'
import TopCards from './Components/TopCards'
import {BrowserRouter as Router,  Routes, Route } from 'react-router-dom';
import Users from './Pages/Users'
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


function App() {
  return (

<Router>
  <div className="page-wrapper">
    <Sidebar />
    <div className="page-content">
      <Navbar />
      <div className="main-container">
      <TopCards />

      <Routes>
      {/* <Route exact path="/" element={<Home />} /> */}
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile" element={<Profile />} />
        {/* <Route exact path="/" element={<Users />} /> */}
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/volunteers" element={<Volunteers />} />
        <Route exact path="/addvolunteer" element={<AddVolunteer />} />
        <Route exact path="/editvolunteer" element={<EditVolunteer/>} />
        <Route exact path="/vulcs" element={<Vulcs />} />
        <Route exact path="/addvulc" element={<AddVulc/>} />
        <Route exact path="/editvulc" element={<EditVulc/>} />
        <Route exact path="/" element={<About />} />
        <Route exact path="/abouts" element={<About />} />
        <Route exact path="/topics" element={<Topics />} />
        <Route exact path="/speakers" element={<Speakers />} />
        <Route path="/config" element={<Config />} />
        <Route exact path="/galleries" element={<Gallery />} /> 
        <Route  path="/editgallery/:id" element={<EditGallery />} /> 
        <Route  path="/editslider/:id" element={<EditSlider />} /> 
        <Route exact path="/partners" element={<Partners />} /> 
        <Route exact path="/previousevents" element={<PreviousEvents />} />
        <Route exact path="/services" element={<Services />} /> 
        <Route exact path="/sliders" element={<Slider />} /> 
        <Route exact path="/statistics" element={<Statistics />} /> 
        <Route exact path="/testimonials" element={<Testimonials />} /> 
        <Route exact path="/upcomingevents" element={<UpcomingEvents />} />
        <Route exact path="/events" element={<Events />} />
        <Route exact path="/attendees" element={<Attendees />} />
        <Route exact path="/editupcoming/:id" element={<EditUpcoming />} />
        <Route  path="/editprevious/:id" element={<EditPrevious />} />
        <Route  path="/eventdetails/:id" element={<EventDetails />} />
        <Route  path="/editevent/:id" element={<EditEvent />} /> 
        <Route  path="/editservice/:id" element={<EditServices />} /> 
        <Route  path="/editstatistic/:id" element={<EditStatistics />} />
        <Route  path="/edittestimonial/:id" element={<EditTestimonials />} />
        <Route exact path="/edittopics/:id" element={<EditTopics />} />
        <Route exact path="/editspeakers/:id" element={<EditSpeakers />} />
        <Route exact path="/editusers/:id" element={<EditUser />} />
        <Route exact path="/editspeakers" element={<EditSpeakers />} />
        <Route exact path="/addtestimonials" element={<AddTestimonials />} />
        <Route exact path="/addabout" element={<AddAbout />} />
        <Route exact path="/event/:id/addtopic" element={<AddTopic />} />
        <Route exact path="/item/:id/addspeaker" element={<AddSpeaker />} />
        <Route exact path="/addevents" element={<AddEvent />} />
        <Route exact path="/addstatistics" element={<AddStatistics />} />
        <Route exact path="/addconfig" element={<AddConfig />} />
        <Route exact path="/addservices" element={<AddServices />} />
        <Route exact path="/addattendee" element={<AddAttendee />} />
        <Route exact path="/array" element={<Array />} />


        

        {/*<Route exact path="/events" element={<Events />} />
        <Route path="/eventdetails/:id" element={<EventDetails />} />*/}
      </Routes>
      </div>
      </div>

    </div>

</Router>
  );
}

export default App;
