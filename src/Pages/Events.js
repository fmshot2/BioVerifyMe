import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import EventsDataService from "../Services/EventsService";
import AuthService from "../Services/Auth/auth.service";
import { useLoaderData, useRouteLoaderData, json, defer, Await } from 'react-router-dom';
import EventsList from '../components/EventsList';

function Events() {
    const { events } = useLoaderData();
    const token = useRouteLoaderData('root');

    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading Events...</p>}>
            <Await resolve={events}>
                {(loadedEvents) => <div>
                    {token &&
                    <div className="row">
                        <Link to={'addevent'} className="btn btn-primary btn-sm float-end"> Add  Events</Link>
                    </div>
                }
                    <EventsList events={loadedEvents} />
                </div>
                }
            </Await>
        </Suspense>
    );
}


export default Events;

async function loadEvents() {
    try {
        const response = await EventsDataService.getAll();

        const resData = process.env.REACT_APP_API_SOURCE === 'laravel'
            ? await response.data
            : await response.data.data;
        return resData;

    } catch (error) {
        // use this if u want to build your response 
        // by yourself from the browser's Response object
        // throw new Response(JSON.stringify(
        // { message: 'Could not fetch events.' }), 
        // { status: 500 }
        // )
        // ;

        //or use react's json function
        return json(
            { message: 'Could not fetch events.' },
            { status: 500 }
        )
    }
}

export function loader() {
    // create an object from react's defer function
    return defer({
        events: loadEvents(),
    });
}