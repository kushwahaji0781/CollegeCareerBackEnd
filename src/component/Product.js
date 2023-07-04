import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from 'react-bootstrap';
import shortid from 'shortid';
import database from '../component/firebase';
import Resizer from 'react-image-file-resizer';
import { useSelector, useDispatch } from "react-redux";
import {load_ProductData} from '../redux/action';
import { useParams } from 'react-router-dom';
import CollegeOwnerDashboard from './CollegeOwnerDashboard';

const initialData = {
 course_name:"",
 course_branch:"",
 course_fee:"",
 course_detail:"",
 img_data:"",
 course_id:""
}
let loadImg = 0;
const Product = () => {

  const [state, setState] = useState(initialData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    
  };
  const matchid=useParams(); 
  const { ProductData ,LoginUser} = useSelector(state => state.cartreducer); 
  const dispatch=useDispatch();

  useEffect
  (
   ()=>
   {  
      Object.keys(ProductData).map((id,index)=>{
     
          if(matchid.id===id)
          {
              setState({...ProductData[id]});
          }
      })

   },[matchid]);   
   const{course_id,course_name,course_detail,course_fee,img_data,course_branch}=state;
 
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
            state.img_data = uri;

            loadImg = 1;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.course_name|| !state.course_fee || !state.img_data || !state.course_detail || !state.course_branch) 
    { 
      console.log("state data-------",state);
      alert("Please enter all required fields");
    }
    else 
    {
      if(matchid.id)
      {
        database.ref(`product_table/${LoginUser.user_mobile}/${matchid.id}`).set(state,(err)=>{
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
        const courseid = shortid.generate();
        state.course_id = courseid;
        database.ref(`product_table/${LoginUser.user_mobile}`).push(state,(err)=>{
            if(err){
                alert("not inserted");
            }
            else{
                alert("inserted");
                // setState({...initialData})
            }
        })
      }
    }
  }

  return (
    <>
    <CollegeOwnerDashboard/>
      <div className="container mt-4 ">
        <form
          className="container mt-4 border boder-danger col-sm-4 col-sm-offset-12"
          style={{ backgroundColor: "#0B0B45" }}
          onSubmit={handleSubmit}
        >
          <h1 className="text-center text-primary">Add Product Name</h1>
          <div className="container mt-3">
          <label className='text-warning'>Course Name</label>
            <input
              type="text"
              name="course_name"
              className="form-control mb-3"
              placeholder="enter course name"
              value={course_name||""}
              onChange={handleChange}
            />
          <label className='text-warning'>Course Branch</label>
            <input
              type="text"
              name="course_branch"
              className="form-control mb-3"
              placeholder="enter course branch"
              value={course_branch||""}
              onChange={handleChange}
            />
            <label className='text-warning bold'>Fee</label>
            <input
              type="text"
              name="course_fee"
              className="form-control mb-3"
              placeholder="enter course fee"
              value={course_fee||""}
              onChange={handleChange}
            />
            <label className='text-warning bold'>Photo</label>
            <input
              type="file"
              name="img_data"
              className="form-control mb-3"
              placeholder="upload your image"
             
              onChange={imageload}
            />
            <label className='text-warning bold'>Course Detail</label>
            <input
              type="text"
              name="course_detail"
              className="form-control mb-3"
              placeholder="enter about course details"
              value={course_detail||""}
              onChange={handleChange}
            />          
          </div>
          <div className="container text-center">
            <Button type="submit" className="btn btn-success mb-4">
            {matchid.id?"update":"Save"}
            </Button>
          </div>
          
        </form>
      </div>
    </>
  );
}
export default Product;
