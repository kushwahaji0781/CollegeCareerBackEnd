import React, { useEffect } from "react";
import { load_MemberRegisData,load_MemberRegisImg } from '../redux/action';
import { useDispatch, useSelector } from "react-redux";
import database from '../component/firebase';
import {Link} from 'react-router-dom';
import Dashboard from "./Dashboard";

let img_id ;
const MemberRegistrationReport = () => {
   const { MemberRegisData,MemberRegisImg } = useSelector(state => state.cartreducer);
   const dispatch = useDispatch();
   useEffect
      (() => {
            dispatch(load_MemberRegisData());
            dispatch(load_MemberRegisImg());
       }, [dispatch]);

   const onDelete = (id) => {
      if (window.confirm("are you sure you want to delete the record?")) {
         database.ref(`member_regis_table/member_data/${id}`).remove((err) => {
            if (err)
              {
               alert("record is not deleted");
              }
            else {
               Object.keys(MemberRegisImg).map((id1, index) => {
                  let mob = MemberRegisData[id].member_mob;
                  console.log("mob",mob)
                  if (MemberRegisData[id].member_mob === id1) {
                    Object.keys(MemberRegisImg[id1]).map((id2, index) => {
               database.ref(`member_regis_table/member_img/${mob}/${id2}`).remove();
               alert("record is deleted");
               dispatch(load_MemberRegisData());
               dispatch(load_MemberRegisImg());
           });
          }
        });
      }
    })
   }
}
   return (
      <><Dashboard/>
         <div className=" container mt-5">
            <div className=" container  border table-responsive-md">
               <table border="2" className=' table style table-striped table-hover table-bordered'
               >
                  <thead>
                  <tr style={{ backgroundColor: '#0B0B45' }} className='text-light'>
                        <th>SNo</th>
                        <th>Member id</th>
                        <th>Member Name</th>
                        <th>Father Name</th>
                        <th>Mobile No</th>
                        <th>Address</th>
                        <th>password</th>
                        <th>Image</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        Object.keys(MemberRegisData).map((id, index) => {
                           return (
                              <tr key={id}>
                                 <td>{index + 1}</td>
                                 <td>{MemberRegisData[id].member_id}</td>
                                 <td>{MemberRegisData[id].member_name}</td>
                                 <td>{MemberRegisData[id].father_name}</td>
                                 <td>{MemberRegisData[id].member_mob}</td>
                                 <td>{MemberRegisData[id].member_address}</td>
                                 <td>{MemberRegisData[id].password}</td>
                                 <td>{ 
                                  Object.keys(MemberRegisImg).map((id1, index) => {
                                    if (MemberRegisData[id].member_mob === id1) {        
                                       Object.keys(MemberRegisImg[id1]).map((id2, index) => {
                                          img_id = id2;
                                          global.loadimg = MemberRegisImg[id1][id2].img_data;
                                       });
           
                                       return (
                                         <>
                                           <img src={global.loadimg} height="40"width="40"
                                           />
                                         </>
                                       );
                                    }
                                 })
                              }                             
                                 </td>
                                 <td>
                                    <Link to={`/MemberRegisupdate/${id}/${img_id}`}>
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
                                       onClick={() => onDelete(id)(img_id)}
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
export default MemberRegistrationReport;