import React from 'react';
import button from './Button.css';


export default function Button({label, message}){
    const onClickMessage = ()=>{
        console.log({message});
    };

    return(
        <div>
            <button className="button" onClick={onClickMessage}>
                {label}
            </button>
        </div>
    );

}

