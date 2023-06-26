import React from 'react';
import './App.css';
import Button from './Button.js';
import FormElement from './FormElement';
import Form from './Form';
import  { useState } from 'react';
import axios from 'axios';
import PassengerDataService from "./services/PassengerService";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';


function DeletePassenger() {
    const [passengerId, setPassengerId] = useState('');

    function handleChange(e){
        e.preventDefault();
        const { name, value } = e.target;
        if(name=== 'id')
        {
            setPassengerId(value);
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        /*
        axios.delete(`https://localhost:44398/api/Passenger/${passengerId}`)
        .then(response => {
          console.log(response.data);
          setPassengerId('');
        })
        */
       PassengerDataService.remove(passengerId)
        .then(response => {
          console.log(response.data);
          setPassengerId('');
        });
      }
      

    return (
        <div>
          <Form id= "form" formHeader = "Delete Passenger">
          <FormElement name="id"  type="text" label="Passenger Id" handleChange={handleChange}></FormElement>
          <br></br>
          <Button label= "Delete Passenger" handleClick={handleSubmit} ></Button>
          </Form>
          <br></br>
        </div>
    );

}


export default DeletePassenger;