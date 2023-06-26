import React, { useState, useEffect } from 'react';
import Button from './Button';
import FormElement from './FormElement';
import Form from './Form';
import TableRow from './TableRow';
import Table from './Table';
import DropDown from './DropDown';
import PassengerDataService from './services/PassengerService';
import { useParams } from 'react-router-dom';

function UpdatePassenger() {
  const options = [
    { id: 'a0d8ffb2-779a-4f85-9289-c1a81c8e8ef8', value: 'employed', label: 'Employed' },
    { id: '27c1b620-2beb-436d-ae41-7952d417ae1b', value: 'unemployed', label: 'Unemployed' },
    { id: '20fdfe0c-c20f-4979-b9b3-39135e438b0d', value: 'student', label: 'Student' },
    { id: '0735eb73-1591-4d6d-814f-150a01884ea5', value: 'retired', label: 'Retired' }
  ];

  const { id } = useParams();

  const [selectedOption, setSelectedOption] = useState({});

  const [editedPassenger, setEditedPassenger] = useState({});

  useEffect(() => {
    PassengerDataService.get(id).then(response => {
      setEditedPassenger(response.data);
    });
  }, [id]);

  function selectDropdown(e) {
    e.preventDefault();
    const selectedOption = options.find(option => option.value === e.target.value);
    setSelectedOption(selectedOption);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === 'employmentStatus') {
      setSelectedOption(options.find(option => option.value === value));
    } else {
      setEditedPassenger(prevPassenger => ({ ...prevPassenger, [name]: value }));
    }
  }

  function handleSubmit(e) {
    PassengerDataService.update(id, editedPassenger).then(response => {
      // Handle successful update if needed
    });
  }

  return (
    <div>
      <Form id="form" formHeader="Edit Passenger">
        <FormElement name="firstName" type="text" label="First Name" value={editedPassenger.firstName || ''} handleChange={handleChange} />
        <FormElement name="lastName" type="text" label="Last Name" value={editedPassenger.lastName || ''} handleChange={handleChange} />
        <FormElement name="dateOfBirth" type="date" label="Date of Birth" value={editedPassenger.dateOfBirth || ''} handleChange={handleChange} />
        <FormElement name="cityOfResidence" type="text" label="City of Residence" value={editedPassenger.cityOfResidence || ''} handleChange={handleChange} />
        <DropDown name="employmentStatus" options={options} label="Employment Status" selectedOption={editedPassenger.employmentStatus || ''} handleChange={selectDropdown} />

        <Button label="Update Passenger" handleClick={handleSubmit} />
      </Form>
      <br />
      <Table tableName="Passenger Table" columnNames={['First Name', 'Last Name', 'Date of Birth', 'City of Residence', 'Employment Status']}>
        <TableRow rowData={[editedPassenger.firstName || '', editedPassenger.lastName || '', editedPassenger.dateOfBirth || '', editedPassenger.cityOfResidence || '', editedPassenger.employmentStatus || '']} />
      </Table>
    </div>
  );
}

export default UpdatePassenger;
