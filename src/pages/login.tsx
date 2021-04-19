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
  const [message, setMessage] = useState<string>('Veuillez vous connecté');
  const { setIsAuthenticatedUser} = useContext(context)
  const { setIsAuthenticatedManager} = useContext(context)
  
  const history = useHistory();
  
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField = { [fieldName]:  fieldValue  };

    setForm({ ...form, ...newField});
  }

  const handleSubmit = async(e: any) => {
    e.preventDefault();
    
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