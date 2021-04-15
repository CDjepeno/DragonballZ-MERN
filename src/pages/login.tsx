import React, { FunctionComponent, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../context/context';
import AuthenticationService from '../services/authentication-service';

type Field = {
  value?: any,
  error?: string,
  isValid?: boolean
};

type Form = {
  email: any,
  password: any
  error?: any,
  isValid?: any
}

const Login: FunctionComponent = () => {

  
  const [form, setForm] = useState<Form>({
    email: "" ,
    password:"",
  });
  const [message, setMessage] = useState<string>('Vous êtes déconnecté');
  const {isAuthenticatedUser, setIsAuthenticatedUser} = useContext(context)
  const {isAuthenticatedManager, setIsAuthenticatedManager} = useContext(context)
  
  const history = useHistory();
  
  const validateForm = () => {
    let newForm: Form = form;

    // Validator email
    if(form.email.length < 3) {
      const errorMsg: string = 'Votre prénom doit faire au moins 3 caractères de long.';
      const newField: Field = { value: form.email, error: errorMsg, isValid: false };
      newForm = { ...newForm, ...{ username: newField } };
    } else {
      const newField: Field = { value: form.email, error: '', isValid: true };
      newForm = { ...newForm, ...{ username: newField } };
    }

    // Validator password
    if(form.password.length < 6) {
      const errorMsg: string = 'Votre mot de passe doit faire au moins 6 caractères de long.';
      const newField: Field = {value: form.password, error: errorMsg, isValid: false};
      newForm = { ...newForm, ...{ password: newField } };
    } else {
      const newField: Field = { value: form.password, error: '', isValid: true };
      newForm = { ...newForm, ...{ password: newField } };
    }

    setForm(newForm);

    return newForm.email.isValid && newForm.password.isValid;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField = { [fieldName]:  fieldValue  };

    setForm({ ...form, ...newField});
  }

  const handleSubmit = async(e: any) => {
    e.preventDefault();
    
    const isFormValid = validateForm();
    
    try {
      await AuthenticationService.login(form)
      setMessage('👉 Tentative de connexion en cours ...')
      setIsAuthenticatedUser(true)
      
      const isAuthenticatedM =  await AuthenticationService.isAuthenticatedManager
  
      setIsAuthenticatedManager(isAuthenticatedM)
  
      history.replace('/fighters');
    } catch (err) {
      setMessage(err.response.data.message)
      
    }
  
    
      
      
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable">
            <div className="card-stacked">
              <div className="card-content">
                {/* Form message */}
                {message && <div className="form-group">
                  <div className="card-panel grey lighten-5">
                    {message}
                  </div>
                </div>}
                {/* Field email */}
                <div className="form-group">
                  <label htmlFor="email">Identifiant</label>
                  <input 
                    id="email" 
                    type="email" 
                    name="email" 
                    placeholder="Votre email"
                    className="form-control" 
                    value={form.email} 
                    onChange={e => handleInputChange(e)}
                  ></input>
                  {/* error */}
                  {form.email.error &&
                  <div className="card-panel red accent-1"> 
                   {form.email.error} 
                  </div>} 
                </div>
                {/* Field password */}
                <div className="form-group">
                  <label htmlFor="password">Mot de passe</label>
                  <input 
                    id="password" 
                    type="password" 
                    name="password" 
                    placeholder="votre mot de passe"
                    className="form-control" 
                    value={form.password.value} 
                    onChange={e => handleInputChange(e)}
                  ></input>
                  {/* error */}
                  {form.password.error &&
                  <div className="card-panel red accent-1"> 
                   {form.password.error} 
                  </div>} 
                </div>
              </div>
              <div className="card-action center">
                {/* Submit button */}
                <button type="submit" className="btn">Valider</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
 
export default Login;