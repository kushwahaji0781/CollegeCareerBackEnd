import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import '../css/component/dashboard.css';
// import "../css/header.css";


const MemberDashboard = () => {

    return (
        <>
            <Navbar collapseOnSelect expand="lg" style={{ height: "60px", backgroundColor:"#0B0B45" }}>

                <img
                    className="rounded-circle border border-light m-2"
                    src="logo1.jpg"
                    style=
                    {{
                        height: "40px",
                        width: "40px",
                        borderRadius: "30px"
                    }}
                />
                <Navbar.Brand className="text-danger">
                    <h3>Member Dashboard</h3>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"
                    style=
                    {{
                        background: "#ff0000",
                        marginRight: "10px"
                    }}
                />
                <Navbar.Collapse
                    id="responsive-navbar-nav">

                    {/* <Nav className="mr-auto">
                        <NavLink to="/Home">
                            <label className="btn btn-dark">Home</label>
                        </NavLink>
                    </Nav> */}

                    <Nav className="mr-auto ms-2">
                        <NavDropdown title="Report" id="nav-dropdown-id" className="ms-2">
                            <NavDropdown.Item>

                                <NavLink to="/Registration">
                                    <label className="btn btn-dark">Registration</label>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item>

                                <NavLink to="/AppUser">
                                    <label className="btn btn-dark">AppUser</label>
                                </NavLink>
                            </NavDropdown.Item>
                        </NavDropdown>

                    </Nav>


                    <Nav className="mr-auto ms-2">
                        <NavLink to="/About">
                            <label className="btn btn-dark">About</label>
                        </NavLink>
                    </Nav>

                    <Nav className="mr-auto ms-2">
                        <NavLink to="/Signout">
                            <label className="btn btn-dark">Signout</label>
                        </NavLink>
                    </Nav>

                </Navbar.Collapse >


            </Navbar>

        </>

    );
}
export default MemberDashboard;