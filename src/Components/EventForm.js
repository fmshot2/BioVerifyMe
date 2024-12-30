import { useNavigate } from 'react-router-dom';
import Button from '../ReUsables/Button'
import { Link, Form } from 'react-router-dom';


function EventForm({ event, handleInputChange, message }) {

    return (
        <div className="card">
            <div className="card-body">
                <Form method='post'>
                    <div className="row gutters">
                        <div className="col-xl-4 col-lglg-4 col-md-4 col-sm-4 col-12">
                            <div className="form-group">
                                <label htmlFor="inputTitle">TITLE</label>
                                <input type="text" className="form-control" id="inputTitle"
                                    placeholder="Enter full name"
                                    name="title" onChange={handleInputChange}
                                    value={event.title}></input>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lglg-4 col-md-4 col-sm-4 col-12">
                            <div className="form-group">
                                <label htmlFor="inputDate">Input DATE</label>
                                <input type="date" className="form-control" id="inputDate"
                                    placeholder="Enter Date"
                                    name="date" onChange={handleInputChange}
                                    value={event.date}>
                                </input>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lglg-4 col-md-4 col-sm-4 col-12">
                            <div className="form-group">
                                <label htmlFor="inputDetails">Input DETAILS</label>
                                <input type="text" className="form-control" id="inputDetails"
                                    placeholder="Enter Details"
                                    name="details" onChange={handleInputChange}
                                    value={event.details}>
                                </input>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lglg-4 col-md-4 col-sm-4 col-12">
                            <div className="form-group">
                                <label htmlFor="inputStarttime">Input Start Time</label>
                                <input type="starttime" className="form-control" id="inputStarttime"
                                    placeholder="Enter Starttime"
                                    name="starttime" onChange={handleInputChange}
                                    value={event.time_start}>
                                </input>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lglg-4 col-md-4 col-sm-4 col-12">
                            <div className="form-group">
                                <label htmlFor="inputDate">Input EndTime</label>
                                <input type="Endtime" className="form-control" id="inputEndtime"
                                    placeholder="Enter Endtime"
                                    name="endtime" onChange={handleInputChange}
                                    value={event.time_end}>
                                </input>
                            </div>
                        </div>



                    </div>
                </Form>
                <div className="d-flex justify-content-between">
                    <div>
                        <Button
                            size='btn-sm'
                            textcolor='white'
                            color='btn-primary'
                            text="Update Event"
                        // onClick={updateEvent}
                        />
                        <p>{message}</p>
                    </div>
                    <div>
                        <Link to="/events"
                            type="submit" className="btn btn-danger "
                        >All Events</Link>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default EventForm;
