import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import formatDate from '../helpers/format-date'
import formatType from '../helpers/format-type'
import FighterService from '../services/fighter-service';
import Loader from '../components/loader';
import { Fighter } from './fighter-list';
  
type Params = { id: string };
  
const FightersDetail: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {
    
  const [fighter, setfighter] = useState<Fighter|null>(null);
  
  useEffect(() => {
    FighterService.getFighter(+match.params.id)
    .then(fighter => setfighter(fighter))
  }, [match.params.id]);
    
  return (
    <div>
      { fighter ? (
        <div className="row">
          <div className="col s12 m8 offset-m2"> 
            <h2 className="header center">{ fighter.name }</h2>
            <div className="card hoverable"> 
              <div className="card-image ">
                <img src={fighter.picture} alt={fighter.name} style={{width: '210px', margin: '0 auto'}}/>
                <Link to={`/fighters/edit/${fighter._id}`} className="btn btn-floating halfway-fab waves-effect waves-light">
                  <i className="material-icons">edit</i>
                </Link>
              </div>
              
              <div className="card-stacked">
                <div className="card-content ">
                  <table className="bordered striped ">
                    <tbody>
                      <tr> 
                        <td>Nom</td> 
                        <td><strong>{ fighter.name }</strong></td> 
                      </tr>
                      <tr> 
                        <td>Points de vie</td> 
                        <td><strong>{ fighter.hp }</strong></td> 
                      </tr> 
                      <tr> 
                        <td>Dégâts</td> 
                        <td><strong>{ fighter.cp }</strong></td> 
                      </tr> 
                      <tr> 
                        <td>Types</td> 
                        <td>
                          {fighter.types.map(type => (
                           <span key={type} className={formatType(type)}>{type}</span>
                          ))}</td> 
                      </tr> 
                      <tr> 
                        <td>Date de création</td> 
                        {/* <td>{formatDate(fighter.created)}</td>  */}
                      </tr>
                    </tbody>
                  </table>
                  <div className="card-action ">
                    <Link to="/">Retour</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h4 className="center"><Loader/></h4>
      )}
    </div>
  );
}
  
export default FightersDetail;
