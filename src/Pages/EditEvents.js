import React, { useState, useEffect } from 'react';
import EventsDataService from "../Services/EventsService";
import ItemsDataService from "../Services/ItemService";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import AuthService from "../Services/Auth/auth.service";
import axios from 'axios';
import Button from '../ReUsables/Button'
import swal from 'sweetalert';
import { useRouteLoaderData } from 'react-router-dom';
import EventForm from '../Components/EventForm';


function EditEvents() {
  let params = useParams();
  let navigate = useNavigate();
  const event = useRouteLoaderData('event-detail');


  // const initialEventDetailsState = {
  //   title: "",
  //   date: "",
  //   details: ""
  // };
  // const [currentevent, setCurrentEvent] = useState(initialEventDetailsState);
  // console.log('setcurrentevent1', currentevent);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  // const [Topics, setTopics] = useState([]);

  // const getEventDetails = id => {
  //   EventsDataService.get(id)
  //     .then(response => {
  //       process.env.REACT_APP_API_SOURCE === 'laravel' ? setCurrentEvent(response.data) : setCurrentEvent(response.data.data);
  //       // process.env.REACT_APP_API_SOURCE === 'laravel' ? setItems(response.data.data.items) : setItems(response.data.data.eventitems);
  //       setItems(response.data.data.eventitems);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  const handleInputChange = event => {
    const { name, value } = event.target;
    // setCurrentEvent({ ...currentevent, [name]: value });
    // const { _id, ...eventWithoutId } = currentevent;
    // console.log('setcurrentevent', eventWithoutId);

  };

  // useEffect(() => {
  //   getEventDetails(params.id);
  // }, [params.id]);


  // const updateEvent = (e) => {
  //   e.preventDefault();
  //   // Exclude _id from currentevent before sending to the update function
  //   const { _id, ...eventWithoutId } = currentevent;
  //   console.log('eventWithoutId', eventWithoutId);
  //   EventsDataService.update(currentevent.id, eventWithoutId)
  //     .then(response => {
  //       setMessage("The event was updated successfully!");
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };


  const deleteItems = (e, id) => {
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
          ItemsDataService.remove(id)
            .then(response => {
              console.log("delete", response.data.data);
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
              setItems(items.filter((item) => item.id !== id))
            });
        }
        else {
          swal("Your imaginary file is safe!");
        }
      })
  };


  return (
    <div className="container">
      <div className="d-flex justify-content-around">
        <div>
          <Link to={'/addevent'} className="btn btn-warning btn-sm float-end"> Add Event</Link>
        </div>
        <div>
          <Link to={'/attendees'} className="btn btn-secondary btn-sm float-end"> See Attendees</Link>
        </div>
        <div>
          <Link to={'/addattendee'} className="btn btn-success btn-sm float-end"> Add Attendee</Link>
        </div>
      </div>
      {event ? (

     <EventForm event={event} />

        // <div className="card">
        //   <div className="card-body">
        //     <form>

        //       <div className="row gutters">

        //         <div className="col-xl-4 col-lglg-4 col-md-4 col-sm-4 col-12">
        //           <div className="form-group">
        //             <label htmlFor="inputTitle">TITLE</label>
        //             <input type="text" className="form-control" id="inputTitle"
        //               placeholder="Enter full name"
        //               name="title" onChange={handleInputChange}
        //               value={event.title}></input>
        //           </div>
        //         </div>
        //         <div className="col-xl-4 col-lglg-4 col-md-4 col-sm-4 col-12">
        //           <div className="form-group">
        //             <label htmlFor="inputDate">Input DATE</label>
        //             <input type="date" className="form-control" id="inputDate"
        //               placeholder="Enter Date"
        //               name="date" onChange={handleInputChange}
        //               value={event.date}>
        //             </input>
        //           </div>
        //         </div>

        //         <div className="col-xl-4 col-lglg-4 col-md-4 col-sm-4 col-12">
        //           <div className="form-group">
        //             <label htmlFor="inputDetails">Input DETAILS</label>
        //             <input type="text" className="form-control" id="inputDetails"
        //               placeholder="Enter Details"
        //               name="details" onChange={handleInputChange}
        //               value={event.details}>
        //             </input>
        //           </div>
        //         </div>
        //         <div className="col-xl-4 col-lglg-4 col-md-4 col-sm-4 col-12">
        //           <div className="form-group">
        //             <label htmlFor="inputStarttime">Input Start Time</label>
        //             <input type="starttime" className="form-control" id="inputStarttime"
        //               placeholder="Enter Starttime"
        //               name="starttime" onChange={handleInputChange}
        //               value={event.time_start}>
        //             </input>
        //           </div>
        //         </div>
        //         <div className="col-xl-4 col-lglg-4 col-md-4 col-sm-4 col-12">
        //           <div className="form-group">
        //             <label htmlFor="inputDate">Input EndTime</label>
        //             <input type="Endtime" className="form-control" id="inputEndtime"
        //               placeholder="Enter Endtime"
        //               name="endtime" onChange={handleInputChange}
        //               value={event.time_end}>
        //             </input>
        //           </div>
        //         </div>



        //       </div>
        //     </form>
        //     <div className="d-flex justify-content-between">
        //       <div>
        //         <Button
        //           size='btn-sm'
        //           textcolor='white'
        //           color='btn-primary'
        //           text="Update Event"
        //           // onClick={updateEvent}
        //            />
        //         <p>{message}</p>
        //       </div>
        //       <div>
        //         <Link to="/events"
        //           type="submit" className="btn btn-danger "
        //         >All Events</Link>
        //       </div>
        //     </div>

        //   </div>
        // </div>

      ) : (
        <div>
          <br />
          <p>Please Click on an Event...</p>
        </div>
      )}

      <div class="d-flex justify-content-between">
        <h2 className="text-danger"> EVENT TOPICS </h2>
        <Link to={`/event/${params.id}/addtopic`}
          type="submit" className="btn btn-success "
        >Add EVENT TOPICS</Link>
      </div>

      <div class="row gutters">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="card">
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered table-dark m-0 text-center">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Details</th>
                      <th>Date</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (

                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.details}</td>
                        <td>{item.date}</td>
                        <td>{item.time_start}</td>
                        <td>{item.time_end}</td>
                        <td>
                          <div className="text-center">
                            <Link to={`/edittopics/${item.id}`}><span class="icon-pencil"></span></Link>
                            <span onClick={(e) => deleteItems(e, item.id)} class="icon-trash-2"></span>
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

  );

}

export default EditEvents;
