import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from 'react-bootstrap';
import shortid from 'shortid';
import database from '../component/firebase';
import { Link } from 'react-router-dom';
 

const SignIn =()=>{
    const [stateData, setUserData] = useState({});

    useEffect ( ()=>{
           database.ref("user_table").on( "value",(snapshot)=>{
             if(snapshot.val()!=null)
             {
              setUserData({...snapshot.val()});
             }
             else 
             {
                setUserData({});
             }
           });
    },[]);

    return (
        <>
        <div className='container mt-5 '>
            <form  className="container border border-danger col-sm-offset-3 col-sm-4 mt-4"
                style={{ backgroundColor: '#0B0B45' }}
            //  onSubmit={handlSubmit}
             >
              <div className='container '>
                  <img
                      className="rounded-circle border border-light mx-auto d-block mt-2" 
                      src="logo1.jpg"
                      style =
                          {{
                             height: "40px",
                             width: "40px",
                             borderRadius: "30px"
                         }}
                    />

                 </div>
                <div className='container mt-1'>
                     <h3  className='text text-primary text-center'> SignIn</h3>
                </div> 
            <div className='container mt-1'>
            <label className='text-warning'>Mobile</label>
                <input
                type='text'
                name='user_mob'
                className='form-control'
                placeholder='Etner your mobile number'
                // onChange={handlChange}
                required
                />
            </div>
            <div className='container text-center mt-4'>
                <Button 
                type='submit'
                className='btn btn-warning mb-3'
                >
                 SignIn
                </Button>
                 <Link to='/SignUp'>
                    
                     <h6 className='text text-warning text-end mb-2' 
                    >
                     SingUp
                    </h6>
                </Link>
                
            </div>
         </form>

        </div>
        </>
    )
}
export default SignIn;
