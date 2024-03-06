import React, { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
// import sliderDataService from "../Services/sliderService";
import SliderDataService from "../Services/SliderService";
import AuthService from "../Services/Auth/auth.service";
import swal from 'sweetalert';

function Slider() {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    // const [galleries, setslider] = useState([]);
    const [sliders, setSlider] = useState([]);
  
    useEffect(() => {
      const user = AuthService.getCurrentUser();
  
      if (user) {
        retrieveSlider();
      } else {
        navigate("/login");
  
      }
  
    }, []);
  
    const retrieveSlider = () => {
      SliderDataService.getAll()
        .then(response => {
          console.log("slider", response);
          process.env.REACT_APP_API_SOURCE === 'laravel' ? setSlider(response.data) : setSlider(response.data.data);
          setLoading(false);
          console.log("slider", response.data);
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
                console.log("delete", response.data);
                swal("Poof! Your imaginary file has been deleted!", {
                  icon: "success",
                });
                setSlider(sliders.filter((slider) => slider._id !== id))
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
            <Link to={'/addevents'} className="btn btn-primary btn-sm float-end"> Add  EVENTS</Link>
          </div>
  
  
          <div class="row gutters">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div class="card border-warning">
                <div class="card-header bg-warning">Sliders</div>
                <div class="card-body text-primary">
                  {/* <h5 class="card-title">Sliders Table</h5> */}
                  <div class="table-responsive">
                    <table class="table table-bordered table-stripped m-0 text-center">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Title</th>
                          <th>Details</th>
                          <th>Image</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sliders.map((slider, index) => (
  
                          <tr key={index}>
                            <td>{slider.id ? slider.id : slider._id}</td>
                            <td>{slider.title}</td>
                            <td>{slider.details}</td>
                            <td>
                               <img width="32" height="32" src={`${process.env.REACT_APP_API_BaseURL}/uploads/${slider.images[0].name}`}>
                            </img>
                             </td>
                            <td>
                              <div className="text-center">
                                <Link to={`/editslider/${slider._id}`}><span class="icon-pencil"></span></Link>
                                <span onClick={(e) => deleteSlider(e, slider._id)} class="icon-trash-2"></span>
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

export default Slider