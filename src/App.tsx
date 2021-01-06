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
            <div className="container">
                <h1>ils y a {Fighters.length} fighthers</h1>

                <div className="row">
                    {FIGHTERS.map(fighter => 
                        <div className="col">
                            <p key={fighter.id}>{fighter.name}</p>
                            <img  src={fighter.picture} alt=""/>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
  
export default App;