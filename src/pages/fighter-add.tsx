import React, { FunctionComponent, useState } from 'react';
import FighterFormAdd from '../components/fighter-form-Add';
 
  
const FighterAdd: FunctionComponent = () => {
      
  return (
        <div className="row">
            <h2 className="header center">Ajouter un fighter </h2>
            <FighterFormAdd />
        </div>
  );
}
  
export default FighterAdd;