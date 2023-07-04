import React, {useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from 'react-bootstrap';
import shortid from 'shortid';
import database from '../component/firebase';
import { useSelector, useDispatch } from "react-redux";
import { load_StateData,load_CityData } from '../redux/action';
import { useParams } from 'react-router-dom';
import Dashboard from '../component/Dashboard';



const initialData={
    state_name:"",
    city_name:"",
    city_id:"",
    state_id:""
}

const CityRegis = () => {

    const[state,setState]=useState(initialData);

    const handleChange = (e) =>{
        const{name,value} = e.target;
        setState({...state,[name]:value});

    }
    const matchid=useParams(); 
    const { LoadState,LoadCity } = useSelector(state => state.cartreducer); 
    const dispatch=useDispatch();
  
    useEffect
    (
     ()=>
     {  
        dispatch(load_StateData());
        Object.keys(LoadCity).map((id,index)=>{
            if(matchid.id===id)
            {
                setState({...LoadCity[id]});
            }
        })

     },[matchid]);   
     const{state_id,state_name,city_id,city_name}=state;

     const handleSubmit=(e)=>{
        e.preventDefault();
        if(matchid.id)
        {
            // update block
            database.ref(`city_table/${matchid.id}`).set(state,(err)=>{
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
        const cityid= shortid.generate();
        state.city_id=cityid;
        e.preventDefault();
        database.ref("city_table").push(state,(err)=>{
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

    if(state.state_name)
    {
        Object.keys(LoadState).map((id,index)=>{
            if(state.state_name=== LoadState[id].state_name){
                state.state_id=LoadState[id].state_id;
            }
        })
    }

    return (
              <>
              <Dashboard/>
                  <div  className='container mt-4'>

                    <form className='container col-sm-4 col-sm-offset-4 mt-4 border border-dark '
                    style={{backgroundColor :'#0B0B45'}}
                     onSubmit={handleSubmit}
                     >
                        <div className='container'>
                            <h2 className='text text-primary text-center mt-2'>  City Registration</h2>    
                        </div>
                        <div className='container mt-3'>
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
                        <input
                              type="text"
                              name="city_name"
                              className='form-control'
                              placeholder='enter city name'
                              value={city_name||""}
                              onChange={handleChange}
                        />
                        </div>

                        <div className='container text-center mb-3 mt-2'>

                            <Button

                              type='submit'
                               className="btn btn-warning mt-3"

                             >
                               {matchid.id?"update":"register"}
       
                            </Button>
                        </div>


                       
                    
                    </form>

                  </div>

        
             </>

    );


}
export default CityRegis;