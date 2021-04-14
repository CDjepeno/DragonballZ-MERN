import React , {useState} from 'react';
import './style.scss'
import FighterList from './pages/fighter-list';
import { Link, Route, HashRouter, Switch } from 'react-router-dom';
import FightersDetail from './pages/fighter-detail';
import PageNotFound from './pages/page-not-found';
import fighterEdit from './pages/fighter-edit';
import FighterAdd from './pages/fighter-add';
import Login from './pages/login';
import {PrivateRouteAll} from './components/privateRouteAll'
import {PrivateRouteManager} from './components/privateRouteManager'
import AuthenticationService from './services/authentication-service';
import context from './context/context';
import { Header } from './components/header';


AuthenticationService.setup()
 
const App  : React.FC = () => {
    const [isAuthenticatedManager,setIsAuthenticatedManager] = useState(AuthenticationService.isAuthenticatedManager)
    const [isAuthenticatedUser,setIsAuthenticatedUser] = useState(AuthenticationService.isAuthenticatedUser)
    

    const contextValue = {
        isAuthenticatedUser,
        setIsAuthenticatedUser,
        isAuthenticatedManager,
        setIsAuthenticatedManager
    }

    return (<>
        <context.Provider value={contextValue}>
            <HashRouter>
                <div>
                    <Header />
                    {/* Le système de gestion des routes de notre application */}
                    <Switch>
                        <PrivateRouteAll  path="/fighters" component={FighterList}/>
                        <PrivateRouteManager path="/fighter/add" component={FighterAdd}/>
                        <PrivateRouteManager path="/fighters/edit/:id" component={fighterEdit}/>
                        <PrivateRouteAll path="/fighters/:id" component={FightersDetail}/>
                        <Route exact path="/" component={Login}/>
                        <Route component={PageNotFound}/>
                    </Switch>
                </div>
            </HashRouter>
        </context.Provider>
    </>);
}
  
export default App;