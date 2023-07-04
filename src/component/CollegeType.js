import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from 'react-bootstrap';
import shortid from 'shortid';
import database from '../component/firebase';
import { load_CollegeData } from '../redux/action';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import Dashboard from './Dashboard';
import Resizer from 'react-image-file-resizer';

const initialData =
{
    college_type: "",
    college_img: "",
    college_id: ""
}
let loadImg = 0;

const CollegeType = () => {
    const [state, setState] = useState(initialData);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }
    const matchid = useParams();
    const { CollegeType } = useSelector(state => state.cartreducer);
    const dispatch = useDispatch();

    useEffect
        (
            () => {
                Object.keys(CollegeType).map((id, index) => {
                    if (matchid.id === id) {
                        setState({ ...CollegeType[id] });
                    }
                })

            }, [matchid]);
    const { college_id, college_type } = state;
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
                        state.college_img = uri;

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
        if (matchid.id) {
            // update block
            database.ref(`college_table/${matchid.id}`).set(state, (err) => {
                if (err) {
                    alert("data not updated");
                }
                else {
                    alert("data successfully updated");
                    setState({...initialData})
                }
            })
        }
        else {
            //push block
            const collegeid = shortid.generate();
            state.college_id = collegeid;
            e.preventDefault();
            database.ref("college_table").push(state, (err) => {
                if (err) {
                    alert("not inserted");
                }
                else {
                    alert("inserted");
                    setState({...initialData})
                }
            })
        }
    }
    return (
        <>
            <Dashboard />
            <div className='container mt-4'>
                <form className='container col-sm-4 col-sm-offset-4 border border-dark'
                    style={{ backgroundColor: "#0B0B45" }}
                    onSubmit={handleSubmit}>
                    <div className='container mt-4'>
                        <h2 className='=text text-primary text-center mt-2 '>College Type</h2>
                    </div>
                    <div className='container mt-3'>
                        <label className='text-warning mb-2'>College Type</label>
                        <input
                            type="text"
                            name="college_type"
                            className="form-control"
                            placeholder="enter college name"
                            value={college_type || ""}
                            onChange={handleChange}
                        />
                        <label className='text-warning bold'>Photo</label>
                        <input
                            type="file"
                            name="college_img"
                            className="form-control mb-3"
                            placeholder="upload your image"

                            onChange={imageload}
                        />
                    </div>
                    <div className='container text-center mb-3 mt-2'>
                        <Button
                            type="submit"
                            className="btn-warning mt-3"
                        >
                            {matchid.id ? "update" : "register"}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default CollegeType;