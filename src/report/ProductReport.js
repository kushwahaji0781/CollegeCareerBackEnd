import React, { useEffect } from "react";
import{load_ProductData} from '../redux/action';
import { useDispatch,useSelector } from "react-redux";
import database from '../component/firebase';
import {Link} from 'react-router-dom';
import CollegeOwnerDashboard from "../component/CollegeOwnerDashboard";
const ProductReport =() =>
{
    const { ProductData,LoginUser} = useSelector(state => state.cartreducer); 
    const dispatch=useDispatch();
    useEffect
    (
     ()=>
     {
        dispatch(load_ProductData(LoginUser.user_mobile));

     },[]);
     
   
     const onDelete = (id) => {
      if (window.confirm("are you sure you want to delete the record?")) {
         database.ref(`product_table/${LoginUser.user_mobile}/${id}`).remove((err) => {
            if (err) {
               alert("record is not deleted");
            }
            else {
               alert("record is deleted");
               dispatch(load_ProductData(LoginUser.user_mobile));
            }
         });
      }
   }
   return (
      <>
      <CollegeOwnerDashboard/>
         <div className=" container mt-5">
            <div className=" container col-sm-8 border table-responsive-md">
               <table border="2" className='table style table-striped table-hover table-bordered '
               >
                  <thead>
                  <tr style={{ backgroundColor: '#0B0B45' }} className='text-light'>
                        <th>SNo</th>
                        <th>Course id</th>
                        <th>Course Name</th>
                        <th>Course Branch</th>
                        <th>Course Price</th>
                        <th>Course Detail</th>
                        <th>Image</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        Object.keys(ProductData).map((id, index) => {
                           return (
                              <tr key={id}>
                                 <td>{index + 1}</td>
                                 <td>{ProductData[id].course_id}</td>
                                 <td>{ProductData[id].course_name}</td>
                                 <td>{ProductData[id].course_branch}</td>
                                 <td>{ProductData[id].course_fee}</td>
                                 <td>{ProductData[id].course_detail}</td>
                                 <td>
                                     <img src={ProductData[id].img_data}height="60px" width="60px"/>
                                 </td>
                                 <td>
                                    <Link to={`/Productupdate/${id}`} >
                                    <button
                                       className="btn btn-block "
                                       style={{backgroundColor:'#00FFFF'}}
                                    >
                                       Edit

                                    </button >
                                    </Link>

                                    <button
                                       className="btn btn-block "
                                       style={{ backgroundColor: '#ff0021' }}
                                       onClick={() => onDelete(id)}
                                    >
                                       Delete
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
export default ProductReport;