import Fighter from '../models/fighter';
import React, { useState } from 'react';
import formatDate from '../helpers/format-date'
import formatType from '../helpers/format-type'
import {  useHistory } from 'react-router-dom';


type Props = {
    fighter : Fighter 
    borderColor?: string
}

const FighterCard : React.FC<Props> = ({fighter, borderColor = '#ff0000'}) => {

    const [color, setColor] = useState<string>();
    const history = useHistory();

    const showBorder = () => {
        setColor(borderColor)
    }
    
    const hideBorder = () => {
        setColor('#f5f5f5') // Ont remet la bordure initiale
    }

    const goToFighter = (id: number) => {
        history.push(`/fighters/${id}`)
    } 

    return ( 
        <div id="card" className="col s6 m4" onMouseEnter={showBorder} onMouseLeave={hideBorder} onClick={() => goToFighter(fighter.id)}>
            <div className="card horizontal hoverable" style={{ borderColor: color }}>
                <div className="card-image col">
                    <img  src={fighter.picture} alt=""/>
                </div>
                <div className="card-stacked">
                    <div className="card-content">
                        <p className="center b={-5}">{fighter.name}</p>
                        {/* <p className="center"><small>{formatDate(fighter.created)}</small></p> */}
                        {fighter.types.map(type => (
                            <span key={type} className={formatType(type)}>{type}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default FighterCard;

