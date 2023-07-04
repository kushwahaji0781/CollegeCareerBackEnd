import React, { useEffect } from "react";
import { load_AreaData } from '../redux/action';
import { useDispatch, useSelector } from "react-redux";
import database from '../component/firebase';
import {Link} from 'react-router-dom';
import Dashboard from "../component/Dashboard";

const AreaReport = () => {
   const { LoadArea} = useSelector(state => state.cartreducer);
   const dispatch = useDispatch();
   useEffect
      (
         () => {
            dispatch(load_AreaData());

         }, []);
   const onDelete = (id) => {
      if (window.confirm("are you sure you want to delete the record?")) {
         database.ref(`area_table/${id}`).remove((err) => {
            if (err) {
               alert("record is not deleted");
            }
            else {
               alert("record is deleted");
               dispatch(load_AreaData());
            }
         });
      }
   }
   return (
      <><Dashboard/>
         <div className=" container mt-5">
            <div className=" container col-sm border table-responsive-md">
               <table border="2" className=' table style table-striped table-hover table-bordered '
               >
                  <thead>
                  <tr style={{ backgroundColor: '#0B0B45' }} className='text-light'>
                        <th>SNo</th>
                        <th>State id</th>
                        <th>State Name</th>
                        <th>City id</th>
                        <th>City Name</th>
                        <th>Area id</th>
                        <th>Area Name</th>
                        <th>Pincode</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        Object.keys(LoadArea).map((id, index) => {
                           return (
                              <tr key={id}>
                                 <td>{index + 1}</td>
                                 <td>{LoadArea[id].state_id}</td>
                                 <td>{LoadArea[id].state_name}</td>
                                 <td>{LoadArea[id].city_id}</td>
                                 <td>{LoadArea[id].city_name}</td>
                                 <td>{LoadArea[id].area_id}</td>
                                 <td>{LoadArea[id].area_name}</td>
                                 <td>{LoadArea[id].pincode}</td>
                                 <td>
                                    <Link to={`/Areaupdate/${id}`} >
                                    <button
                                       className="btn btn-block "
                                       style={{ backgroundColor: '#00FFFF' }}
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
export default AreaReport;