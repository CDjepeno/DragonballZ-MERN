import React, { useState } from 'react';
import fighters from './models/fighters';
import FIGHTERS from './models/mock-fighters';
  
const App  : React.FC = () => {
    const [name, setName] = useState<String>('React');
    const [Fighters, setFighters] = useState();
    
    return (
   <>
        <h1>ils y a {FIGHTERS.length} fighthers</h1>

        {FIGHTERS.map(fighter => 
            <img src={fighter.picture} alt=""/>

        )}
   </>
    );
}
  
export default App;