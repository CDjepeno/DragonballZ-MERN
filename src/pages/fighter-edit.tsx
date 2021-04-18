import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import FighterFormUpdate from '../components/fighter-form-Update';
import Loader from '../components/loader';
import FighterService from '../services/fighter-service';
import { Fighter } from './fighter-list';
 
type Params = { id: string };
  
const FighterEdit: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {
    
  const [fighter, setfighter] = useState<Fighter|null>(null);

  const getData = async() => {
    await FighterService.getFighter(match.params.id).then(fighter => setfighter(fighter))
  }
  
  useEffect(() => {
    getData()
  }, [match.params.id]);
    
  return (
    <div>
      { fighter ? (
        <div className="row">
            <h2 className="header center">Éditer { fighter.name }</h2>
            <FighterFormUpdate fighter={fighter} />
        </div>
      ) : (
        <h4 className="center"><Loader/></h4>
      )}
    </div>
  );
}
  
export default FighterEdit;