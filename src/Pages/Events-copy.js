import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EventsDataService from "../Services/EventsService";
import Button from '../ReUsables/Button'
import swal from 'sweetalert';
import AuthService from "../Services/Auth/auth.service";



function Events() {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);



    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (!user) {
            retrieveEvents();
        } else {
            navigate("/login");

        }

    }, []);

    // const updateApiResponse = async (response) => {
    //     process.env.REACT_APP_API_SOURCE === 'laravel' ?  setEvents(response.data) : getApiResponse(response) ;
    //     // process.env.REACT_APP_API_SOURCE !== 'laravel' ??  setEvents(previousState => {
    //     //     return { ...previousState, _id : response.data.data._id}
    //     //   });
    // }

    const retrieveEvents = () => {
        EventsDataService.getAll()
            .then(response => {
                console.log("events", response);
                process.env.REACT_APP_API_SOURCE === 'laravel' ? setEvents(response.data) : setEvents(response.data.data);
                // updateApiResponse(response)
                console.log("events2", response);
                setLoading(false);
            })
            .catch(e => {
                console.log(e);
            });

    };

    const deleteEvent = (e, id) => {
        e.preventDefault();
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    EventsDataService.remove(id)
                        .then(response => {
                            console.log("delete", response.data);
                            swal("Poof! Your imaginary file has been deleted!", {
                                icon: "success",
                            });
                            setEvents(events.filter((event) => event.id !== id))
                        });
                }
                else {
                    swal("Your imaginary file is safe!");
                }
            })
    };


    if (loading) {
        return <h4>Loading Events...</h4>
    }
    else
        return (

            <div>
                <div className="row">
                    <Link to={'/addevent'} className="btn btn-primary btn-sm float-end"> Add  EVENTS</Link>
                </div>


                <div class="row gutters">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="card border-warning">
                            <div class="card-header bg-warning">Events</div>
                            <div class="card-body text-primary">
                                <h5 class="card-title">Events Table</h5>
                                <div class="table-responsive">
                                    <table class="table table-bordered table-stripped m-0 text-center">
                                        <thead>
                                            <tr>
                                                {/* <th>ID</th> */}
                                                <th>Title</th>
                                                <th>Details</th>
                                                <th>Date</th>
                                                <th>Status</th>
                                                <th>Start Time</th>
                                                <th>End Time</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {events.map((event, index) => (

                                                <tr key={index}>
                                                    {/* <td>{event.id ? event.id : event._id}</td> */}

                                                    <td>
                                                        <Link to={`${event.id ? event.id : event._id}`}>
                                                            {event.title}
                                                        </Link>
                                                    </td>

                                                    <td>
                                                        <Link to={`${event.id ? event.id : event._id}`}>
                                                            {event.details}
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Link to={`${event.id ? event.id : event._id}`}>
                                                            {event.date}
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Link to={`${event.id ? event.id : event._id}`}>
                                                            {event.status}
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Link to={`${event.id ? event.id : event._id}`}>
                                                            {event.time_start}
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Link to={`${event.id ? event.id : event._id}`}>
                                                            {event.time_end}
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <div className="text-center">
                                                            {/* <Link to={`/editevent/${event._id}`}><span class="icon-pencil"></span></Link> */}
                                                            <Link to={`${event.id ? event.id : event._id}/edit`}><span class="icon-pencil"></span></Link>
                                                            <span onClick={(e) => deleteEvent(e, event.id)} class="icon-trash-2"></span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        )
}
export default Events;
