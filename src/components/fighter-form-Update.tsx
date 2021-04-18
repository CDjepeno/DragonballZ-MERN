import React, { FunctionComponent, useState } from 'react';
import formatType from '../helpers/format-type';
import { Link, useHistory } from 'react-router-dom'
import FighterService from '../services/fighter-service';
import { Fighter } from '../pages/fighter-list';

  
type Props = {
  fighter: Fighter
};

type Field = {
    value?: any,
    error?: string,
    isValid?: boolean
}

type Form = {
  picture: Field,
  name: Field,
  hp: Field,
  cp: Field,
  type: Field
}
  
const FighterFormUpdate: FunctionComponent<Props> = ({fighter}) => {
  
    const [form, setForm] = useState<Form>({
        picture : {value: fighter.picture},
        name    : {value: fighter.name, isValid:true},
        hp      : {value: fighter.hp, isValid:true},
        cp      : {value: fighter.cp, isValid:true},
        type   : {value: fighter.type, isValid:true},
    })    
    const history = useHistory();
  
    const types: string[] = [
        'Sayan', 'Namek', 'Pride Toopers', 'Dieu de la destruction', 'Hitman', 'Planet freezer',
        'Cyborg'
    ];

  //  Permet de vérifier si le fighter as déja ce type
  const hasType = (type: string): boolean => {
    return form.type.value === type;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Field = { [fieldName]: { value: fieldValue } };

    setForm({ ...form, ...newField});
  }

  const selectType = (type: string, e: React.ChangeEvent<HTMLInputElement>): void => {
    const checked = e.target.checked;
    let newField: Field;

    if(checked) {
      // Si l'utilisateur coche un type, à l'ajoute à la liste des types du pokémon.
      const newTypes: any = type;
      newField = { value: newTypes };
    } else {
      // Si l'utilisateur décoche un type, on le retire de la liste des types du pokémon.
      const newTypes = form.type.value !== type;
      newField = { value: newTypes };
      return
    }

    setForm({...form, ...{ type: newField }});
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Si nos champs sont valide redirection
    const newFighter = {
      picture: form.picture.value,
      name: form.name.value,
      hp: form.hp.value,
      cp: form.cp.value,
      type: form.type.value
    }
    console.log(newFighter);
    
      FighterService.updateFighter(fighter._id,newFighter).then(() => history.push(`/fighters/${fighter._id}`))
    
  }

  const isTypesValid = (type: string): boolean => {
    // Cas n°1: Le figther a un seul type, qui correspond au type passé en paramètre.
    // Dans ce cas on revoie false, car l'utilisateur ne doit pas pouvoir décoché ce type (sinon le fighter aurait 0 type, ce qui est interdit)
    if (form.type.value == hasType(type)) {
      return false;
    }
    
    // Après avoir passé le test ci-dessus, on renvoie 'true', 
    // c'est-à-dire que l'on autorise l'utilisateur à cocher ou décocher un nouveau type.
    return true;
  }


  const deleteFighter = () => {
    FighterService.deleteFighter(fighter._id)
    .then(() => history.push(`/fighters`))
  }

  
  return (
    <form onSubmit={e => handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable"> 
            <div className="car-image">
              <img src={fighter.picture} alt={fighter.name} style={{width: '200px', marginLeft: '40%'}}/>
              <span className="btn-floating halfway-fab waves-effect waves-light">
                <i onClick={deleteFighter} className="material-icons">delete</i>
              </span>
            </div>
            <div className="card-stacked">
              <div className="card-content">
                {/* fighter image */}
                {/* { isAddForm() && (
                  <div className="form-group">
                    <label htmlFor="picture">Image</label>
                    <input id="picture" name="picture" type="text" className="form-control" value={form.picture.value} onChange={e => handleInputChange(e)}></input>
                    {form.picture.error && 
                    <div className="card-panel red accent-1">
                        {form.picture.error}
                    </div>}
                  </div>    
                )} */}
                {/* fighter name */}
                <div className="form-group">
                  <label htmlFor="name">Nom</label>
                  <input id="name" name="name" type="text" className="form-control" value={form.name.value} onChange={e => handleInputChange(e)}></input>
                  {form.name.error && 
                    <div className="card-panel red accent-1">
                        {form.name.error}
                    </div>
                  }
                </div>
                {/* fighter hp */}
                <div className="form-group">
                  <label htmlFor="hp">Point de vie</label>
                  <input id="hp" name="hp" type="number" className="form-control" value={form.hp.value} onChange={e => handleInputChange(e)}></input>
                  {form.hp.error && 
                    <div className="card-panel red accent-1">
                        {form.hp.error}
                    </div>
                  }
                </div>
                {/* fighter cp */}
                <div className="form-group">
                  <label htmlFor="cp">Dégâts</label>
                  <input id="cp" name="cp" type="number" className="form-control" value={form.cp.value} onChange={e => handleInputChange(e)}></input>
                  {form.cp.error && 
                    <div className="card-panel red accent-1">
                        {form.cp.error}
                    </div>
                  }
                </div>
                {/* fighter types */}
                <div className="form-group">
                  <label>Types</label>
                  {types.map(type => (
                    <div key={type} style={{marginBottom: '10px'}}>
                      <label>
                      {/* disabled={isTypesValid(type)}  */}
                        <input id={type} type="checkbox" className="filled-in" value={type} checked={hasType(type)} onChange={e => selectType(type, e)}></input>
                        <span>
                          <p className={formatType(type)}>{ type }</p>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
                <div className="card-action ">
                    <Link to="/fighters">Retour</Link>
                  </div>
                <div className="center">
                  {/* Submit button */}
                  <button className="btn" type="submit" >Valider</button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
   
export default FighterFormUpdate;