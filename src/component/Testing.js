import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { load_CityData } from '../redux/action';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import database from '../component/firebase';
import Dashboard from './Dashboard';

const Testing = () => {
    const {LoadCity} = useSelector(state=> state.cartreducer);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(load_CityData());
    },[dispatch])
    console.log("city table Data-----",LoadCity);

    const onDelete = (id) => {
      if (window.confirm("are you sure to delete the record")) {
        database.ref(`city_table/${id}`).remove((err) => {
          if (err) {
            alert("record is not deleted");
          }
          else {
            alert("record is deleted");
            dispatch(load_CityData());
          }
        }) 
      }
    }


  return (
    <>
    <Dashboard/>
     <div className='container mt-5'>
      <div className='table-responsive-md'>
    <table className='table table-striped table-bordered table-hover'> 
      <thead className='bg-dark text-white'>     
            <tr>
                 <th>sno</th>
                 <th>StateID</th>
                 <th>StateName</th>
                 <th>CityId</th>
                 <th>CityName</th>
                 <th>Action</th>
            </tr>
      </thead>   
          <tbody>
                  {
                    Object.keys(LoadCity).map((id,index)=>{
                        return(
                            <tr key={id}>
                                <td>{index+1}</td>
                                <td>{LoadCity[id].state_id}</td>
                                <td>{LoadCity[id].state_name}</td>
                                <td>{LoadCity[id].city_id}</td>
                                <td>{LoadCity[id].city_name}</td>
                                <td>                     
                                <Link to={`/cityupdate/${id}`}>
                                <button
                                  className="btn btn-primary"
                                >
                                  edit
                                </button>
                                </Link>
                                <button
                                className="btn btn-danger"
                                onClick={() => onDelete(id)}
                              >
                                delete
                              </button>
                              </td>
                            </tr>
                        );
                    })
                  }
           </tbody>
          </table>
          </div>
          </div>
    </>
  )
}
export default Testing;


// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import { useDispatch, useSelector } from 'react-redux';
// import { Button } from "react-bootstrap";
// import Resizer from 'react-image-file-resizer';
// import shortid from 'shortid';
// import database from '../component/firebase';

// import { load_StateData, load_CityData, load_AreaData, load_CollegeData,Loginmember} from '../redux/action';
// const initData = {
// admin_name:"",
// admin_mobile:"",
// admin_id:"",
// password:""
// }
// let areaDataArray = [];
// let cityDataArray = [];
// const Testing = () => {
//   const [state, setState] = useState(initData);
//   // const [stateImg, setStateImg] = useState(initImgData);
// //   const { Loadcrop } = useSelector(state => state.cartreducer);
// //   const {LoginMember_Data} = useSelector(state => state.cartreducer);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(load_StateData());
//     dispatch(load_CityData());
//     dispatch(load_AreaData());
//     dispatch(load_CollegeData());
//   }, [dispatch])
// //   console.log("LoginMember_Data-----------------------------------------",LoginMember_Data);
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setState({ ...state, [name]: value });
//   }
//   const handleSubmit = (e) => {
//     const adminid= shortid.generate();
//     state.password=shortid.generate();
//     state.admin_id=adminid;
//     e.preventDefault();
//     database.ref("admin_table").push(state,(err)=>{
//         if(err){
//             alert("not inserted");
//         }
//         else{
//             alert("inserted");
//         }
//     })
//     }

//   return (
//     <>
//       <div className='container mt-4'>
//         <form className='container border border-black col-sm-4 mt-4 mb-3 shadow'
//           onSubmit={handleSubmit}>
//         <h5 className='text-danger'>Admin Registration</h5>
//           <div>
        
//             <h5 className='text-danger'>admin_name</h5>
//             <input
//               type="tel"
//               name="admin_name"
//               placeholder='enter ...'
//               className="form-control mb-2"
//               required
//               onChange={handleChange} />
//             <h5 className='text-danger'>admin_mobile</h5>
//             <input
//               type="text"
//               name="admin_mobile"
//               minlength="10" 
//               maxlength="10"
//               pattern="[0-9]{10}"
//               required
//               className="form-control mb-2"
//               onChange={handleChange} />
//           </div>
//           <div className="container text-center">
//             <Button
//               type="submit"
//               className="btn btn-success text mb-3 form-control"
//             >
//               save
//             </Button>
//           </div>
//         </form>
//       </div>
//     </>
//   )
// }
// export default Testing;
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// function Testing() {
//   return (
//     <div className="container mt-4 col-sm-4 col-sm-offset-4 border border-dark"></div>
//   //   <Row className='container'>
//   //   <Col xs={4}>
//   //     <Form.Control placeholder="City" />
//   //   </Col>
//   //   <Col>
//   //     <Form.Control placeholder="State" />
//   //   </Col>
//   //   <Col>
//   //     <Form.Control placeholder="Zip" />
//   //   </Col>
//   // </Row>

//   );
// }

// export default Testing;