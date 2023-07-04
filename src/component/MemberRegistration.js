import React, { useState,useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import shortid from 'shortid';
import database from './firebase';
import Resizer from 'react-image-file-resizer';
import {  load_MemberRegisData,load_MemberRegisImg} from '../redux/action';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import Dashboard from './Dashboard';
const initialData ={
   
    member_name:"",
    father_name:"",
    member_mob:"",
    member_address:"",
    password:"",
    member_id:""
}
const initialData2 = {
    img_data: "",
    member_id:""
  }
  let loadImg = 0;
  let Mob;
const MemberRegistration = () =>{
    const [state,setState]=useState(initialData);
    const [stateImg, setStateImg] = useState(initialData2);
    const handleChange = (e) =>{
    const{name,value} = e.target;
    setState({...state,[name]:value});
    }
    const Data_id=useParams(); //it is use to drag User Data_id  and img_id from url bar
    const { MemberRegisData,MemberRegisImg } = useSelector(state => state.cartreducer);
    const dispatch = useDispatch();
    useEffect
       (() => {
             dispatch(load_MemberRegisData());
            //  dispatch(load_MemberRegisImg());
            Object.keys(MemberRegisData).map((id,index)=>{
              Object.keys(MemberRegisImg).map((id1,index)=>{
                Object.keys(MemberRegisImg[id1]).map((id2,index)=>{

                   if(Data_id.id ===id ) 
                   {   
                    setState({...MemberRegisData[id]});
                    Mob=MemberRegisData[id].member_mob;
                   }
                   if(Data_id.img_id === id2)
                  {  
                     setStateImg({...(MemberRegisImg[id1])[id2]});

                  }
             })      
            })      
           })
        }, [Data_id]);  

    const{member_id,member_name,father_name,img_data,member_mob,member_address}=state;
 
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
      // function resetFucntion() {
      //   document.getElementById("myForm").reset();
      // }
    const handleSubmit = (e) =>{
        const userid=shortid.generate();
        let mob=state.member_mob;
        let login_validation=false;
        dispatch(load_MemberRegisData());
        e.preventDefault();
        Object.keys(MemberRegisData).map((id,index)=>{
          console.log("number enter",state.member_mob)
          console.log("number",MemberRegisData[id].member_mob)
          if(state.member_mob===MemberRegisData[id].member_mob)
          {
            login_validation=true;
          }
         })
        if(login_validation===true)
        {
          alert("This number is already registered");
          setState({...initialData})
          setStateImg({...initialData2})

        }
        if(login_validation===false)
        {
        if(Data_id.id )
        {   
          database.ref(`member_regis_table/member_data/${Data_id.id}`).set(state,(err)=>{
            if(err)
            {
                alert("data not updated");
            }
            
            else
            {  
                database.ref(`member_regis_table/member_img/${mob}/${Data_id.img_id}`).set(stateImg);         
                alert("data successfully updated");
                setState({...initialData})
                setStateImg({...initialData2})
            }
            if( Mob !== mob )
            {
              database.ref(`member_regis_table/member_img/${Mob}/${Data_id.img_id}`).remove();
    
            }    
        })
        }
        else{
          state.member_id=userid;
          state.password=shortid.generate();;
          stateImg.member_id=userid;
        database.ref("member_regis_table/member_data").push(state,(err) =>{
           if (err){
            alert("you are not signed up");
           }
           else{
            database.ref(`member_regis_table/member_img/${mob}`).push(stateImg);
            alert("you are successfully registered and your password is "+state.password);
            setState({...initialData})
            setStateImg({...initialData2})
           }
        }

        )
      }
      
    }

  }
    return(
            <>
            <Dashboard/>
            <div className=' container mt-5 '>
        
                <form  className="container border border-danger col-sm-offset-4 col-sm-4 mt-4" id="myForm"
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
                    <h3 className='text text-primary text-center '>Member Registration</h3>
                </div>

                <div className='container mt-4'>
                <label className='text-warning'>Name</label>
                     <input 
                     type='text'
                     name='member_name'
                     className='form-control mb-3'
                     placeholder='Enter your name'
                     value={member_name||""}
                     onChange={handleChange}
                     required
                     />
                      <label className='text-warning'> Father Name</label>
                      <input 
                     type='text'
                     name='father_name'
                     className='form-control mb-3'
                     placeholder='Enter your father name'
                     value={father_name||""}
                     onChange={handleChange}
                     required
                     />
                      <label className='text-warning'>Mobile</label>
                       <input 
                     type='text'
                     name='member_mob'
                     className='form-control mb-3'
                     placeholder='Enter mobile number'
                     minlength="10" 
                     maxlength="10"
                     pattern="[0-9]{10}"
                     required
                     value={member_mob||""}
                     onChange={handleChange}
                    
                     />
                    <label className='text-warning'>Photo</label>
                    <input
                          type="file"
                          name="img_data"
                          className="form-control mb-2"
                          placeholder="upload your image"
                          required
                          onChange={imageload}
                     />
                     <label className='text-warning'>Address</label>
                       <input 
                     type='text'
                     name='member_address'
                     className='form-control mb-3'
                     placeholder='Enter address'
                     value={member_address||""}
                     onChange={handleChange}
                     required
                     />
                </div>
                <div className='container mb-2 text-center'>
                    <Button 
                    type='submit'
                    className='btn btn-warning mt-2'
                    // onClick={resetFucntion}
                    >
                    {Data_id.id?"update":"register"}
                    </Button>

                </div>
                 {/* <Link to='/MemberSignIn'> */}
                     {/* <h6 className='text text-warning text-end mb-2' 
                    >
                     Login
                    </h6> */}
                {/* </Link> */}
                </form>
            </div>
        
         </>
    )

}
export default MemberRegistration;