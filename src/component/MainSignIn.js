import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from 'react-bootstrap';
import { load_StateData, load_CityData, load_AreaData,load_AdminData,load_RegistrationData,LoginAdmin} from '../redux/action';
import { useDispatch, useSelector } from "react-redux";
import Dashboard from './Dashboard';
import { Link } from 'react-router-dom';
import SignIn from '../login/SignIn';
import AreaReport from '../report/AreaReport';
import CollegeOwnerDashboard from './CollegeOwnerDashboard';
const initialData = {
  user_mobile: "",
  state_name: "",
  city_name: "",
  area_name: "",
  signin_id: "",
  password: ""
}
let login_validation=true;
const MainSignIn = () => {

  const [Loginsuccess, setLoginsuccess] = useState(false);
  const [Loginsuccess1, setLoginsuccess1] = useState(false);
  const [state, setState] = useState(initialData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    
  };

  const { LoadState,LoadCity,LoadArea,AdminData,RegisData} = useSelector(state => state.cartreducer); 
  const dispatch=useDispatch();
  useEffect
  (
   ()=>
   {
      dispatch(load_StateData());
      dispatch(load_CityData());
      dispatch(load_AreaData());
      dispatch(load_AdminData());

   },[]);

 

  let cityDataArray = [];
  
  Object.keys(LoadCity).map((id, index) => {
    if (state.state_name === LoadCity[id].state_name) {
      cityDataArray.push(LoadCity[id].city_name);
    }
  });

  let areaDataArray = [];
  
  Object.keys(LoadArea).map((id, index) => {
    if (state.city_name === LoadArea[id].city_name) {
      areaDataArray.push(LoadArea[id].area_name);
    }
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!state.user_mobile || !state.state_name || !state.city_name || !state.area_name || !state.password) 
    if (!state.user_mobile ||  !state.password) 
    { 
     
      alert("Please enter all required fields");
    }
    else {

      let stnm = state.state_name;
      let ctnm = state.city_name;;
      let arnm = state.area_name;
      
      Object.keys(AdminData).map((id, index) => {
        
        if (state.user_mobile === AdminData[id].admin_mobile & state.password === AdminData[id].password )
         {
          dispatch(LoginAdmin(AdminData[id]));
          setLoginsuccess(true);
          login_validation=false
         }
      });

      dispatch(load_RegistrationData(stnm, ctnm, arnm));
      Object.keys(RegisData).map((id,index)=>{
        if(state.user_mobile===RegisData[id].user_mobile & state.password === RegisData[id].password)
        {
          dispatch(LoginAdmin(RegisData[id]));
          setLoginsuccess1(true);
          login_validation=false
        }
       })
      //  console.log("stt",login_validation)
       if(login_validation)
       {
        alert("please enter valid login id password");
        // setState({...initialData})
       }
   }  
  }
  
if(Loginsuccess)
   {
    return <Dashboard/>
  }
  else if(Loginsuccess1)
  {
    return <CollegeOwnerDashboard/>
  }
 return (
    <>
    {
      // Loginsuccess ? <><Dashboard/></> : <>
     <div className="container mt-4 ">
        <form
          className="container mt-4 border boder-danger col-sm-4 col-sm-offset-12"
          style={{ backgroundColor: "#0B0B45" }}
          onSubmit={handleSubmit}
        >
          <h1 className="text-center text-primary">SignIn</h1>
          <div className="container mt-3">
          <label className='text-warning'>State Name</label>
             <select
                         name="state_name"
                         className=" form-control mb-3"
                         onChange={handleChange}
                         >
                          <option>select state name</option>
                          {
                              Object.keys(LoadState).map((id, index) => {
                                return (
                                    <option>{LoadState[id].state_name}</option>
                                )
                              })
                          }
                       </select>
            <label className='text-warning'>City Name</label>
            <select
              className="form-control mb-3"
              name="city_name"
              onChange={handleChange}
            >
              <option>select city name</option>
              {Object.keys(cityDataArray).map((id, index) => {
                return( 
                       < option>{cityDataArray[id]}</option>
                     )
              })}
            </select>
            <label className='text-warning'>Area Name</label>
            <select
              className="form-control mb-3"
              name="area_name"
              onChange={handleChange}
            >
              <option> select area name</option>
              {Object.keys(areaDataArray).map((id, index) => {
               return( <option>{areaDataArray[id]}</option> )
              })}
            </select>
            <label className='text-warning'>Mobile No.</label>
            <input
              type="text"
              name="user_mobile"
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
            <Button type="submit" className="btn btn-success mb-4">
              SignIn
            </Button>
            <Link to='/MemberLogin'>
                    
                    <h6 className='text text-warning text-end mb-2' 
                   >
                    Register
                   </h6>
               </Link>
          </div>
        </form>
      </div>
    // </>
    }
    </>
  );
}
export default MainSignIn;
