import React, { useState, useEffect } from "react";
import AuthService from "../Services/Auth/auth.service";
import EventsDataService from "../Services/EventsService";
import Button from '../ReUsables/Button';
import { Link, Form, json, redirect, useActionData, useNavigate, useNavigation } from 'react-router-dom';
import EventForm from '../components/EventForm';
const AddEvent = () => {

  // const handleInputChange = input => {
  //   const { name, value } = input.target;
  //   setEvent({ ...event, [name]: value });
  // };

  // const saveEvent = () => {
  //   var data = {
  //     title: event.title,
  //     details: event.details,
  //     no_of_days: event.no_of_days,
  //     start_date:  event.start_date,
  //     // status: event.status
  //   };
  //   console.log("data event", data);

  //   EventsDataService.create(data)
  //     .then(response => {
  //       process.env.REACT_APP_API_SOURCE === 'laravel' ? setresponseObj(response.data) : setresponseObj(response.data.data);
  //       // console.log("addevent", response.data);

  //       setEvent({
  //         // id: response.data.id,
  //         title: responseObj.title,
  //         details: responseObj.details,
  //         start_date: responseObj.start_date,
  //         no_of_days: responseObj.no_of_days,
  //         end_date: responseObj.end_date,
  //         // status: response.data.status
  //       });
  //       setSubmitted(true);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  // const newEvent = () => {
  //   setEvent(initialEventState);
  //   setSubmitted(false);
  // };

  return (
    <div className="submit-form">
      <EventForm method="POST" />
    </div>
  );
};

export default AddEvent

