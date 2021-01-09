import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import FighterForm from '../components/fighter-form';
import Fighter from '../models/fighter';
import FighterService from '../services/fighter-service';
 
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
        <h4 className="center">Aucun fighter à afficher !</h4>
      )}
    </div>
  );
}
  
export default FighterEdit;