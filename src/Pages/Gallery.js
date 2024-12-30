import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GalleryDataService from "../Services/GalleryService";
import AuthService from "../Services/Auth/auth.service";
import swal from 'sweetalert';


function Gallery() {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [galleries, setGallery] = useState([]);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (!user) {
      retrieveGallery();
    } else {
      navigate("/login");

    }

  }, []);

  const retrieveGallery = () => {
    GalleryDataService.getAll()
      .then(response => {
        console.log("gallery1", response);
        process.env.REACT_APP_API_SOURCE === 'laravel' ? setGallery(response.data) : setGallery(response.data.data);
        setLoading(false);
        console.log("gallery2", response.data.data);
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
              console.log("delete", response.data);
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
              setGallery(galleries.filter((gallery) => gallery._id !== id))
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
              <div class="card-header bg-warning">Gallery</div>
              <div class="card-body text-primary">
                <h5 class="card-title">Gallery Table</h5>
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
                      {galleries.map((gallery, index) => (

                        <tr key={index}>
                          <td>{gallery.id ? gallery.id : gallery._id}</td>
                          <td>
                            <Link to={`${gallery.id ? gallery.id : gallery._id}`}>
                              {gallery.title}
                            </Link>
                          </td>
                          <td>
                            <Link to={`${gallery.id ? gallery.id : gallery._id}`}>
                              {gallery.details}
                            </Link>
                          </td>
                          <td>
                            <img width="32" height="32" src={`${process.env.REACT_APP_API_BaseURL}/uploads/${gallery?.images[0]?.name}`}>
                            </img>
                          </td>
                          <td>
                            <div className="text-center">
                              <Link to={`${gallery._id}/edit`}><span class="icon-pencil"></span></Link>
                              <span onClick={(e) => deleteGallery(e, gallery._id)} class="icon-trash-2"></span>
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
export default Gallery;
