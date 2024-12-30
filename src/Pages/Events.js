import React  from 'react';
import { Link } from 'react-router-dom';
import EventsDataService from "../Services/EventsService";
import Button from '../ReUsables/Button'
import swal from 'sweetalert';
import AuthService from "../Services/Auth/auth.service";
import { useLoaderData, json } from 'react-router-dom';
import EventsList from '../Components/EventsList';



function Events() {
    const events = useLoaderData();
    return (
        <div>
            <div className="row">
                <Link to={'/addevent'} className="btn btn-primary btn-sm float-end"> Add  EVENTS</Link>
            </div>
            <EventsList events={events} />;
        </div>
    )
}

// const deleteEvent = (e, id) => {
//     e.preventDefault();
//     swal({
//         title: "Are you sure?",
//         text: "Once deleted, you will not be able to recover this imaginary file!",
//         icon: "warning",
//         buttons: true,
//         dangerMode: true,
//     })
//         .then((willDelete) => {
//             if (willDelete) {
//                 EventsDataService.remove(id)
//                     .then(response => {
//                         console.log("delete", response.data);
//                         swal("Poof! Your imaginary file has been deleted!", {
//                             icon: "success",
//                         });
//                         setEvents(events.filter((event) => event.id !== id))
//                     });
//             }
//             else {
//                 swal("Your imaginary file is safe!");
//             }
//         })
// };


// if (loading) {
//     return <h4>Loading Events...</h4>
// }
// else

export default Events;

export async function loader() {
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

        //or user react's json function
        return json(
            { message: 'Could not fetch events.' },
            { status: 500 }
        )
    }
}