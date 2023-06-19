import React from 'react';


export default function FormElement({type, labelName}){
   return(
   <>
    <label>
        {labelName}
        <input type={type}  placeholder='Enter text here.' />
    </label>
    <br></br>
    </>
   );
};