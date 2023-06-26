import React from 'react';


export default function Form({children, formHeader})
{
    return(
    <div>
    <header> <b>{formHeader} </b> </header>
    <form>
      {children}
    </form>
    </div>
    );
};