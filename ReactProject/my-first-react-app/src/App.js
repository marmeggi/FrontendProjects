import React from 'react';
import './App.css';
import Button from './Button.js';
import FormElement from './FormElement';
import Form from './Form';
import TableRow from './TableRow';
import Table from './Table';

function App() {
  return (
    <div>
      <Form formHeader = "User Form">
      <FormElement type="text" labelName="First Name"></FormElement>
      <FormElement type="text" labelName="Last Name"></FormElement>
      <Button label= "Save" message="You've saved this user."></Button>

      <Button label= "Delete" message="You've deleted this user."></Button>
      </Form>
      <br></br>
      <Table tableName= "User Table" columnNames={['First Name', 'Last Name']}>
      <TableRow rowData={['Data 1', "Data 2"]}/>
      <TableRow rowData={['Data 1', "Data 2"]}/>
      </Table>
    </div>
  );
}

export default App;
