import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Button } from "react-bootstrap";
import shortid from "shortid";
import database from '../component/firebase';
import{load_StateData,load_CityData,Load_Area_Table} from '../redux/action';
import { useDispatch,useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Dashboard from "../component/Dashboard";

const initialData = {
  state_name: "",
  state_id: "",
  city_name: "",
  city_id: "",
  area_name: "",
  area_id: "",
  pincode: ""
}
// let cityDataArray = [];
const AreaRegis = () => {
  const [state, setState] = useState(initialData);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const matchid =useParams();
  const { LoadState,LoadCity,LoadArea } = useSelector(state => state.cartreducer); 
  const dispatch=useDispatch();
  useEffect
  (
   ()=>
   {
      dispatch(load_StateData());
      dispatch(load_CityData());
      Object.keys(LoadArea).map((id,index)=>{
        if(matchid.id===id)
        {
            setState({...LoadArea[id]});
        }
    })

   },[]);
  
   const{state_id,state_name,city_id,city_name,area_id,area_name,pincode}=state;
  if(state.state_name)
  {
    Object.keys(LoadState).map((id,index) =>{
      if(state.state_name===LoadState[id].state_name)
      {
        state.state_id=LoadState[id].state_id;
      }

     })
  }

  if(state.city_name)
  {
    Object.keys(LoadCity).map((id,index) =>{
      if(state.city_name===LoadCity[id].city_name)
      {
        state.city_id=LoadCity[id].city_id;
      }

     })
  }

  let cityDataArray = [];
  
  Object.keys(LoadCity).map((id, index) => {
    if (state.state_name === LoadCity[id].state_name) {
      cityDataArray.push(LoadCity[id].city_name);
    }
  });
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(matchid.id)
    {
        // update block
        database.ref(`area_table/${matchid.id}`).set(state,(err)=>{
            if(err){
                alert("data not updated");
            }
            else{
                alert("data successfully updated");
                setState({...initialData})
            }
        })
    }
    else
    {
    //push block
    const areaid= shortid.generate();
    state.area_id=areaid;
    e.preventDefault();
    database.ref("area_table").push(state,(err)=>{
        if(err){
            alert("not inserted");
        }
        else{
            alert("inserted");
            setState({...initialData})
        }
    })
    }
}


  return (
    <>
    <Dashboard/>
      <div className="container mt-4">
        <form
          className="container col-sm-4 col-sm-offset-4 border border-dark"
          style={{ backgroundColor: "#0B0B45" }}
          onSubmit={ handleSubmit }
        >
          <div className="container">
            <h2 className="text text-primary text-center mt-4">
              Area Registration
            </h2>
          </div>
          <div className="container mt-3">
          <label className='text-warning'>State Name</label>
          <select
                          name="state_name"
                          className=" form-control mb-3"
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
              name="city_name"
              className="form-control mb-3"
              onChange={handleChange}
              value={city_name||""}
            >
              <option>select city name</option>
              {
                Object.keys(cityDataArray).map((id, index) => {
                return(
                   <option>{cityDataArray[id]}</option>
                )
                })
              }
            </select>
            <label className='text-warning'>Area Name</label>
            <input
              type="text"
              name="area_name"
              className="form-control mb-3"
              placeholder="enter area name"
              value={area_name||""}
              onChange={handleChange}
            />
            <label className='text-warning'>Pincode</label>
            <input
              type="text"
              name="pincode"
              className="form-control mb-3"
              placeholder="Enter the pincode"
              value={pincode||""}
              onChange={handleChange}
            />
          </div>
          <div className="container text-center mb-3 mt-2">
            <Button type="submit" className="btn btn-warning mt-3">
            {matchid.id?"update":"register"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
export default AreaRegis;
