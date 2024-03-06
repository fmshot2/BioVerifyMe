import React, { useState, useEffect } from 'react';
import SliderDataService from "../Services/SliderService";
import ItemsDataService from "../Services/ItemService";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import AuthService from "../Services/Auth/auth.service";
import axios from 'axios';
import Button from '../ReUsables/Button'
import swal from 'sweetalert';


function EditSlider() {
  console.log('gall');
  let params = useParams();
  let navigate = useNavigate();

  const initialSliderDetailsState = {
    id: null,
    title: "",
    images: [],
    details: ""
  };
            // console.log("setting1", currentslider)

  const [currentslider, setCurrentSlider] = useState(initialSliderDetailsState);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);

  const getSliderDetails = id => {
    SliderDataService.get(id)
      .then(response => {
        process.env.REACT_APP_API_SOURCE === 'laravel' ? setCurrentSlider(response.data) : setCurrentSlider(response.data.data);
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
          setImagePreview(event.target.files[0] )
          setCurrentSlider((prevState) => {
            return { ...prevState, images: event.target.files[0] };
          });
        }
      }
      console.log("imagePreview", imagePreview)

      reader.readAsDataURL(event.target.files[0])

    }
    if (event.target.name !== 'file') {
      setCurrentSlider((prevState) => {
        return { ...prevState, [event.target.name]: event.target.value };
      });
      console.log("setting", currentslider)
    }
  };

  useEffect(() => {
    getSliderDetails(params.id);
    console.log("hhhh", currentslider);
  }, [params.id]);


  const updateSlider = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('title', currentslider.title);
    formData.set('details', currentslider.details);
    formData.set('file', currentslider.images);

    SliderDataService.update(currentslider.id, formData)
      .then(response => {
      })
      .catch(e => {
        console.log(e);
      });
  };


  const deleteSlider = (e, id) => {
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
          SliderDataService.remove(id)
            .then(response => {
              console.log("delete", response.data.data);
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
              // setCurrentSlider(items.filter((item) => item.id !== id))
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
      {currentslider ? (

        <div className="card">
          <div className="card-body">
            <form onSubmit={updateSlider} encType='multipart/form-data'>

              <div className="row gutters">

              <div className={`col-xl-${getColumnWidth()} col-lg-${getColumnWidth()} col-md-${getColumnWidth()} col-sm-${getColumnWidth()} col-12`}>
                  <div className="form-group">
                    <label htmlFor="inputTitle">TITLE</label>
                    <input type="text" className="form-control" id="inputTitle"
                      placeholder="Enter full name"
                      name="title" onChange={handleInputChange}
                      value={currentslider.title}></input>
                  </div>
                </div>

                <div className={`col-xl-${getColumnWidth()} col-lg-${getColumnWidth()} col-md-${getColumnWidth()} col-sm-${getColumnWidth()} col-12`}>
                  <div className="form-group">
                    <label htmlFor="inputDetails">Input DETAILS</label>
                    <input type="text" className="form-control" id="inputDetails"
                      placeholder="Enter Details"
                      name="details" onChange={handleInputChange}
                      value={currentslider.details}>
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
                      // value={currentslider.images[0].name}                    
                      >
                    </input>
                  </div>
                </div>
                <div className={`col-xl-${getColumnWidth()} col-lg-${getColumnWidth()} col-md-${getColumnWidth()} col-sm-${getColumnWidth()} col-12`}>
                  <div className="form-group">
                  { imagePreview ?  (
                    <div>
                    <label htmlFor="image">Preview</label>
                  <div><img  width="72" height="50" src={URL.createObjectURL(imagePreview)}></img></div>
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
                  text="Update Slider"
                  // onClick={updateSlider}
                  type="submit" />
                {/* <p>{message}</p> */}
              </div>
              <div>
                <Link to={"/sliders"}
                  type="button" className="btn btn-danger "
                >All Sliders</Link>
              </div>
            </div>
            </form>
          </div>
        </div>

      ) : (
        <div>
          <br />
          <p>Please Click on a Slider...</p>
        </div>
      )}

    </div>

  );

}

export default EditSlider;
