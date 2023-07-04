import React from 'react'
import { NavLink } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import '../css/component/dashboard.css';
const CollegeOwnerDashboard = () => {
  return (
    <>
    <Navbar collapseOnSelect expand="lg" className='mt-2' style={{ height: "80px", backgroundColor: "#0B0B45" }}>
        <img
          className="rounded-circle border border-light m-2"
          src="logo1.jpg"
          style={{
            height: "50px",
            width: "50px",
            borderRadius: "30px"
          }}
        />
        <Navbar.Brand className="text-light">
        College Owner Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"
                    style=
                    {{
                        background: "#ff0000",
                        marginRight: "10px"
                    }}
                />
        <Navbar.Collapse
          id='respnsive-navbar-nav'>
            <Nav className='mr-auto'>
            <NavDropdown title="item Details" id="nav-dropdown-id"  className="ms-2 "
       >
              <NavDropdown.Item>
                <NavLink to="/Product">
                  <label className="btn btn-dark">Add Product</label>
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink to="/Productreport">
                  <label className="btn btn-dark">Manage Product</label>
                </NavLink>
              </NavDropdown.Item>
              </NavDropdown>
              </Nav>
          <Nav className='mr-auto' style={{ marginLeft: "20px" }}>
            <NavLink to="/SignOut">
              <label className="btn btn-dark">SignOut</label>
            </NavLink>
          </Nav>
          </Navbar.Collapse>
     </Navbar>
    </>
  )
}
export default CollegeOwnerDashboard;