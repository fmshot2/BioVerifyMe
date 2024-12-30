import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';
import AboutDataService from "../Services/AboutService";
import Button from '../ReUsables/Button'
import AuthService from "../Services/Auth/auth.service";


function About() {
  let navigate = useNavigate();

  let idKey = process.env.REACT_APP_API_SOURCE === 'laravel' ? "id" : "_id";

    const initialAboutState = {
      // id: null,
    title: "",
    details: "",
  };
  initialAboutState[idKey] = null;

    const [loading, setLoading] = useState(true);
    const [about, setAbout] = useState(initialAboutState);
    const [message, setMessage] = useState("");
  

    useEffect(() => {
      const user = AuthService.getCurrentUser();
      if (user) {
        navigate("/login");
      } else {
        retrieveAbout();
      }

  }, []);

    const retrieveAbout = () => {
    AboutDataService.getAll()
      .then(response => {
        process.env.REACT_APP_API_SOURCE === 'laravel' ?  setAbout(response.data) : setAbout(response.data.data[0]);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setAbout({ ...about, [name]: value });
  };

  const updateAbout = (e) => {
    e.preventDefault();
    AboutDataService.update(about.id ? about.id : about._id, about)
      .then(response => {
        console.log( "about", response.data);
        setMessage(" About Status was updated successfully!");
        console.log( "abouts", message);

      })
      .catch(e => {
        console.log(e);
      });
      

 };

// Function is temporarily disabled

// const deleteAbout = (e, id) => {
//   e.preventDefault();
//     AboutDataService.remove(about.id ? about.id : about._id)
//       .then(response => {
//         console.log(response.data);
//         setMessage(" About Status was deleted successfully!");
//         navigate("/addabout");
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   };


  const newAbout = () => {
    setAbout(initialAboutState);
    
  };


if (loading) {
        return <h4 className="text-center">Loading About Page </h4>
    }
else

    return (

      <div className="container">
        
      {about ? (

            <div className="card">
              <div className="card-body">
              <form onSubmit={updateAbout} >

                <div className="row gutters">

                    <div className="col-xl-4 col-lglg-4 col-md-4 col-sm-4 col-12">
                      <div className="form-group">
                        <label htmlFor="inputTitle">ID</label>
                        <input type="text" className="form-control" id="inputid"
                          placeholder="Enter id" 
                          name="title" onChange={handleInputChange}
                          value={about.id ? about.id : about._id}></input>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lglg-4 col-md-4 col-sm-4 col-12">
                      <div className="form-group">
                        <label htmlFor="inputTitle">Input TITLE</label>
                        <input type="title" className="form-control" id="inputtitle"
                          placeholder="Enter title"
                           name="title" onChange={handleInputChange}
                          value={about.title}>
                          </input>
                      </div>
                    </div>

                    <div className="col-xl-4 col-lglg-4 col-md-4 col-sm-4 col-12">
                      <div className="form-group">
                        <label htmlFor="inputDetails">Input DETAILS</label>
                        <input type="text" className="form-control" id="inputDetails"
                          placeholder="Enter Details"
                            name="details" onChange={handleInputChange}
                          value={about.details}>
                          </input>
                      </div>
                    </div>
                  
                    </div>
                    </form>
                    <div className="d-flex justify-content-between">
        <div>
              <Button
              size='btn-sm'
              textcolor='white'
              color='btn-warning'
               text="Update About"
               onClick={updateAbout} />
               <p>{message}</p>
           </div>
           <div>
           {/* <Button
              size='btn-sm'
              textcolor='red'
              color='btn-info'
               text="Delete About"
               onClick={(e)=>deleteAbout(e, about.id ? about.id : about._id)} /> */}
               
           </div>
           </div>

              </div>
            </div>
            
      ) : (
        <div>
          <br />
          <h2 className="text-center text-danger">No About Details, please Add About Details ...</h2>
          <Link to={'/addabout'} className="btn btn-warning btn-sm float-end">AddAbouts</Link>
        </div>
      )}

    </div>
    );

}
export default About;