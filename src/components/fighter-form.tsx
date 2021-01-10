import React, { FunctionComponent, useState } from 'react';
import fighter from '../models/fighter';
import formatType from '../helpers/format-type';
import { useHistory } from 'react-router-dom'
import FighterService from '../services/fighter-service';

  
type Props = {
  fighter: fighter
  isEditForm: boolean
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
  types: Field
}
  
const FighterForm: FunctionComponent<Props> = ({fighter, isEditForm}) => {

    const [form, setForm] = useState<Form>({
        picture: {value: fighter.picture},
        name: {value: fighter.name, isValid:true},
        hp: {value: fighter.hp, isValid:true},
        cp: {value: fighter.cp, isValid:true},
        types: {value: fighter.types, isValid:true},
    })

    const history = useHistory();

  
    const types: string[] = [
        'Sayan', 'Namek', 'Pride Toopers', 'Dieu de la destruction', 'Hitman', 'Planet freezer',
        'Cyborg'
    ];

  const hasType = (type: string): boolean => {
    return form.types.value.includes(type);
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
      const newTypes: string[] = form.types.value.concat([type]);
      newField = { value: newTypes };
    } else {
      // Si l'utilisateur décoche un type, on le retire de la liste des types du pokémon.
      const newTypes: string[] = form.types.value.filter((currentType: string) => currentType !== type);
      newField = { value: newTypes };
    }

    setForm({...form, ...{ types: newField }});
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isForValid = validateForm();

    // Si nos champs sont valide redirection
    if(isForValid) {
        fighter.picture = form.picture.value;
        fighter.name = form.name.value;
        fighter.hp = form.hp.value;
        fighter.cp = form.cp.value;
        fighter.types = form.types.value;

       isEditForm ? updateFighter() : addFigther();
    }
  }

  const isAddForm = () => {
    return !isEditForm;
  }

  const validateForm = () => {
    let newForm: Form = form;

    // Validator url
    if(isAddForm()) {
      const start = "https://";
      // const end  = ".png";
      // || !form.picture.value.endWith(end)
      if(!form.picture.value.startsWith(start) ) {
        const errorMsg: string = "L'url n'est pas valide.";
        const newField: Field = { value: form.picture.value, error: errorMsg, isValid: false};
        newForm = { ...form, ...{picture: newField } };
      } else {
        const newField: Field = { value: form.picture.value, error: "", isValid: false};
        newForm = { ...form, ...{ picture: newField } };
      }
    }

    // Validator name
    if(!/^[a-zA-Zàéè ]{3,25}$/.test(form.name.value)) {
      const errorMsg: string = 'Le nom du fighter est requis (1-25).';
      const newField: Field = { value: form.name.value, error: errorMsg, isValid: false };
      newForm = { ...newForm, ...{ name: newField } };
    } else {
      const newField: Field = { value: form.name.value, error: '', isValid: true };
      newForm = { ...newForm, ...{ name: newField } };
    }

    // Validator hp
    if(!/^[0-9]{1,3}$/.test(form.hp.value)) {
      const errorMsg: string = 'Les points de vie du fighter sont compris entre 0 et 999.';
      const newField: Field = {value: form.hp.value, error: errorMsg, isValid: false};
      newForm = { ...newForm, ...{ hp: newField } };
    } else {
      const newField: Field = { value: form.hp.value, error: '', isValid: true };
      newForm = { ...newForm, ...{ hp: newField } };
    }

    // Validator cp
    if(!/^[0-9]{1,2}$/.test(form.cp.value)) {
      const errorMsg: string = 'Les dégâts du fighter sont compris entre 0 et 99';
      const newField: Field = {value: form.cp.value, error: errorMsg, isValid: false};
      newForm = { ...newForm, ...{ cp: newField } };
    } else {
      const newField: Field = { value: form.cp.value, error: '', isValid: true };
      newForm = { ...newForm, ...{ cp: newField } };
    }

    setForm(newForm);
    return newForm.name.isValid && newForm.hp.isValid && newForm.cp.isValid;
  }

  const isTypesValid = (type: string): boolean => {
    // Cas n°1: Le figther a un seul type, qui correspond au type passé en paramètre.
    // Dans ce cas on revoie false, car l'utilisateur ne doit pas pouvoir décoché ce type (sinon le pokémon aurait 0 type, ce qui est interdit)
    if (form.types.value.length === 1 && hasType(type)) {
      return false;
    }
    
    // Cas n°1: Le figther a au moins 3 types.
    // Dans ce cas il faut empêcher à l'utilisateur de cocher un nouveau type, mais pas de décocher les types existants.
    if (form.types.value.length >= 3 && !hasType(type)) { 
      return false; 
    } 
    
    // Après avoir passé les deux tests ci-dessus, on renvoie 'true', 
    // c'est-à-dire que l'on autorise l'utilisateur à cocher ou décocher un nouveau type.
    return true;
  }

  const addFigther = () => {
    FighterService.addFighter(fighter).then(() => history.push('/fighters'));
  }

  const updateFighter = () => {
    FighterService.updateFighter(fighter).then(() => history.push(`/fighters/${fighter.id}`));
  }

  const deleteFighter = () => {
    FighterService.deleteFighter(fighter)
    .then(() => history.push(`/fighters`))
  }

  
  return (
    <form onSubmit={e => handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable"> 
          { isEditForm && (
              <div className="car-image">
                <img src={fighter.picture} alt={fighter.name} style={{width: '200px', marginLeft: '40%'}}/>
                <span className="btn-floating halfway-fab waves-effect waves-light">
                  <i onClick={deleteFighter} className="material-icons">delete</i>
                </span>
              </div>
          )}
            <div className="card-stacked">
              <div className="card-content">
                {/* fighter image */}
                { isAddForm() && (
                  <div className="form-group">
                    <label htmlFor="picture">Image</label>
                    <input id="picture" name="picture" type="text" className="form-control" value={form.picture.value} onChange={e => handleInputChange(e)}></input>
                    {form.picture.error && 
                    <div className="card-panel red accent-1">
                        {form.picture.error}
                    </div>}
                  </div>    
                )}
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
                        <input id={type} type="checkbox" className="filled-in" disabled={!isTypesValid(type)} value={type} checked={hasType(type)} onChange={e => selectType(type, e)}></input>
                        <span>
                          <p className={formatType(type)}>{ type }</p>
                        </span>
                      </label>
                    </div>
                  ))}
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
   
export default FighterForm;