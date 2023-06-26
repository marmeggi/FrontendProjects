import React from 'react';
import './App.css';
import Button from './Button.js';
import FormElement from './FormElement';
import Form from './Form';
import TableRow from './TableRow';
import Table from './Table';
import  { useState } from 'react';
import axios from 'axios';
import PassengerDataService from "./services/PassengerService";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';

function GetPassengerById(){
const [passenger, setPassenger] = useState({});
const [passengerId, setPassengerId] = useState('');
const [passengerList, setPassengerList] = useState([]);

const options= [{ id:'a0d8ffb2-779a-4f85-9289-c1a81c8e8ef8', value: 'employed', label: 'Employed' },
  { id: '27c1b620-2beb-436d-ae41-7952d417ae1b', value: 'unemployed', label: 'Unemployed' },
  {id: '20fdfe0c-c20f-4979-b9b3-39135e438b0d' ,value: 'student', label: 'Student' },
  { id: '0735eb73-1591-4d6d-814f-150a01884ea5', value: 'retired', label: 'Retired' }
  ]

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
 
  PassengerDataService.get(passengerId).then(response => {
    console.log(response.data);
    setPassenger({
        ...response.data,
        employmentStatus: options.find(option => option.id === response.data.employmentStatusId).label
      });
    setPassengerList((prevPassengerList) => [...prevPassengerList,  passenger]);
    setPassengerId('');
  })
  


}

return (
    <div>
      <Form id= "form" formHeader = "Get Passenger By Id">
      <FormElement name="id"  type="text" label="Passenger Id" handleChange={handleChange}></FormElement>
      <br></br>
      <Button label= "Get Passenger" handleClick={handleSubmit} ></Button>
      </Form>
      <br></br>
      <Table tableName= "Passenger Table" columnNames={['First Name', 'Last Name', 'Date Of Birth', 'City Of Residence', 'Employment Status']}>
      {passengerList.map((passenger, index) => (
          <TableRow key={index} rowData={[passenger.firstName, passenger.lastName, passenger.dateOfBirth, passenger.cityOfResidence, passenger.employmentStatus]} />
        ))}
      </Table>
    </div>
);
}

export default GetPassengerById;