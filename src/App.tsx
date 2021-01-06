import React, { useEffect, useState } from 'react';
import FIGHTERS from './models/mock-fighters';
import fighters from './models/fighters';
import './style.scss'
 
// initialiser le state avec un tableau vide: []
// Charger le liste FIGTHERS à l'initialisation du composant
// Veiller à ce que la liste des fighters ne soit chargé dans le state qu'une seule fois
const App  : React.FC = () => {
    const [Fighters, setFighters] = useState<fighters[]>([]);

    useEffect(() => {
        setFighters(FIGHTERS)
    },[]);
    
    return (
    <>
        <h1 className="center">Fighters</h1>
        <div className="container">
            <div className="row">
                {FIGHTERS.map(fighter => 
                    <div className="col s6 m4" key={fighter.id}>
                        <div className="card horizontal">
                            <div className="card-image">
                                <img  src={fighter.picture} alt=""/>
                            </div>
                            <div className="card-stacked">
                                <div className="card-content">
                                    <p className="center">{fighter.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </>
    );
}
  
export default App;