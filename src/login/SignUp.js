import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import shortid from 'shortid';
import database from '../component/firebase';

const initialData ={
   
    user_name:"",
    user_mob:"",
    user_id:"",
    state_name:"",
    city_name:"",
    area_name:"",
    address:"",
    pincode:"",
    imgdata:"",
    user_email:"",
    password:""
}

const SignUp = () =>{
    const [state,setState]=useState(initialData);

    const handleChange = (e) =>{
    const{name,value} = e.target;
    setState({...state,[name]:value});
    }

    const handleSubmit = (e) =>{
        const userid=shortid.generate();
        state.user_id=userid;
        e.preventDefault();
        database.ref("user_table").push(state,(err) =>{
           if (err){
            alert("you are not signed up");
           }
           else{
            alert("you are successfully signed up");
           
           }
        }

        )
    }
 

    return(
            <>
            <div className=' container mt-5 '>
        
                <form  className="container border border-danger col-sm-offset-4 col-sm-4 mt-4"
                style={{ backgroundColor: '#0B0B45' }}
                onSubmit={handleSubmit}
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


                <div className='container'>
                    <h3 className='text text-primary text-center '>SignUp</h3>
                </div>

                <div className='container mt-1'>
                <label className='text-warning'>Name</label>
                    <input 
                     type='text'
                     name='user_name'
                     className='form-control mb-3'
                     placeholder='Enter your name'
                     onChange={handleChange}
                     required
                     />
                     <label className='text-warning'>Mobile</label>
                     <input 
                     type='text'
                     name='user_mob'
                     className='form-control mb-3'
                     placeholder='Enter your number'
                     onChange={handleChange}
                     />
                </div>
                <div className='container mb-2 text-center'>
                    <Button 
                    type='submit'
                    className='btn btn-warning mt-2'
                    >
                     SignUp
                    </Button>

                </div>
                <Link to='/SignIn'>
                     <h6 className='text text-warning text-end mb-2' 
                    >
                     SignIn
                    </h6>
                </Link>
                </form>
            </div>
        
         </>
    )

}
export default SignUp;