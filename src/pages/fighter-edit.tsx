import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import FighterForm from '../components/fighter-form';
import Loader from '../components/loader';
import FighterService from '../services/fighter-service';
import { Fighter } from './fighter-list';
 
type Params = { id: string };
  
const FighterEdit: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {
    
  const [fighter, setfighter] = useState<Fighter|null>(null);
  
  useEffect(() => {
    FighterService.getFighter(+match.params.id)
    .then(fighter => setfighter(fighter))
  }, [match.params.id]);
    
  return (
    <div>
      { fighter ? (
        <div className="row">
            <h2 className="header center">Éditer { fighter.name }</h2>
            <FighterForm fighter={fighter} isEditForm={true}></FighterForm>
        </div>
      ) : (
        <h4 className="center"><Loader/></h4>
      )}
    </div>
  );
}
  
export default FighterEdit;