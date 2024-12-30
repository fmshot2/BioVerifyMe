// import classes from './EventItem.module.css';
import { Link } from 'react-router-dom';


function EventItem({ event }) {
  console.log('currenteventdetails', event);
  
  function startDeleteHandler() {
    // ...
  }

  return (

    <table className="table container" style={{ marginLeft: "200px", }}>
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">DETAILS</th>
          <th scope="col" className="text-end" >Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{event._id}</td>
          <td>{event.details}</td>
          {/* <td className="text-end">
          <div><button className="btn p-0" type="button" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit">
            <span className="text-500 fas fa-edit"></span></button><button className="btn p-0 ms-2" type="button"
              data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"><span className="text-500 fas fa-trash-alt"></span></button></div>
        </td> */}
          <td>
            <div className="text-center">
              {/* <Link to={`/editevent/${event._id}`}><span class="icon-pencil"></span></Link> */}
              <Link to='edit'><span class="icon-pencil"></span></Link>
              {/* <span onClick={(e) => deleteEvent(e, event.id)} class="icon-trash-2"></span> */}
            </div>
          </td>
        </tr>

      </tbody>
    </table>
  );
}

export default EventItem;
