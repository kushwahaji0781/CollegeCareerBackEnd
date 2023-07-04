import React, { useEffect } from "react";
import { load_CityData } from '../redux/action';
import { useDispatch, useSelector } from "react-redux";
// import '../css/report/cityreport.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import database from '../component/firebase';
import {Link} from 'react-router-dom';
import Dashboard from "../component/Dashboard";

const CityReport = () => {
   const { LoadCity } = useSelector(state => state.cartreducer);
   const dispatch = useDispatch();
   useEffect
      (
         () => {
            dispatch(load_CityData());

         }, []);
         
 const onDelete =(id) =>{
   if(window.confirm("are you sure you want to delete the record?"))
    {
      database.ref(`city_table/${id}`).remove((err)=>{
       if(err)
      {
        alert("record is not deleted");
      }
       else
       {
         alert("record is deleted");
         dispatch(load_CityData());
       }
     });
    }
}
   return (
      <><Dashboard/>
         <div className=" container mt-5">
            <div  className=" container table-responsive-md col-sm border ">
               <table border="2" className=' table style table-striped table-hover table-bordered  '
               >
                  <thead>
                  <tr style={{ backgroundColor: '#0B0B45' }} className='text-light'>
                        <th>SNo</th>
                        <th>State id</th>
                        <th>State Name</th>
                        <th>City id</th>
                        <th>City Name</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        Object.keys(LoadCity).map((id, index) => {
                           return (
                              <tr key={id}>
                                 <td>{index + 1+('.')}</td>
                                 <td>{LoadCity[id].state_id}</td>
                                 <td>{LoadCity[id].state_name}</td>
                                 <td>{LoadCity[id].city_id}</td>
                                 <td>{LoadCity[id].city_name}</td>
                                 <td>
                                    <Link to={`/Cityupdate/${id}`} >
                                 <button 
                                     className="btn btn-block "
                                     style={{backgroundColor:'#00FFFF'}}
                                 >
                                    Edit

                                 </button >
                                  </Link>

                                 <button 
                                    className="btn btn-block "
                                    style={{backgroundColor:'#ff0021'}}                                  
                                    onClick={()=>onDelete(id)}
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
export default CityReport;