import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Wheather from "./components/wheather";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/whether" element={<Wheather />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
