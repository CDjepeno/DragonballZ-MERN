import React from 'react';
import './style.scss'
import FighterList from './pages/fighter-list';
import { Link, Route, HashRouter, Switch } from 'react-router-dom';
import FightersDetail from './pages/fighter-detail';
import PageNotFound from './pages/page-not-found';
import fighterEdit from './pages/fighter-edit';
 
const App  : React.FC = () => {

    return (
        <HashRouter>
            <div>
                {/* La barre de navigation commune a toutes les pages */}
                <nav>
                    <div className="nav-wrapper teal">
                        <Link to="/" className="band-logo center">Fighter</Link>
                    </div>
                </nav>
                {/* Le système de gestion des routes de notre application */}
                <Switch>
                    <Route exact path="/" component={FighterList}/>
                    <Route exact path="/fighters" component={FighterList}/>
                    <Route  path="/fighters/edit/:id" component={fighterEdit}/>
                    <Route  path="/fighters/:id" component={FightersDetail}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </div>
        </HashRouter>
        // <FighterList />
    );
}
  
export default App;