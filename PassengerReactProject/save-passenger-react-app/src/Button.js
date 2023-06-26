import React from 'react';
import  './Button.css';
import { useState } from 'react';

export default function Button({label, handleClick}){
    return(
    
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <button className="button" onClick={handleClick}>
            {label}
        </button>
       </div>

        
    );

}
