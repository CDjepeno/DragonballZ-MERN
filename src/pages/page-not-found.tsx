import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
  
const PageNotFound: FunctionComponent = () => {
  
  return (
    <div className="error">
      <img src="https://secureservercdn.net/50.62.172.113/eb8.ef0.myftpupload.com/wp-content/uploads/2018/08/adidas-dragon-ball-z-majin-buu-1-.jpg" 
           alt="Page non trouvée" style={{width: '30rem', margin: '10px auto'}}/>
      <h1>Hey, cette page n'existe pas !</h1> 
      <Link to="/" className="waves-effect waves-teal btn-flat">
        Retourner à l'accueil
      </Link>
    </div>
  );
}
  
export default PageNotFound;