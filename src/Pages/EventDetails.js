import { Suspense } from 'react';
import EventItem from '../components/EventItem';
import { useRouteLoaderData, json, defer, Await, redirect } from 'react-router-dom';
import EventDetailsDataService from "../Services/EventDetailsService";
import swal from 'sweetalert';
import ItemsDataService from "../Services/ItemService";
import EventsList from '../components/EventsList';
import EventsDataService from "../Services/EventsService";

function EventDetails() {
  const { event, events } = useRouteLoaderData('event-detail');
  console.log('single event use loader', events);
  console.log('events use loader', events);

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}
export default EventDetails;

export async function loadEvent(id) {
  try {
    const response = await EventDetailsDataService.get(id);
    const resData = process.env.REACT_APP_API_SOURCE === 'laravel'
      ? await response.data
      : await response.data.data;
    return resData;
  } catch (error) {
    return json(
      { message: 'Could not fetch eventdetails.' },
      { status: 500 }
    )
  }
};

async function loadEvents() {
  try {
    const response = await EventsDataService.getAll();

    const resData = process.env.REACT_APP_API_SOURCE === 'laravel'
      ? await response.data
      : await response.data.data;
    return resData;
  } catch (error) {
    return json(
      { message: 'Could not fetch events.' },
      { status: 500 }
    )
  }
}

export async function loader({ request, params }) {
  const id = params.id;

  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
};

export async function action({ params, request }) {
  try {
    const id = params.id;

    const response = await ItemsDataService.remove(id)
    swal("Poof! Your imaginary file has been deleted!", {
      icon: "success",
    });
    return redirect('/events');

  } catch (error) {
    return json(
      { message: 'Could not fetch eventdetails.' },
      { status: 500 }
    )
  }
};
