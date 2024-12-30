import React, { useState, useEffect } from 'react';
import GalleryDataService from "../Services/GalleryService";
import ItemsDataService from "../Services/ItemService";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import AuthService from "../Services/Auth/auth.service";
import axios from 'axios';
import Button from '../ReUsables/Button'
import swal from 'sweetalert';


function EditGallery() {
  let params = useParams();
  let navigate = useNavigate();

  const initialGalleryDetailsState = {
    id: null,
    title: "",
    images: [],
    details: ""
  };
  console.log("para", params);


  const [currentgallery, setCurrentGallery] = useState(initialGalleryDetailsState);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);

  const getGalleryDetails = id => {
    GalleryDataService.get(id)
      .then(response => {
        process.env.REACT_APP_API_SOURCE === 'laravel' ? setCurrentGallery(response.data) : setCurrentGallery(response.data.data);
        // console.log("hhhh", currentgallery);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleInputChange = event => {
    if (event.target.name === 'file') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview(event.target.files[0])
          setCurrentGallery((prevState) => {
            return { ...prevState, images: event.target.files[0] };
          });
        }
      }
      console.log("imagePreview", imagePreview)

      reader.readAsDataURL(event.target.files[0])

    }
    if (event.target.name !== 'file') {
      setCurrentGallery((prevState) => {
        return { ...prevState, [event.target.name]: event.target.value };
      });
      console.log("setting", currentgallery)
    }
  };

  useEffect(() => {
    getGalleryDetails(params.id);
  }, [params.id]);


  const updateGallery = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('title', currentgallery.title);
    formData.set('details', currentgallery.details);
    formData.set('file', currentgallery.images);
    // console.log('form', formData);
    console.log("formhhhh", currentgallery);



    GalleryDataService.update(currentgallery.id, formData)
      .then(response => {
        console.log('Gallery updated successfully:', response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  const deleteGallery = (e, id) => {
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
          GalleryDataService.remove(id)
            .then(response => {
              console.log("delete", response.data.data);
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
              // setCurrentGallery(items.filter((item) => item.id !== id))
            });
        }
        else {
          swal("Your imaginary file is safe!");
        }
      })
  };
  const getColumnWidth = () => {
    return imagePreview === null ? 4 : 3;
  }

  return (
    <div className="container">
      {currentgallery ? (

        <div className="card">
          <div className="card-body">
            <form onSubmit={updateGallery} encType='multipart/form-data'>

              <div className="row gutters">

                <div className={`col-xl-${getColumnWidth()} col-lg-${getColumnWidth()} col-md-${getColumnWidth()} col-sm-${getColumnWidth()} col-12`}>
                  <div className="form-group">
                    <label htmlFor="inputTitle">TITLE</label>
                    <input type="text" className="form-control" id="inputTitle"
                      placeholder="Enter full name"
                      name="title" onChange={handleInputChange}
                      value={currentgallery.title}></input>
                  </div>
                </div>

                <div className={`col-xl-${getColumnWidth()} col-lg-${getColumnWidth()} col-md-${getColumnWidth()} col-sm-${getColumnWidth()} col-12`}>
                  <div className="form-group">
                    <label htmlFor="inputDetails">Input DETAILS</label>
                    <input type="text" className="form-control" id="inputDetails"
                      placeholder="Enter Details"
                      name="details" onChange={handleInputChange}
                      value={currentgallery.details}>
                    </input>
                  </div>
                </div>

                <div className={`col-xl-${getColumnWidth()} col-lg-${getColumnWidth()} col-md-${getColumnWidth()} col-sm-${getColumnWidth()} col-12`}>
                  <div className="form-group">
                    <label htmlFor="image">Input Image</label>
                    <input type="file" accept="image/*"
                      multiple="multiple"
                      className="form-control"
                      id="image"
                      placeholder="Upload Image"
                      name="file"
                      onChange={handleInputChange}
                    // value={currentgallery.images[0].name}                    
                    >
                    </input>
                  </div>
                </div>
                <div className={`col-xl-${getColumnWidth()} col-lg-${getColumnWidth()} col-md-${getColumnWidth()} col-sm-${getColumnWidth()} col-12`}>
                  <div className="form-group">
                    {imagePreview ? (
                      <div>
                        <label htmlFor="image">Preview</label>
                        <div><img width="72" height="50" src={URL.createObjectURL(imagePreview)}></img></div>
                      </div>) : <p></p>}
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <div>
                  <Button
                    size='btn-sm'
                    textcolor='white'
                    color='btn-primary'
                    text="Update Gallery"
                    // onClick={updateGallery}
                    type="submit" />
                  {/* <p>{message}</p> */}
                </div>
                <div>
                  <Link to={"/galleries"}
                    type="button" className="btn btn-danger "
                  >All Galleries</Link>
                </div>
              </div>
            </form>
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
