import React from "react";
import { BrowserRouter,MemoryRouter,Route, Routes } from "react-router-dom";
import AreaRegis from "../location/AreaRegis";
import CityRegis from "../location/CityRegis";
import StateRegis from "../location/StateRegis";
import Profile from "../login/Profile";
import SignIn from "../login/SignIn";
import SignUp from "../login/SignUp";
import AreaReport from "../report/AreaReport";
import CityReport from "../report/CityReport";
import CollegeTypeReport from "../report/CollegeTypeReport";
import OwnerReport from "../report/OwnerReport";
import ProductReport from "../report/ProductReport";
import StateReport from "../report/StateReport";
import CollegeType from "./CollegeType";
import Dashboard from "./Dashboard";
import Home from "./Home";
import MemberDashboard from "./MemberDashboard";
import MemberRegistration from "./MemberRegistration";
import MemberRegistrationReport from "./MemberRegistrationReport";
import Product from "./Product";
import Registration from "./Registration";
import MainSignIn from "./MainSignIn";
import MemberLogin from "./MemberLogin";
import CollegeOwnerDashboard from './CollegeOwnerDashboard';
import AppUser from "./AppUser";
import Testing from "./Testing";
const MyMapping = ()=>{

return(

    <div>
       
        <MemoryRouter>
         {/* <MemberDashboard/> */}
          {/* <Dashboard/> */}
          {/* <MainSignIn/> */}
          {/* <BrowserRouter> */}
      
        <Routes>
                <Route path='/' element={<MainSignIn/>}/>
                <Route path='/SignOut' element={<MainSignIn/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/MemberLogin' element={<MemberLogin/>}/>
                <Route path='/SignIn' element={<MainSignIn/>}/>
                <Route path='/SignUp' element={<SignUp/>}/>
                <Route path='/SignIn' element={<SignIn/>}/>
                <Route path='/Profile' element={<Profile/>}/>
                <Route path='/StateRegis' element={<StateRegis/>}/>
                <Route path='/CityRegis' element={<CityRegis/>}/>
                <Route path='/AreaRegis' element={<AreaRegis/>}/>
                <Route path='/StateReport' element={<StateReport/>}/>
                <Route path='/CityReport' element={<CityReport/>}/>
                <Route path='/AreaReport' element={<AreaReport/>}/>
                <Route path='/Product' element={<Product/>}/>
                <Route path='/Productreport' element={<ProductReport/>}/>
                <Route path='/CollegeTypeReport' element={<CollegeTypeReport/>}/>
                <Route path='/ProductReport' element={<ProductReport/>}/>
                <Route path='/Registration' element={ <Registration/>}/>
                <Route path='/CollegeType' element={ <CollegeType/>}/>
                <Route path='/Registration' element={ <Registration/>}/>
                <Route path='/Product' element={ <Product/>}/>
                <Route path='/MemberRegistration' element={ <MemberRegistration/>}/>
                <Route path='/MemberRegistrationReport' element={ <MemberRegistrationReport/>}/>
                <Route path ='/update/:id' element={<StateRegis/>}/>
                <Route path ='/Cityupdate/:id' element={<CityRegis/>}/>
                <Route path ='/Areaupdate/:id' element={<AreaRegis/>}/>
                <Route path ='/Collegeupdate/:id' element={<CollegeType/>}/>
                <Route path ='/Productupdate/:id' element={<Product/>}/>
                <Route path ='/OwnerReport' element={<OwnerReport/>}/>
                <Route path ='/AppUser' element={<AppUser/>}/>
                <Route path ='/Ownerupdate/:id/:img_id' element={<Registration/>}/>
                <Route path ='/MemberRegisupdate/:id/:img_id' element={<MemberRegistration/>}/>
                <Route path ='/Testing' element={<Testing/>}/>

          </Routes>
          </MemoryRouter>
          {/* </BrowserRouter> */}

    </div>
);

}
export default MyMapping;