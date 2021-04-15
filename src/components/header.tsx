import React, { FunctionComponent, useState, useEffect, useContext } from 'react'
import { RouteComponentProps, Link, useHistory } from 'react-router-dom'
import { Box, Button } from '@material-ui/core'
import AuthenticationService from '../services/authentication-service'
import context from '../context/context'


export const Header: React.FC = ( ) => {
    const {isAuthenticatedUser, setIsAuthenticatedUser} = useContext(context)
    const history = useHistory();

    const handleLogout = async() => {
        await AuthenticationService.logout()
        setIsAuthenticatedUser(false)
        history.replace('/')
    }    

    return (<>
        {/* La barre de navigation commune a toutes les pages */}
        <div className="head">
            <Link to="/fighters" className="band-logo center">
                <img src="https://images4.fanpop.com/image/photos/16100000/An-awesome-looking-DBZ-banner-dragonball-z-movie-characters-16137914-660-276.jpg" alt="logo"/>
            </Link>
            {isAuthenticatedUser &&
                <Link to="/logout" className="band-logo right">
                    <Box>
                        <Button onClick={handleLogout} color="secondary" variant="contained">Logout</Button>
                    </Box>
                </Link>
            }
        </div>
    </>)
}