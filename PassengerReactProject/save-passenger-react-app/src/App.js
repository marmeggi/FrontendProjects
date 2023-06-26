import React from 'react';
import './App.css';
import AddPassenger from './AddPassenger.js';
import GetPassengerById from './GetPassengerById';
import DeletePassenger from './DeletePassenger';
import UpdatePassenger from './UpdatePassenger';
import GetAllPassengers from './GetAllPassengers';
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";

function App() {

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          Passengers
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Get All
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add 
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/delete/:id"} className="nav-link">
              Delete
            </Link>
            </li>
            <li className="nav-item">
            <Link to={"/update/:id"} className="nav-link">
              Update
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/:id"} className="nav-link">
              Get by Id
            </Link>
          </li>
          
        </div>

      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<GetAllPassengers/>} />
          <Route path="/delete/:id" element={<DeletePassenger/>} />
          <Route path="/add" element={<AddPassenger/>} />
          <Route path="/:id" element={<GetPassengerById/>} />
          <Route path="/update/:id" element={<UpdatePassenger/>} /> 
        </Routes>
      </div>
    </div>
    
  );
}

export default App;
