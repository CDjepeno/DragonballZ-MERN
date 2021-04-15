import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import FighterCard from '../components/fighter-card';
import FighterService from '../services/fighter-service';
import { Link } from 'react-router-dom';
import FighterSearch from '../components/fighter-search';
import context from '../context/context';

export type Fighter = {
  _id: any,
  types: Array<string>,
  hp: number,
  cp: number,
  name: string,
  picture: string
}

const FighterList: FunctionComponent = () => {
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const {isAuthenticatedManager, setIsAuthenticatedManager} = useContext(context)

  console.log(isAuthenticatedManager);
  

  const getData = async() => {
    await FighterService.getFighters()
    .then(fighters => setFighters(fighters))
  }
  
  useEffect(() => {
    getData()
  }, []);
    
  
  return (
    <div>
      <div className="container"> 
        <FighterSearch/>
        <div className="row"> 
          {fighters.map(fighter => (
            <FighterCard key={fighter._id} fighter={fighter} />
          ))}
        </div>
        {isAuthenticatedManager && 
          <Link className="btn-floating btn-large waves-effect waves-light red z-depth-3"
            style={{position: 'fixed', bottom:'25px', right:'25px'}}
            to="/fighter/add">
            <i className="material-icons">add</i>
          </Link>
        }
      </div>
    </div> 
  );
}
  
export default FighterList;