import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from 'react-bootstrap';
import { load_MemberRegisData,Loginmember ,LoginAdmin } from '../redux/action';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import MyMapping from './MyMapping';
import Registration from './Registration';
import MemberDashboard from './MemberDashboard';

let login_validation=true;
const initialData = {
  member_mob: "",
  password: "",
}

const MemberLogin = () => {

  const [Loginsuccess, setLoginsuccess] = useState(false);
  const [state, setState] = useState(initialData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });

  };

  const { MemberRegisData } = useSelector(state => state.cartreducer);
  const dispatch = useDispatch();
  useEffect
    (
      () => {
        dispatch(load_MemberRegisData());
      }, [dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.member_mob || !state.password) 
    {
      alert("Please enter all required fields");
    }
   
    else{
      Object.keys(MemberRegisData).map((id, index) => {
        console.log("state",state.member_mob,state.password)
        console.log("ddata", MemberRegisData[id].member_mob,MemberRegisData[id].password  )

        if (state.member_mob === MemberRegisData[id].member_mob & state.password === MemberRegisData[id].password )
         {
          dispatch(LoginAdmin(MemberRegisData[id]));
          setLoginsuccess(true);
          login_validation=false;;
         }
      });
    }
    console.log("stt",login_validation) 
    if(login_validation)
    {
     alert("please enter valid login id password");
     setState({...initialData})
    }
    // }
  }

  return (
      <>
      {
        Loginsuccess ? <><MemberDashboard/></> : <>
        <div className="container mt-4 ">
          <form
            className="container mt-4 border boder-danger col-sm-4 col-sm-offset-12"
            style={{ backgroundColor: "#0B0B45" }}
            onSubmit={handleSubmit}
          >
            <h1 className="text-center text-primary">Member Login</h1>
            <div className="container mt-3">
              <label className='text-warning'>Mobile No.</label>
              <input
                type="text"
                name="member_mob"
                className="form-control mb-3"
                placeholder="enter your mobile number"
                minlength="10" 
                maxlength="10"
                pattern="[0-9]{10}"
                onChange={handleChange}
              />
              <label className='text-warning'>Password</label>
              <input
                type="password"
                name="password"
                className="form-control mb-3"
                placeholder="enter password"
                onChange={handleChange}
              />
            </div>
  
            <div className="container text-center">
              <Button type="submit" className="btn btn-success mb-4"   >
                Login
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
      }
      </>
  );
}
export default MemberLogin;