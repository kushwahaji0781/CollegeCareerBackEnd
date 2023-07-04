import React, { useState ,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from 'react-bootstrap';
import shortid from 'shortid';
import database from '../component/firebase';
import { useParams } from 'react-router-dom';
import {  useSelector } from "react-redux";
import Dashboard from '../component/Dashboard';

const initialData = {
    state_name: "",
    state_id: ""
}

const StateRegis = () => {
    const[state,setState]=useState(initialData);

    const handleChange=(e)=>{
        const{name,value}= e.target;
        setState({...state,[name]:value});
    }
const matchid=useParams(); //it is use to drag User id from url bar

const { LoadState } = useSelector(state => state.cartreducer);
// const dispatch = useDispatch();
useEffect (() => 
    {
        Object.keys(LoadState).map((id,index)=>{
            if(matchid.id === id)
            {
                setState({...LoadState[id]});
            }
        })
    }, [matchid]);
    const{state_name,state_id}=state;

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(matchid.id)
        {
            // update block
            database.ref(`state_table/${matchid.id}`).set(state,(err)=>{
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
        const stateid= shortid.generate();
        state.state_id=stateid;
        e.preventDefault();
        database.ref("state_table").push(state,(err)=>{
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
        <div className='container  mt-4'>
            <form className='container col-sm-4 col-sm-offset-4 border border-dark'
                style={{ backgroundColor: "#0B0B45" }}
                onSubmit={handleSubmit}>
                <div className='container'>
                    <h2 className='text text-primary text-center mt-2'>State Registration</h2>
                </div>
                <div className='container mt-3'>
                <label className='text-warning'>State Name</label>
                    <input
                        type="text"
                        name="state_name"
                        className="form-control"
                        placeholder="enter state name"
                        value={state_name||""}
                        onChange={handleChange}
                    />
                </div>
                <div className='container text-center mb-3 mt-2'>
                    <Button
                        type="submit"
                        className="btn-warning mt-3"
                       >
                       {matchid.id?"update":"register"}
                    </Button>
                </div>
            </form>
        </div>
        </>
    );
}

export default StateRegis;