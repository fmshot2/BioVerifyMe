import React, { useState, useEffect } from "react";
import AuthService from "../Services/Auth/auth.service";
import EventsDataService from "../Services/EventsService";
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ReUsables/Button'


const AddEvent = () => {
  let navigate = useNavigate();

  const initialEventState = {
    // id: null,
    title: "",
    details: "",
    start_date: "",
    no_of_days: "",
    // status: ""
  };
  const [event, setEvent] = useState(initialEventState);
  const [submitted, setSubmitted] = useState(false);
  const [responseObj, setresponseObj] = useState({});

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (!user) {
      navigate("/login");
    } else {
      return
    }

  }, []);

  const handleInputChange = input => {
    const { name, value } = input.target;
    setEvent({ ...event, [name]: value });
  };

  const saveEvent = () => {
    var data = {
      title: event.title,
      details: event.details,
      no_of_days: event.no_of_days,
      start_date:  event.start_date,
      // status: event.status
    };
    console.log("data event", data);
    // return;

    EventsDataService.create(data)
      .then(response => {
        process.env.REACT_APP_API_SOURCE === 'laravel' ? setresponseObj(response.data) : setresponseObj(response.data.data);
// console.log("addevent", response.data);

        setEvent({
          // id: response.data.id,
          title: responseObj.title,
          details: responseObj.details,
          start_date: responseObj.start_date,
          no_of_days: responseObj.no_of_days,
          end_date: responseObj.end_date,
          // status: response.data.status
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newEvent = () => {
    setEvent(initialEventState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>


          <div className="d-flex justify-content-between">
            <Button
              size='btn-sm'
              textcolor='white'
              color='btn-warning'
              text="Add Event"
              onClick={newEvent} />
            <Link to={'/events'} className="btn btn-warning btn-sm float-end">Events</Link>

          </div></div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={event.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="details">Details</label>
            <input
              type="text"
              className="form-control"
              id="details"
              required
              value={event.details}
              onChange={handleInputChange}
              name="details"
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Starting Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              required
              value={event.start_date}
              onChange={handleInputChange}
              name="start_date"
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">No of Days</label>
            <input
              type="text"
              className="form-control"
              id="no_of_days"
              required
              value={event.no_of_days}
              onChange={handleInputChange}
              name="no_of_days"
            />
          </div>
          {/*<div className="form-group">
            <label htmlFor="date">Status</label>
            <input
              type="status"
              className="form-control"
              id="status"
              required
              value={event.status}
              onChange={handleInputChange}
              name="status"
            />
      </div>*/}
          <div className="d-flex justify-content-between">
            <Button
              size='btn-sm'
              textcolor='white'
              color='btn-warning'
              text="Submit"
              onClick={saveEvent} />
            <Link to={'/events'} className="btn btn-warning btn-sm float-end">Events</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEvent
