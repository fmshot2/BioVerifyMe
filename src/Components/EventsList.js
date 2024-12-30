// import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';

function EventsList({events}) {

  return (
    
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
                                            {/* <span onClick={(e) => deleteEvent(e, event.id)} class="icon-trash-2"></span> */}
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
  );
}

export default EventsList;
