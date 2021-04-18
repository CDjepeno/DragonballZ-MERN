import React, { useState } from 'react';
import formatType from '../helpers/format-type';
import { Link, useHistory } from 'react-router-dom'
import FighterService from '../services/fighter-service';
import { Fighter } from '../pages/fighter-list';

  
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

type Props = {
  fighter?: Fighter,
  isEditForm?: boolean
}
  
const FighterFormAdd: React.FC<Props> = ({fighter, isEditForm}) => {
  
  const [form, setForm] = useState<Form>({
      picture : {value: ""},
      name    : {value: ""},
      hp      : {value: 0},
      cp      : {value: 0},
      type   : {value: ""}
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
    const newField: Field = { [fieldName]: {value: fieldValue} };

    setForm({ ...form, ...newField});
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const Fighter = {
      picture: form.picture.value,
      name: form.name.value,
      hp: form.hp.value,
      cp: form.cp.value,
      type: form.type.value
    }

    FighterService.addFighter(Fighter).then(() => history.push('/fighters'));
  }


  const selectType = (type: string, e: React.ChangeEvent<HTMLInputElement>): void => {   
    
    const checked = e.target.checked;
    let newField: Field;

    if(checked) {
      // Si l'utilisateur coche un type, à l'ajoute à la liste des types du fighter.
      
      const newTypes: any = type;
      newField = { value: newTypes };
    } else {
      // Si l'utilisateur décoche un type, on le retire de la liste des types du pokémon.
      const newTypes = form.type.value !== type;
      newField = { value: newTypes };
      return
    }

    setForm({...form, type: newField });
  }

  
  return (
    <form onSubmit={e => handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable"> 
            <div className="card-stacked">
              <div className="card-content">
                {/* fighter image */}                
                  <div className="form-group">
                    <label htmlFor="picture">Image</label>
                    <input id="picture" name="picture" type="text" className="form-control" value={form.picture.value} onChange={e => handleInputChange(e)}></input>
                  </div>    
                {/* fighter name */}
                <div className="form-group">
                  <label htmlFor="name">Nom</label>
                  <input id="name" name="name" type="text" className="form-control" value={form.name.value} onChange={e => handleInputChange(e)}></input>
                </div>
                {/* fighter hp */}
                <div className="form-group">
                  <label htmlFor="hp">Point de vie</label>
                  <input id="hp" name="hp" type="number" className="form-control" value={form.hp.value} onChange={e => handleInputChange(e)}></input>
                </div>
                {/* fighter cp */}
                <div className="form-group">
                  <label htmlFor="cp">Dégâts</label>
                  <input id="cp" name="cp" type="number" className="form-control" value={form.cp.value} onChange={e => handleInputChange(e)}></input>
                </div>
                {/* fighter types */}
                <div className="form-group">
                  <label>Types</label>
                  {types.map(type => (
                    <div key={type} style={{marginBottom: '10px'}}>
                      <label>
                        <input id={type} type="checkbox" className="filled-in" onChange={e => selectType(type, e)}  value={type} checked={hasType(type)} ></input>
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
   
export default FighterFormAdd;