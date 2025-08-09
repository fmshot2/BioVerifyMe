import { Link, useSubmit, useRouteLoaderData } from 'react-router-dom';
import swal from 'sweetalert';

function EventItem({ event }) {
  const token = useRouteLoaderData('root');

  const submit = useSubmit();

  function startDeleteHandler() {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          submit(null, { method: 'delete' });
        }
        else {
          swal("Your imaginary file is safe!");
        }
      })
  }

  return (

    <table className="table container"
    // style={{ marginLeft: "200px", }}
    >
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
          {token &&

            <div className="text-center">

                <Link to='edit'><span class="icon-pencil"></span></Link>
              <span onClick={startDeleteHandler} class="icon-trash-2"></span>
            </div>
            }

          </td>
        </tr>
      </tbody>
    </table>
    // </div>
  );
}

export default EventItem;
