import React from 'react';
import './style.scss'
import FighterList from './pages/fighter-list';
import { Link, Route, HashRouter, Switch } from 'react-router-dom';
import FightersDetail from './pages/fighter-detail';
import PageNotFound from './pages/page-not-found';
import fighterEdit from './pages/fighter-edit';
import FighterAdd from './pages/fighter-add';
import Login from './pages/login';
import PrivateRoute from './PrivateRoute'
 
const App  : React.FC = () => {

    return (
        <HashRouter>
            <div>
                {/* La barre de navigation commune a toutes les pages */}
                <div className="head">
                <Link to="/" className="band-logo center">
                    <img src="https://images4.fanpop.com/image/photos/16100000/An-awesome-looking-DBZ-banner-dragonball-z-movie-characters-16137914-660-276.jpg" alt="logo"/>
                </Link>
                </div>
                {/* Le système de gestion des routes de notre application */}
                <Switch>
                    <PrivateRoute exact path="/" component={FighterList}/>
                    <Route exact path="/login" component={Login}/>
                    <PrivateRoute exact path="/fighters" component={FighterList}/>
                    <PrivateRoute path="/fighter/add" component={FighterAdd}/>
                    <PrivateRoute path="/fighters/edit/:id" component={fighterEdit}/>
                    <PrivateRoute path="/fighters/:id" component={FightersDetail}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </div>
        </HashRouter>
        // <FighterList />
    );
}
  
export default App;