import React from 'react';
import './App.css';
import Button from './Button.js';
import FormElement from './FormElement';
import Form from './Form';
import TableRow from './TableRow';
import Table from './Table';
import DropDown from './DropDown';
import { useState } from 'react';
import axios from 'axios';
import PassengerDataService from "./services/PassengerService";
import { Link } from "react-router-dom";




function AddPassenger() {
  const [passenger, setPassenger] = useState({});

  const [selectedOption, setSelectedOption] = useState({});

  const [passengerList, setPassengerList] = useState([]);

  const options = [{ id: 'a0d8ffb2-779a-4f85-9289-c1a81c8e8ef8', value: 'employed', label: 'Employed', name: 'employed' },
  { id: '27c1b620-2beb-436d-ae41-7952d417ae1b', value: 'unemployed', label: 'Unemployed', name: 'unemployed' },
  { id: '20fdfe0c-c20f-4979-b9b3-39135e438b0d', value: 'student', label: 'Student', name: 'student' },
  { id: '0735eb73-1591-4d6d-814f-150a01884ea5', value: 'retired', label: 'Retired', name: 'retired' }
  ]
  function selectDropdown(e) {
    e.preventDefault();

    const select = options.find(option => option.value === e.target.value);
    debugger;
    setSelectedOption(select);
    console.log(selectedOption);
  }

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;


    setPassenger(prevPassenger => ({
      ...prevPassenger,
      [name]: value
    }));

  }


  function handleSubmit(e) {
    e.preventDefault();
    const passengerWithEmploymentStatusId = {
      ...passenger,
      employmentStatusId: selectedOption.id
    };
    const passengerWithEmploymentStatus = {
      ...passenger,
      employmentStatus: selectedOption.label
    };
    setPassengerList((prevPassengerList) => [...prevPassengerList, passengerWithEmploymentStatus]);
    /*
     axios.post('https://localhost:44398/api/Passenger', passengerWithEmploymentStatusId)
     .then(response => {
       console.log(response.data);
       setPassenger({});
       setSelectedOption({});
     })
     */
    PassengerDataService.create(passengerWithEmploymentStatusId)
      .then(response => {
        console.log(response.data);
        setPassenger({});
        setSelectedOption({});
      })
  };

  return (
    <div>
      <Form id="form" formHeader="Create Passenger">
        <FormElement name="firstName" type="text" label="First Name" handleChange={handleChange}></FormElement>
        <FormElement name="lastName" type="text" label="Last Name" handleChange={handleChange}></FormElement>
        <FormElement name="dateOfBirth" type="date" label="DateOfBirth" handleChange={handleChange}></FormElement>
        <FormElement name="cityOfResidence" type="text" label="City Of Residence" handleChange={handleChange}></FormElement>
        <DropDown  options={options} label="Employment Status" 
          selectedOption={selectedOption.value} handleChange={selectDropdown}>
          </DropDown>
        {/*<Button label= "Delete" handleClick={handleSubmit} ></Button> */}
        <Button label="Save Passenger" handleClick={handleSubmit}></Button>
      </Form>
      <br></br>
      <Table tableName="Passenger Table" columnNames={['First Name', 'Last Name', 'Date Of Birth', 'City Of Residence', 'Employment Status']}>
        {passengerList.map((passenger, index) => (
          <TableRow key={index} rowData={[passenger.firstName, passenger.lastName, passenger.dateOfBirth, passenger.cityOfResidence, passenger.employmentStatus]} />
        ))}
      </Table>
    </div>
  );
}

export default AddPassenger;
