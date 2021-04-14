import React, { FunctionComponent, useState } from 'react';
import FighterForm from '../components/fighter-form';
 
  
const FighterAdd: FunctionComponent = () => {
    
  const [id]      = useState<number>(new Date().getTime());
  // const [fighter] = useState<Fighter>(new Fighter(id));
  
  return (
        <div className="row">
            <h2 className="header center">Ajouter un fighter </h2>
            {/* <FighterForm fighter={fighter} isEditForm={false}></FighterForm> */}
        </div>
  );
}
  
export default FighterAdd;