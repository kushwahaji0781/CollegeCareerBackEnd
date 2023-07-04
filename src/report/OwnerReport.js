import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {load_StateData,load_CityData,load_AreaData,load_RegistrationData,load_RegistrationImageData,} from "../redux/action";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import database from "../component/firebase";
import { Button } from "react-bootstrap";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../css/report/cityreport.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Dashboard from "../component/Dashboard";
const initialData = {
  state_name: "",
  city_name: "",
  area_name: "",
  search: "",
};
let cityDataArray = [];
let areaDataArray = [];
let img_id;
const OwnerReport = () => {
  const [state, setState] = useState(initialData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const { LoadState, LoadCity, LoadArea, RegisData, RegisImage } = useSelector(
    (state) => state.cartreducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(load_StateData());
    dispatch(load_CityData());
    dispatch(load_AreaData());
  }, []);
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
  let stnm = state.state_name;
  let ctnm = state.city_name;
  let arnm = state.area_name;
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(load_RegistrationData(stnm, ctnm, arnm));
    dispatch(load_RegistrationImageData(stnm, ctnm, arnm));
  };
  const onDelete = (id) => {
    if (window.confirm("are you sure you want to delete the record?")) {
      database
        .ref(`user/${stnm}/${ctnm}/${arnm}/user_reg/${id}`)
        .remove((err) => {
          if (err) {
            alert("record is not deleted");
          } else {
            Object.keys(RegisImage).map((id1, index) => {
              let mob = RegisData[id].user_mobile;
              if (RegisData[id].user_mobile === id1) {
                Object.keys(RegisImage[id1]).map((id2, index) => {
                  database
                    .ref(
                      `user/${stnm}/${ctnm}/${arnm}/user_regis_img/${mob}/${id2}`
                    )
                    .remove();
                  alert("record is deleted");
                  dispatch(load_RegistrationData(stnm, ctnm, arnm));
                });
              }
            });
          }
        });
    }
  };
  let arrayRegisData = [];
  Object.keys(RegisData).map((key, index) => {
    arrayRegisData.push({ key, value: RegisData[key] });
  });
  if (state.search) {
    arrayRegisData = arrayRegisData.filter(
      (name) =>
        name.value.registrationBy.match(new RegExp(state.search, "i")) ||
        name.value.college_name.match(new RegExp(state.search, "i"))
    );
  }
  return (
    <>
      <> <Dashboard/>
      <div style={{ backgroundColor:"#0B0B45" }}>
      <h2 className="text-center  text-danger"> Owner Report</h2>
        <form className="container  border border-dark"  onSubmit={handleSubmit}>
       <Row>
        <Col xs={3}>
        <h6 className="text-warning form-group">State Name</h6>
        <select
                name="state_name"
                onChange={handleChange}
                className="form-control"
              >
                <option>select state name</option>
                {Object.keys(LoadState).map((id, index) => {
                  return (
                    <option>{LoadState[id].state_name}</option>
                  );
                })}
              </select>
        </Col>
        <Col xs={3}>
        <h6 className="text-warning form-group">City Name</h6>
        <select
                name="city_name"
                onChange={handleChange}
                className="form-control"
              >
                <option>select city name</option>
                {Object.keys(cityDataArray).map((id, index) => {
                  return <option>{cityDataArray[id]}</option>;
                })}
              </select>
        </Col>
        <Col xs={3}>
        <h6 className="text-warning form-group">Area Name</h6>
        <select
                name="area_name"
                onChange={handleChange}
                className="form-control"
              >
                <option> select area name</option>
                {Object.keys(areaDataArray).map((id, index) => {
                  return <option>{areaDataArray[id]}</option>;
                })}
              </select>
        </Col>
        <Col xs={3}>
          <br></br>
        <Button type="submit" className="btn btn-warning btn ">
              Search
            </Button>
        </Col>
       </Row>
        </form>
      </div>
      <div className="container mt-1 d-flex justify-content-end">
          <Col xs={2}>
            <input type="search"
                 name="search"
                 className=" form-control border-dark"
                 onChange={handleChange}
                 placeholder="search here..."
                 />
             </Col>
        </div>

      </>
      :
      <>
        <div className="container mt-0">
          <div className="table-responsive-md">
            <table className="table table-striped table-bordered table-hover">
              <thead className="bg-dark text-white">
                <tr>
                  <th>sno</th>
                  <th>Registration_id</th>
                  <th>Registered_by</th>
                  <th>College Name</th>
                  <th>College address </th>
                  <th>Pincode </th>
                  <th> Mobile No.</th>
                  <th> password</th>
                  <th>Registration Date</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(arrayRegisData).map((id, index) => {
                  // console.log("id is ",arrayRegisData[id].key)
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>{arrayRegisData[id].value.registration_id}</td>
                      <td>{arrayRegisData[id].value.registrationBy}</td>
                      <td>{arrayRegisData[id].value.college_name}</td>
                      <td>{arrayRegisData[id].value.college_address}</td>
                      <td>{arrayRegisData[id].value.college_add_pincode}</td>
                      <td>{arrayRegisData[id].value.user_mobile}</td>
                      <td>{arrayRegisData[id].value.password}</td>
                      <td>{arrayRegisData[id].value.currentDate}</td>
                      <td>
                        {Object.keys(RegisImage).map((id1, index) => {
                          if (arrayRegisData[id].value.user_mobile === id1) {
                            //  console.log("global.loadimg-----------",global.loadimg)
                            Object.keys(RegisImage[id1]).map((id2, index) => {
                              img_id = id2;

                              global.loadimg = RegisImage[id1][id2].img_data;
                            });

                            return (
                              <>
                                <img
                                  src={global.loadimg}
                                  height="60"
                                  width="60"
                                />
                              </>
                            );
                          }
                        })}
                      </td>
                      <td className="text-center">
                        <Link
                          to={`/ownerUpdate/${arrayRegisData[id].key}/${img_id}`}
                        >
                          <button
                            className="btn"
                            style={{ backgroundColor: "#00FFFF" }}
                          >
                            edit
                          </button>
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            onDelete(arrayRegisData[id].key)(img_id)
                          }
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    </>
  );
};
export default OwnerReport;
