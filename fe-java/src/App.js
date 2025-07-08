import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Blog from './components/customer/Blog';
import Document from './components/customer/Document';
import Service from './components/customer/Service';
import Home from './components/TrangChu/Home';
import Appointment from './components/customer/Appointment';
import Result from './components/customer/Result';
import Appointment2 from './components/customer/Appointment2';
import Remind from './components/customer/Remind';
import Lookup from './components/customer/Lookup';
import Patient from './components/customer/Patient';
import Advise from './components/customer/Advise';
import History from './components/customer/History';
import Personal from './components/customer/Personal';
import Homecustomer  from './components/TrangChu/Homecustomer';
import Dangnhap from './components/login/Login'; 
import Dangki from './components/login/Register';
import Overview from './components/doctor/Overview';
import Work from './components/doctor/Work';
import List from './components/doctor/List';
import Person from './components/doctor/Person';
import Mess from './components/doctor/Mess';
import ARV from './components/doctor/ARV';
import Blogdoc from './components/doctor/Blogdoc';
import Documentdoc  from './components/doctor/Documentdoc';
import Servicedoc from './components/doctor/Servicedoc';
import Managedoctor from './components/admin/Managedoctor'; 
import Manageuser from './components/admin/Manageuser';
import Login from './components/login/Login';
import Register from './components/login/Register';
import Admin from './components/admin/Admin';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/service" element={<Service />} />
        <Route path="appointment" element={<Appointment />} />
        <Route path="/document" element={<Document />} />
        <Route path="/result" element={<Result />} />
        <Route path="/appointment2" element={<Appointment2 />} />
        <Route path="/remind" element={<Remind/>} />
        <Route path="/lookup" element={<Lookup/>} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/advise" element={<Advise />} />
        <Route path="/history" element={<History/>} />
        <Route path="/personal" element={<Personal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/work" element={<Work />} />
        <Route path="/list" element={<List />} />
        <Route path="/person" element={<Person />} />
        <Route path="/mess" element={<Mess />} />
        <Route path="/arv" element={<ARV />} />
        <Route path="/blogdoc" element={<Blogdoc />} />
        <Route path="/documentdoc" element={<Documentdoc />} />
        <Route path="/servicedoc" element={<Servicedoc />} />
        <Route path="/homecustomer" element={<Homecustomer />} />
        <Route path="/managedoctor" element={<Managedoctor />} />
        <Route path="/manageuser" element={<Manageuser />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;