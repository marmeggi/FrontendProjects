import React from 'react';
import './App.css';
import Button from './Button.js';
import FormElement from './FormElement';
import Form from './Form';
import TableRow from './TableRow';
import Table from './Table';
import DropDown from './DropDown';
import  { useState } from 'react';
import axios from 'axios';
import PassengerDataService from "./services/PassengerService";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';

function GetAllPassengers() {
    const [passenger, setPassenger] =useState({});
  
    const [filtering, setFiltering] = useState({});

    const [paging, setPaging] = useState({})
  
    const [passengerList, setPassengerList] = useState([]);

    const [selectedOptions, setSelectedOptions] = useState({ orderBy:"", sortOrder:"" });



    const [employmentStatuses, setEmploymentStatuses] = useState([]);

    const sortOrderOptions=[{value:"asc", name:"asc", key:"asc", label: "Ascending"},
    {value:"desc", name:"desc", key:"desc", label: "Descending"}]

    const orderByOptions=[{value:"firstName", name:"firstName", key:"firstName", label: "First Name"},
    {value:"lastName", name:"lastName", key:"lastName", label: "Last Name"},
    {value:"dateOfBirth", name:"dateOfBirth", key:"dateOfBirth", label: "DateOfBirth"},
    {value:"cityOfResidence", name:"cityOfResidence", key:"cityOfResidence", label: "City Of Residence"},
    ]

    const employmentStatusOptions= [{ id:'a0d8ffb2-779a-4f85-9289-c1a81c8e8ef8',name: 'employed', value: 'employed', label: 'Employed' },
        { id: '27c1b620-2beb-436d-ae41-7952d417ae1b', name: 'unemployed',value: 'unemployed', label: 'Unemployed' },
        {id: '20fdfe0c-c20f-4979-b9b3-39135e438b0d' ,name: 'student',value: 'student', label: 'Student' },
        { id: '0735eb73-1591-4d6d-814f-150a01884ea5', name:'retired', value: 'retired', label: 'Retired' }
        ]


    function selectDropdown(e) {
      e.preventDefault();
      const { value } = e.target;
      debugger;
      if(orderByOptions.some(item => item.value === value))
      {
        setSelectedOptions({...selectedOptions,
          orderBy: value
        });
      }
      else
      {
        setSelectedOptions({...selectedOptions,
          sortOrder: value});
      }

    }

    function handleCheckboxChange(e) {
        e.preventDefault();
        const { name, checked } = e.target;
        if (checked) {
            setEmploymentStatuses((prevEmploymentStatuses) => [
            ...prevEmploymentStatuses,
            employmentStatusOptions.find(option => option.name === name)
            ]);
        } else {
            setEmploymentStatuses((prevEmploymentStatuses) =>
            prevEmploymentStatuses.filter(
                option => option.id === employmentStatusOptions.find(option => option.name === name))
            );
        }
        }

    function handleChange(e){
        e.preventDefault();
        const { name, value } = e.target;
      
      if (name === "pageSize" || name === "pageNumber") {
          setPaging((prevPaging) => ({
            ...prevPaging,
            [name]: value,
          }));
        } else if (
          name === "searchQuery" ||
          name === "minDateOfBirth" ||
          name === "maxDateOfBirth"
        ) {
          setFiltering((prevFiltering) => ({
            ...prevFiltering,
            [name]: value,
          }));
        }
      }
    
    function handleSubmit(e){
        e.preventDefault();
        
        const params = {
            pageSize : paging.pageSize,
            pageNumber: paging.pageNumber,
            orderBy: selectedOptions.orderBy,
            sortOrder: selectedOptions.sortOrder,
            searchQuery: filtering.searchQuery,
            minDateOfBirth: filtering.minDateOfBirth,
            maxDateOfBirth: filtering.maxDateOfBirth,
            employmentStatuses: employmentStatuses.map((status, index) => {
                const prefix = index === 0 ? '' : 'employmentStatuses=';
                return `${prefix}${status.id}`;
            }).join('&')
            
        };
       
        PassengerDataService.getAll( { params })
        .then((response) => {
          console.log(response.data);
          const passengers = response.data.map((item) => {
            const responseEmploymentStatusId = item.employmentStatusId;
            const passenger = {
              ...item,
              employmentStatus: employmentStatusOptions.find(
                (option) => option.id === responseEmploymentStatusId
              ).label,
            };
            return passenger;
          });
          setPassengerList(passengers);
        })
        .catch((error) => {
          console.log(error);
        });

    }

    return(
        <div>
        <Form id= "form" formHeader = "Get All Passengers">
        <FormElement name="pageSize"  type="number" label="Page Size" handleChange={handleChange}></FormElement>
        <FormElement name="pageNumber"  type="number" label="Page Number" handleChange={handleChange}></FormElement>
        <DropDown name="orderBy" options = {orderByOptions} label="Order By" selectedOption={selectedOptions.orderBy} handleChange={selectDropdown}></DropDown>
        <DropDown name="sortOrder" options = {sortOrderOptions} label="Sort Order" selectedOption={selectedOptions.sortOrder} handleChange={selectDropdown}></DropDown>
        <FormElement name="searchQuery"  type="text" label="Search Query" handleChange={handleChange}></FormElement>
        <div name="employmentStatus" label="Employment Status">
            {employmentStatusOptions.map((option) => (
                <label key={option.id}>
                <input
                    type="checkbox"
                    name={option.name}
                    checked={employmentStatuses.some((status) => status.id === option.id)}
                    onChange={handleCheckboxChange}
                />
                {option.label}
                </label>
            ))}
        </div>
        <FormElement name="minDateOfBirth"  type="date" label="Minimum Date Of Birth" handleChange={handleChange}></FormElement>
        <FormElement name="maxDateOfBirth"  type="date" label="Maximum Date Of Birth" handleChange={handleChange}></FormElement>
        <Button label= "Save Passenger"  handleClick={handleSubmit}></Button>
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

export default GetAllPassengers;