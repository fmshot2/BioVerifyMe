import React, { useState, useEffect } from 'react';
import AuthService from "../Services/Auth/auth.service";
import EventItem from '../Components/EventItem';
import { useLoaderData, json } from 'react-router-dom';
import { useRouteLoaderData } from 'react-router-dom';




import EventDetailsDataService from "../Services/EventDetailsService";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";


function EventDetails() {
  // const event = useLoaderData();
  const event = useRouteLoaderData('event-detail');
  console.log('eventeee', event);


  // const [currenteventdetails, setCurrentEventDetails] = useState({});
  const [message, setMessage] = useState("");

  return (

    <div className="table-responsive scrollbar">
      {event ? (
        <EventItem event={event} />
      ) : (
        <div>
          <br />
          <p>Loading DETAILS Content...</p>
        </div>
      )}
    </div>

  );
}
export default EventDetails;

export async function loader({ request, params }) {
    try {
      const id = params.id;    

      const response = await EventDetailsDataService.get(id);
      console.log('idd2', id);

      const resData = process.env.REACT_APP_API_SOURCE === 'laravel'
        ? await response.data
        : await response.data.data;
      return resData;

    } catch (error) {
      //or user react's json function
      return json(
        { message: 'Could not fetch eventdetails.' },
        { status: 500 }
      )
    }
  };
