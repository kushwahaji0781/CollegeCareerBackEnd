import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import {Navbar,Nav, NavDropdown} from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import '../css/component/dashboard.css';
// import "../css/header.css";


const Dashboard = () => {

    return (
        <>
        <Navbar collapseOnSelect expand="lg" style ={{height:"60px",backgroundColor:" #0B0B45"}}>
         
         <img
         className="rounded-circle border border-light m-2"

         src="logo1.jpg"
         style =
         {{
            height: "40px",
            width: "40px",
            borderRadius: "30px"

         }}
         />
         <Navbar.Brand className="text-dark">
            <h3 className="text-danger">Admin Dashboard</h3>
         </Navbar.Brand>
         <Navbar.Toggle aria-controls="responsive-navbar-nav"
         style=
         {{
            background:"#ff0000",
            marginRight: "10px"
          }}
          />
          <Navbar.Collapse
          id="responsive-navbar-nav">
            
            <Nav className="mr-auto">
                <NavLink to="/home">
                    <label className="btn btn-dark">Home</label>
                </NavLink>
            </Nav>

            <Nav className="mr-auto">
                <NavDropdown title="location" id="nav-dropdown-id" className="ms-2">
                  
                   <NavDropdown.Item>
                    <NavLink to="/StateRegis">
                        <lable className="btn btn-dark">State Form</lable>
                    </NavLink>
              
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                        
                       <NavLink to="/CityRegis">
                           <lable className="btn btn-dark">City Form</lable>
                       </NavLink>
                        
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                        <NavLink to="/AreaRegis">
                             <lable className="btn btn-dark">Area Form</lable>
                       </NavLink>
                       
                    </NavDropdown.Item>

                </NavDropdown>
             </Nav>

            <Nav className="mr-auto">
                <NavDropdown title="login" id="nav-dropdown-id" className="ms-2">
               
                 <NavDropdown.Item>
                    <NavLink to="/SignIn">
                        <label className="btn btn-dark">SignIn</label>
                    </NavLink>           
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                    <NavLink to="/SignUp">
                        <label className="btn btn-dark">SignUp</label>
                    </NavLink>           
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                    <NavLink to="/Profile">
                        <label className="btn btn-dark">Profile</label>
                    </NavLink>           
                    </NavDropdown.Item>
                </NavDropdown>

            </Nav>
            <Nav className="mr-auto">
                <NavDropdown title="Components" id="nav-dropdown-id" className="ms-2">
               
                <NavDropdown.Item>
                    <NavLink to="/Registration">
                        <label className="btn btn-dark">Registration</label>
                    </NavLink>           
                    </NavDropdown.Item>
                 
                    <NavDropdown.Item>
                    <NavLink to="/CollegeType">
                        <label className="btn btn-dark">College Type</label>
                    </NavLink>           
                    </NavDropdown.Item>

                    {/* <NavDropdown.Item>
                    <NavLink to="/Product">
                        <label className="btn btn-dark">Product Type</label>
                    </NavLink>           
                    </NavDropdown.Item> */}
                    <NavDropdown.Item>
                    <NavLink to="/MemberRegistration">
                        <label className="btn btn-dark">Member Registration</label>
                    </NavLink>           
                    </NavDropdown.Item>
                
               </NavDropdown>
            </Nav>
              

            <Nav className="mr-auto">
            <NavDropdown title="Report" id="nav-dropdown-id" className="ms-2">
            <NavDropdown.Item>
                    <NavLink to="/StateReport">
                        <label className="btn btn-dark">State Report</label>
                    </NavLink>
              
                    </NavDropdown.Item>
            <NavDropdown.Item>
                    <NavLink to="/Testing">
                        <label className="btn btn-dark">Testing</label>
                    </NavLink>
              
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                    <NavLink to="/CityReport">
                        <label className="btn btn-dark">City Report</label>
                    </NavLink>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                    <NavLink to="/AreaReport">
                        <label className="btn btn-dark">Area Report</label>
                    </NavLink>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                    <NavLink to="/OwnerReport">
                        <label className="btn btn-dark">Owner Report</label>
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <NavLink to="/CollegeTypeReport">
                        <label className="btn btn-dark">College Type Report</label>
                    </NavLink>
                    </NavDropdown.Item>
                      <NavDropdown.Item>
                    <NavLink to="/MemberRegistrationReport">
                        <label className="btn btn-dark">Member Registration Report</label>
                    </NavLink>           
                    </NavDropdown.Item>
               </NavDropdown>

            </Nav>
 
            {/* <Nav className="mr-auto ms-2">
                <NavLink to="/about">
                    <label className="btn btn-dark">About</label>
                </NavLink>
            </Nav> */}
            <Nav className="mr-auto ms-2">
                <NavLink to="/SignOut">
                    <label className="btn btn-dark">SignOut</label>
                </NavLink>
            </Nav>
          </Navbar.Collapse >


        </Navbar>
        
        </>

    );
}
export default Dashboard;