import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from 'react-bootstrap';
import shortid from 'shortid';
import database from '../component/firebase';
import Resizer from 'react-image-file-resizer';
import { load_StateData, load_CityData, load_AreaData, load_CollegeData,Loginmember,load_RegistrationData,load_RegistrationImageData} from '../redux/action';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import Dashboard from './Dashboard';
import MemberDashboard from './MemberDashboard';
const initialData = {
  user_mobile: "",
  college_name: "",
  college_type: "",
  state_name: "",
  city_name: "",
  area_name: "",
  college_address: "",
  college_add_pincode: "",
  currentDate: "",
  currentTime: "",
  registrationBy: "",
  registration_id: "",
  password:""
}
const initialData2 = {
  img_data: "",
  registration_id: ""
}
let loadImg = 0;
let cityDataArray = [];
let areaDataArray = [];
let State;
let City;
let Area;
let Mob;
let login_validation=false;
const Registration = () => {
  const [state, setState] = useState(initialData);
  const [stateImg, setStateImg] = useState(initialData2);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    
  };
  const Data_id=useParams(); //it is use to drag User Data_id  and img_id from url bar
  // console.log("id   ",Data_id.img_id )
  // 

  const { LoadState,LoadCity,LoadArea ,CollegeType,MemberLoginData,RegisData,RegisImage,LoginUser} = useSelector(state => state.cartreducer); 
  const dispatch=useDispatch();
  useEffect
  (
   ()=>
   {
      dispatch(load_StateData());
      dispatch(load_CityData());
      dispatch(load_AreaData());
      dispatch(load_CollegeData());
      Object.keys(RegisData).map((id,index)=>{
        Object.keys(RegisImage).map((id1,index)=>{
          Object.keys(RegisImage[id1]).map((id2,index)=>{
             if(Data_id.id ===id ) 
             {   
              setState({...RegisData[id]});
              console.log(" data is ",Data_id.id)  
              State=RegisData[id].state_name;
              City=RegisData[id].city_name;
              Area=RegisData[id].area_name;
              Mob=RegisData[id].user_mobile;
              // console.log("id is is is is is ",State,City,Area,Mob)         
             }
             if(Data_id.img_id === id2)
            {  
               setStateImg({...(RegisImage[id1])[id2]});
              //  console.log(" image this  is ",stateImg)
              //  console.log(" 810 ",(RegisImage[id1])[id2])
            }
       })      
      })      
     })
   },[Data_id]);
  //  console.log("imgae here",MemberLoginData)
  // console.log("name is ",LoginUser.member_name);

   const{state_name,city_name,area_name,img_data,user_mobile,college_name,college_type,college_address,college_add_pincode}=state;

   const imageload = (e) => {
    var fileinput = false;
    if (e.target.files[0]) {
      fileinput = true;

    }
    if (fileinput) {
      try {
        Resizer.imageFileResizer(
          e.target.files[0],
          300,
          300,
          "jpeg",
          200,
          0,
          (uri) => {
            stateImg.img_data = uri;
            loadImg =  1;
          },
          "base64",
          300,
          300
        );
      }
      catch (err) {
        console.log("error in imageload section");
      }
    }
  }

  cityDataArray = [];
  Object.keys(LoadCity).map((id, index) => {
    if (state.state_name === LoadCity[id].state_name) {
      cityDataArray.push(LoadCity[id].city_name);
    }
  });

 
  areaDataArray = [];
  Object.keys(LoadArea).map((id, index) => {
    if (state.city_name === LoadArea[id].city_name) {
      areaDataArray.push(LoadArea[id].area_name);
    }
  });
    // console.log("database is ",Data_id.img_id)
    Object.keys(RegisData).map((id,index)=>{
      console.log("number enter",state.user_mobile)
    })
  const handleSubmit = (e) => {
    e.preventDefault();
   
    dispatch(load_RegistrationData());
    if (!state.user_mobile || !state.college_name || !state.college_type || !state.state_name || !state.city_name || !state.area_name || !state.college_address || !state.college_add_pincode ) 
    { 
      console.log("state data-------",state);
      alert("Please enter all required fields");
    }
    else {

      let stnm=state.state_name;
      let ctnm=state.city_name;
      let arnm=state.area_name;
      let mob=state.user_mobile;
      // current date function
      const curryear = new Date().getFullYear();
      const currmonth=new Date().getMonth() + 1;
      const currday=new Date().getDate();
      let date = `${currday}-${currmonth}-${curryear}`

      // current time function
      const current=new Date();
      const Time=current.toLocaleTimeString();
      Object.keys(RegisData).map((id,index)=>{
        console.log("number enter",state.user_mobile)
        console.log("number",RegisData[id].user_mobile)
        if(state.user_mobile===RegisData[id].user_mobile)
        {
          login_validation=true;
        }
       })
  
       if(login_validation===true)
       {
         alert("This number is already registered")
         setState({...initialData})
         setStateImg({...initialData2})
       }
       if(login_validation===false)
        {
      if(Data_id.id )
      {   
        state.Dataupdate_date=date;
        state.Dataupdate_date_time=Time;
        database.ref(`user/${stnm}/${ctnm}/${arnm}/user_reg/${Data_id.id}`).set(state,(err)=>{
          if(err)
          {
              alert("data not updated");
          }
          
          else
          {  
              database.ref(`user/${stnm}/${ctnm}/${arnm}/user_regis_img/${mob}/${Data_id.img_id}`).set(stateImg);         
              dispatch(load_RegistrationData(stnm,ctnm,arnm));
              // dispatch(load_RegistrationImageData(stnm,ctnm,arnm)); 
              alert("data successfully updated");
              setState({...initialData})
              setStateImg({...initialData2})
          }
          if(State !==stnm || City!==ctnm || Area !==arnm || Mob !== mob )
          {
            database.ref(`user/${State}/${City}/${Area}/user_reg/${Data_id.id}`).remove();
            database.ref(`user/${State}/${City}/${Area}/user_regis_img/${Mob}/${Data_id.img_id}`).remove();
  
          }    
      })
      }
      
      else
      {
      let registration_By
       if(LoginUser.member_name)
       { 
         registration_By=LoginUser.member_name;   
       }
       else
       {
        registration_By="Admin";
       }
      state.currentDate=date;
      state.currentTime=Time;
      state.registrationBy=registration_By;
      console.log("Registration by",  state.registrationBy)
      const regisid = shortid.generate();
      state.registration_id = regisid;
      stateImg.registration_id = regisid;
      state.password = shortid.generate();;
        database.ref(`user/${stnm}/${ctnm}/${arnm}/user_reg`).push(state, (err) => {
          if (err) {
            alert("user not registered");
          } else {
            database.ref(`user/${stnm}/${ctnm}/${arnm}/user_regis_img/${mob}`).push(stateImg);
            alert("user successfully registered and your password is "+" "+state.password);
            setState({...initialData})
            setStateImg({...initialData2})
          }
        })
      }
    }
  }
}
console.log("admin",LoginUser.admin_mobile)
  return (
    <> 
       {LoginUser.admin_mobile==="7354661427"?<Dashboard/>:<MemberDashboard/>}
      <div className="container mt-2 ">
        <form
          className="container mt-2 border boder-danger col-sm-4 col-sm-offset-10"
          style={{ backgroundColor: "#0B0B45" }}
          onSubmit={handleSubmit}
        >
          <h1 className="text-center text-primary">Registration</h1>
          <div className="container mt-2">
          <label className='text-warning'>Mobile</label>
            <input
              type="text"
              name="user_mobile"
              className="form-control mb-2"
              placeholder="enter your mobile number"
              minlength="10" 
              maxlength="10"
              pattern="[0-9]{10}"
              required
              value={user_mobile||""}
              onChange={handleChange}
            />
            <label className='text-warning'>College Name</label>
            <input
              type="text"
              name="college_name"
              className="form-control mb-2"
              placeholder="enter your name"
              value={college_name||""}
              onChange={handleChange}
            />
             <label className='text-warning'>Photo</label>
            <input
              type="file"
              name="img_data"
              className="form-control mb-2"
              placeholder="upload your image"
              onChange={imageload}
            />
            <label className='text-warning'>College Type</label>
                      <select
                          name="college_type"
                          className=" form-control mb-2"
                          value={college_type||""}
                         onChange={handleChange}
                         >
                          <option>select college type</option>
                          {
                              Object.keys(CollegeType).map((id, index) => {
                                return (
                                    <option>{CollegeType[id].college_type}</option>
                                )
                              })
                          }
                       </select>

                     <label className='text-warning'>State Name</label>
                     <select
                          name="state_name"
                          className=" form-control mb-2"
                          value={state_name||""}
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
              className="form-control mb-2"
              name="city_name"
              value={city_name||""}
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
              className="form-control mb-2"
              name="area_name"
              value={area_name||""}
              onChange={handleChange}
            >
              <option> select area name</option>
              {Object.keys(areaDataArray).map((id, index) => {
               return( <option>{areaDataArray[id]}</option> )
              })}
            </select>

            <label className='text-warning'>College address</label>
            <input
              type="text"
              name="college_address"
              className="form-control mb-2"
              placeholder="enter college address"
              value={college_address||""}
              onChange={handleChange}
            />
             <label className='text-warning'>Pincode</label>
            <input
              type="text"
              name="college_add_pincode"
              className="form-control mb-2"
              placeholder="enter address pincode"
              value={college_add_pincode||""}
              onChange={handleChange}
            />
          </div>

          <div className="container text-center">
            <Button type="submit" className="btn btn-success mb-2">
            {Data_id.id?"update":"register"}
            </Button>
          </div>
          
        </form>
      </div>
    </>
  );
}
export default Registration;
