import React from "react";
import AuthService from "../Services/Auth/auth.service";
import EventsDataService from "../Services/EventsService";
import Button from '../ReUsables/Button';
import { Form, useActionData, useNavigate, useNavigation } from 'react-router-dom';

  const EventForm = ({ method, event }) => {
    console.log('event form', event);

  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }
  return (
    <div className="submit-form">
      <Form method={method}>
        {data && data.error && (
          <ul>
            {data.error.split(',').map((err, index) => (
              <h5 className="text-danger" key={index}>{err}</h5>
            ))}
          </ul>
        )}
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              defaultValue={event?.event ? event?.event?.title : ''}
            />
          </div>
          <div className="form-group">
            <label htmlFor="details">Details</label>
            <input
              type="text"
              className="form-control"
              id="details"
              name="details"
              defaultValue={event?.event ? event?.event?.details : ''}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Starting Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              name="start_date"
              defaultValue={event?.event ? event?.event?.start_date : ''}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">No of Days</label>
            <input
              type="text"
              className="form-control"
              id="no_of_days"
              name="no_of_days"
              defaultValue={event?.event ? event?.event?.no_of_days : ''}
            />
          </div>
          <div className="d-flex justify-content-between">
            <Button
              size='btn-sm'
              textcolor='white'
              color='btn-success'
              disabled={isSubmitting}
              text={isSubmitting ? 'Submitting...' : 'Save'}
            />
            <Button
              size='btn-sm'
              textcolor='white'
              color='btn-warning'
              disabled={isSubmitting}
              text='cancel'
              onClick={cancelHandler}
            />
            {/* <Link to={'/events'} className="btn btn-warning btn-sm float-end">Events</Link> */}
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EventForm


export async function action({ request, params }) {
  try {
    const method = request.method;

    const data = await request.formData();
    const eventData = {
      title: data.get('title'),
      details: data.get('details'),
      no_of_days: data.get('no_of_days'),
      start_date: data.get('start_date'),
    };

    if (method === 'PATCH') {
      const eventId = params.id;
      const response = await EventsDataService.update(eventId, eventData)

      const resData = process.env.REACT_APP_API_SOURCE === 'laravel'
        ? await response.data
        : await response.data.data;
      return resData;

    } else {
      const response = await EventsDataService.create(eventData)

      const resData = process.env.REACT_APP_API_SOURCE === 'laravel'
        ? await response.data
        : await response.data.data;
      return resData;
    }

  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return error.response.data;
    }
    // return json(
    //   { message: 'Could not save events.' },
    //   { status: 500 }
    // )
  }
}
