import React, { useState, useEffect } from 'react';
import GalleryDataService from "../Services/GalleryService";
import ItemsDataService from "../Services/ItemService";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import AuthService from "../Services/Auth/auth.service";
import axios from 'axios';
import Button from '../ReUsables/Button'
import swal from 'sweetalert';


function EditGallery() {
  console.log('gall');
  let params = useParams();
  let navigate = useNavigate();

  const initialGalleryDetailsState = {
    id: null,
    title: "",
    image: ""
  };
  const [currentgallery, setCurrentGallery] = useState(initialGalleryDetailsState);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  // const [Topics, setTopics] = useState([]);

  const getGalleryDetails = id => {
    GalleryDataService.get(id)
      .then(response => {
        console.log("eventDppp", response);
        process.env.REACT_APP_API_SOURCE === 'laravel' ? setCurrentGallery(response.data) : setCurrentGallery(response.data.data);
        // process.env.REACT_APP_API_SOURCE === 'laravel' ? setItems(response.data.data.items) : setItems(response.data.data.eventitems);
        setItems(response.data.data.eventitems);
        
        console.log("eventD3", response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

    const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentGallery({ ...currentgallery, [name]: value });
  };

  useEffect(() => {
    getGalleryDetails(params.id);
  }, [params.id]);
  

  const updateGallery = (e) => {
    e.preventDefault();

    GalleryDataService.update(currentgallery.id, currentgallery)
    console.log("file", currentgallery)

      .then(response => {
        console.log("events", response.data);
        setMessage("The event was updated successfully!");
        console.log("eventss", message);

      })
      .catch(e => {
        console.log(e);
      });
  };


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
         else  {
          swal("Your imaginary file is safe!");
        }
 }) 
};


  return (
    <div className="container">
      {currentgallery ? (

        <div className="card">
          <div className="card-body">
            <form onSubmit={updateGallery} >

              <div className="row gutters">

                <div className="col-xl-4 col-lglg-4 col-md-4 col-sm-4 col-12">
                  <div className="form-group">
                    <label htmlFor="inputTitle">TITLE</label>
                    <input type="text" className="form-control" id="inputTitle"
                      placeholder="Enter full name"
                      name="title" onChange={handleInputChange}
                      value={currentgallery.title}></input>
                  </div>
                </div>

                <div className="col-xl-4 col-lglg-4 col-md-4 col-sm-4 col-12">
                  <div className="form-group">
                    <label htmlFor="inputDetails">Input DETAILS</label>
                    <input type="text" className="form-control" id="inputDetails"
                      placeholder="Enter Details"
                      name="details" onChange={handleInputChange}
                      value={currentgallery.details}>
                    </input>
                  </div>
                </div>

                <div className="col-xl-4 col-lglg-4 col-md-4 col-sm-4 col-12">
                  <div className="form-group">
                    <label htmlFor="image">Input Image</label>
                    <input type="file" accept="image/*" multiple="multiple"  className="form-control" id="image"
                      placeholder="Upload Image"
                      name="file" onChange={handleInputChange}
                      value={currentgallery.image}>
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
                  color='btn-primary'
                  text="Update Gallery"
                  onClick={updateGallery} />
                <p>{message}</p>
              </div>
              <div>
                <Link to="/galleries"
                  type="submit" className="btn btn-danger "
                >All Galleries</Link>
              </div>
            </div>

          </div>
        </div>

      ) : (
        <div>
          <br />
          <p>Please Click on a Gallery...</p>
        </div>
      )}

    </div>

  );

}

export default EditGallery;
