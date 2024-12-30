import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PartnerDataService from "../Services/PartnerService";
import AuthService from "../Services/Auth/auth.service";
import swal from 'sweetalert';

function PartnersComponent() {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  // const [galleries, setPartner] = useState([]);
  const [partners, setPartner] = useState([]);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (!user) {
      retrievePartner();
    } else {
      navigate("/login");

    }

  }, []);

  const retrievePartner = () => {
    PartnerDataService.getAll()
      .then(response => {
        console.log("Partner", response);
        process.env.REACT_APP_API_SOURCE === 'laravel' ? setPartner(response.data) : setPartner(response.data.data);
        setLoading(false);
        console.log("Partner", response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deletePartner = (e, id) => {
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
          PartnerDataService.remove(id)
            .then(response => {
              console.log("delete", response.data);
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
              setPartner(partners.filter((partners) => partners._id !== id))
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
        {/* <div className="row">
          <Link to={'/addevent'} className="btn btn-primary btn-sm float-end"> Add  EVENTS</Link>
        </div> */}


        <div class="row gutters">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="card border-warning">
              <div class="card-header bg-warning">Partners</div>
              <div class="card-body text-primary">
                {/* <h5 class="card-title">Partners Table</h5> */}
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
                      {partners.map((partner, index) => (

                        <tr key={index}>
                          <td>{partner.id ? partner.id : partner._id}</td>
                          <td>{partner.title}</td>
                          <td>{partner.details}</td>
                          <td>
                             <img width="32" height="32" src={`${process.env.REACT_APP_API_BaseURL}/uploads/${partner.images[0].name}`}>
                          </img>
                           </td>
                          <td>
                            <div className="text-center">
                              <Link to={`/editpartner/${partner._id}`}><span class="icon-pencil"></span></Link>
                              <span onClick={(e) => deletePartner(e, partner._id)} class="icon-trash-2"></span>
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
    
    export default PartnersComponent     