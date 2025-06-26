import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Blog from './components/customer/Blog';
import Appointment from './components/customer/Appointment';
import Appointment2 from './components/customer/Appointment2';
import Advise from './components/customer/Advise';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/appointment2" element={<Appointment2 />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/advise" element={<Advise />} />
      </Routes>
    </Router>
  );
};

export default App;
