import React, { useState, useEffect } from 'react';
import EventsDataService from "../Services/EventsService";
import UpcomingDataService from "../Services/UpcomingEventsServices";
import TopCard from './TopCard';
import { useRouteLoaderData } from 'react-router-dom';
import AuthService from "../Services/Auth/auth.service";

function TopCards() {
  const token = useRouteLoaderData('root');
  console.log('tokentopcard', token);

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState(0);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }

    // Fetch data
    const fetchData = async () => {
      try {
        const eventsResponse = await EventsDataService.getAll();
        setEvents(eventsResponse.data.length);

        const upcomingResponse = await UpcomingDataService.getAll();
        setUpcomingEvents(upcomingResponse.data.length);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (currentUser) {
    return (
      <div>
        <div className="row gutters">
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
            <TopCard
              color="info-icon info"
              total="Total Events"
              icon="icon-eye1"
              events={events}
            />
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
            <TopCard
              color="info-icon danger"
              total="Upcoming Event(s)"
              icon="icon-shopping-cart1"
              events={upcomingEvents}
            />
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
            <TopCard
              color="info-icon warning"
              total="Total Users"
              icon="icon-shopping-bag1"
              events="3456" // Replace with dynamic data if available
            />
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
            <TopCard
              color="info-icon success"
              total="Total"
              icon="icon-activity"
              events="1000" // Replace with dynamic data if available
            />
          </div>
        </div>
      </div>
    );
  }

  return null; // Or a message if you want to handle logged-in users differently
}

export default TopCards;
