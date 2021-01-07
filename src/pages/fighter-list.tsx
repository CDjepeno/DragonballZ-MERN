import React, { FunctionComponent, useState, useEffect } from 'react';
import Fighter from '../models/fighter';
import FIGHTERS from '../models/mock-fighters';
import FighterCard from '../components/fighter-card';
  
const FighterList: FunctionComponent = () => {
  const [fighters, setFighters] = useState<Fighter[]>([]);
  
  useEffect(() => {
    setFighters(FIGHTERS);
  }, []);
  
  return (
    <div>
      <div className="head">
        <img src="https://images2.alphacoders.com/739/739910.png" alt="logo"/>
      </div>
      <div className="container"> 
        <div className="row"> 
        {fighters.map(fighter => (
          <FighterCard key={fighter.id} fighter={fighter} />
        ))}
        </div>
      </div>
    </div> 
  );
}
  
export default FighterList;