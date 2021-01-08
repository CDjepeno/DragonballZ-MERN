import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import Fighter from '../models/fighter';
import formatDate from '../helpers/format-date'
import formatType from '../helpers/format-type'
import Fighters from '../models/mock-fighters';
  
type Params = { id: string };
  
const FightersDetail: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {
    
  const [Fighter, setFighter] = useState<Fighter|null>(null);
  
  useEffect(() => {
    Fighters.forEach(Fighter => {
      if (match.params.id === Fighter.id.toString()) {
        setFighter(Fighter);
      }
    })
  }, [match.params.id]);
    
  return (
    <div>
      { Fighter ? (
        <div className="row">
          <div className="col s12 m8 offset-m2"> 
            <h2 className="header center">{ Fighter.name }</h2>
            <div className="card hoverable"> 
              <div className="card-image ">
                <img src={Fighter.picture} alt={Fighter.name} style={{width: '210px', margin: '0 auto'}}/>
                <Link to={`/fighters/edit/${Fighter.id}`} className="btn btn-floating halfway-fab waves-effect waves-light">
                  <i className="material-icons">edit</i>
                </Link>
              </div>
              
              <div className="card-stacked">
                <div className="card-content ">
                  <table className="bordered striped ">
                    <tbody>
                      <tr> 
                        <td>Nom</td> 
                        <td><strong>{ Fighter.name }</strong></td> 
                      </tr>
                      <tr> 
                        <td>Points de vie</td> 
                        <td><strong>{ Fighter.hp }</strong></td> 
                      </tr> 
                      <tr> 
                        <td>Dégâts</td> 
                        <td><strong>{ Fighter.cp }</strong></td> 
                      </tr> 
                      <tr> 
                        <td>Types</td> 
                        <td>
                          {Fighter.types.map(type => (
                           <span key={type} className={formatType(type)}>{type}</span>
                          ))}</td> 
                      </tr> 
                      <tr> 
                        <td>Date de création</td> 
                        <td>{formatDate(Fighter.created)}</td> 
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
        <h4 className="center">Aucun fighter à afficher !</h4>
      )}
    </div>
  );
}
  
export default FightersDetail;