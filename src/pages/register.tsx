import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';

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

export const Register: React.FC<RouteComponentProps> = ( { match } ) => {
    const [form, setForm] = useState<Form>({
        email: "",
        password: ""
    });
    const [message, setMessage] = useState<string>('Veuillez vous enregistrer');

    const handleSubmit = () => {

    }

    const handleInp

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
    )
}