import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from "react-bootstrap";
import database from '../component/firebase';
import Resizer from 'react-image-file-resizer';

const initialdata = {
   
    user_name:"",
    user_mobile:"",
    user_id:"",
    state_name:"",
    city_name:"",
    area_name:"",
    address:"",
    pincode:"",
    imgdata:"",
    user_email:""
}
let cityDataArray = [];
let areaDataArray = [];
let loadImg = 0;
const Profile = () => {

    const [stateData, setStateData] = useState({});
    const [cityData, setCityData] = useState({});
    const [areaData, setAreaData] = useState({});
    const [state, setState] = useState(initialdata);


    useEffect(() => {
        database.ref("state_table").on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setStateData({ ...snapshot.val() });
            } else {
                setStateData({});

            }
        });
    }, []);

    useEffect(() => {
        database.ref("city_table").on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setCityData({ ...snapshot.val() });
            }
            else {
                setCityData({});
            }
        });
    }, []);

    useEffect(() => {
        database.ref("area_table").on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setAreaData({ ...snapshot.val() });
            } else {
                setAreaData({});

            }
        });
    }, []);
    cityDataArray = [];
    Object.keys(cityData).map((id, index) => {

        if (state.state_name === cityData[id].state_name) {
            cityDataArray.push(cityData[id].city_name);
        }

    })
    areaDataArray = [];
    Object.keys(areaData).map((id, index) => {
        if (state.city_name === areaData[id].city_name) {
            areaDataArray.push(areaData[id].area_name);
        }
    })

    const imageload=(e) =>{
        var fileinput=false;
        if(e.target.files[0])
        {
          fileinput=true;
    
        }
        if(fileinput)
        {
          try{
              Resizer.imageFileResizer(
              e.target.files[0],
              300,
              300,
              "jpeg",
              200,
              0,
              (uri)=>{
                state.imgdata=uri;
              
                loadImg=1;
                     },
              "base64",
              300,
              300
            );
          }
          catch(err){
            console.log("error in imageload section");
    
    
          }
        }
      }

    return (

        <div className="container" style={{ margintop: '180px' }}>
            <form
                className="container border border-danger col-sm-offset-12 col-sm-4 mt-4"
                style={{ backgroundColor: '#0B0B45' }}>
                <h1 className="text-center text-primary">Profile Update</h1>
                <div>
                    <select
                        className="form-control mb-3"
                        name="state_name">
                        <option>select state name</option>
                        {
                            Object.keys(stateData).map((id, index) => {
                                return (
                                    <option>{stateData[id].state_name}</option>
                                )
                            })
                        }
                    </select>
                    <select className=" form-control mb-3"
                        name="city_name"
                    >
                        <option> select City name</option>
                        {
                            Object.keys(cityDataArray).map((id, index) => {
                                return (
                                    <option>{cityDataArray[id]}</option>
                                )
                            })
                        }
                    </select>
                    <select className=" form-control mb-3"
                        name="area_name"
                    >
                        <option> select area name</option>
                        {
                            Object.keys(areaDataArray).map((id, index) => {
                                return (
                                    <option>{areaDataArray[id]}</option>
                                )
                            })
                        }
                    </select>
                    <input
                        type="text"
                        name="user_name"
                        className="form-control mb-3"
                        placeholder='enter the username'
                    />
                    <input
                        type="text"
                        name="user_mobile"
                        className="form-control mb-3"
                        placeholder='enter the contact'
                    />
                    <input
                        type="text"
                        name="user_email"
                        className="form-control mb-3"
                        placeholder='enter the email'
                    />
                    <input
                        type="password"
                        name="password"
                        className="form-control mb-3"
                        placeholder='enter the password'
                    />

                    <input
                        type="text"
                        name="address"
                        className="form-control mb-3"
                        placeholder='enter the address'
                    />
                    <input
                    type='file'
                    name='imgdata'
                    className="form-control mb-3"
                    placeholder="Upload your image"
                    handleChange={imageload}
                    required
                    />

                </div>
                <div className="container text-center">
                    <Button
                        type="submit"
                        className="btn btn-warning text mb-4"
                    >
                        Update
                    </Button>
                </div>
            </form>
        </div>

    )
}

export default Profile;