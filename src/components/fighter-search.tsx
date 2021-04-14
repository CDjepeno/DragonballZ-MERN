import React, { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Fighter } from '../pages/fighter-list'
import FighterService from '../services/fighter-service';
 
const FighterSearch: FunctionComponent = () => {
  
  const [term, setTerm]         = useState<string>('');
  const [fighters, setFighters] = useState<Fighter[]>([]);
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value;
    setTerm(term);
    
    if(term.length <= 1) {
        setFighters([]);
        return;
    }
    
    FighterService.searchFighter(term).then(fighters => setFighters(fighters) );
}

  return (
    <div className="row" > 
    <div className="col s12 m6 offset-m3"> 
      <div className="card"> 
      <div className="card-content"> 
        <div className="input-field"> 
        <input type="text" placeholder="Rechercher un fighter" value={term} onChange={e => handleInputChange(e)} /> 
        </div> 
        <div className='collection' >
        {fighters.map((fighter) => (
          <Link key={fighter._id} to={`/fighters/${fighter._id}`} className="collection-item" >
            {fighter.name}
          </Link>
        ))}
        </div> 
      </div> 
      </div> 
    </div> 
    </div>
  );
}
  
export default FighterSearch;