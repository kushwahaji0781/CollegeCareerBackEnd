import React, { useEffect } from "react";
import{load_CollegeData} from '../redux/action';
import { useDispatch,useSelector } from "react-redux";
import database from '../component/firebase';
import {Link} from 'react-router-dom';
import Dashboard from "../component/Dashboard";
const CollegeTypeReport =() =>
{
    const { CollegeType} = useSelector(state => state.cartreducer); 
    const dispatch=useDispatch();
    useEffect
    (
     ()=>
     {
        dispatch(load_CollegeData());

     },[]);
     
     const onDelete = (id) => {
      if (window.confirm("are you sure you want to delete the record?")) {
         database.ref(`college_table/${id}`).remove((err) => {
            if (err) {
               alert("record is not deleted");
            }
            else {
               alert("record is deleted");
               dispatch(load_CollegeData());
            }
         });
      }
   }
   return (
      <><Dashboard/>
         <div className=" container mt-5">
            <div className=" container col-sm-6 border table-responsive-md">
               <table border="2" className='table style table-striped table-hover table-bordered'
               >
                  <thead>
                  <tr style={{ backgroundColor: '#0B0B45' }} className='text-light'>
                        <th>SNo</th>
                        <th>College id</th>
                        <th>College Type</th>
                        <th>Image</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        Object.keys(CollegeType).map((id, index) => {
                           return (
                              <tr key={id}>
                                 <td>{index + 1}</td>
                                 <td>{CollegeType[id].college_id}</td>
                                 <td>{CollegeType[id].college_type}</td>
                                 <td>
                                     <img src={CollegeType[id].college_img}height="60px" width="60px"/>
                                 </td>
                                 <td>
                                    <Link to={`/Collegeupdate/${id}`} >
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
export default CollegeTypeReport;