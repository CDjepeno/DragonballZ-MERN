import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import AuthContext from '../context/context'

type Props = {
    path: any,
    component: any,
    exact: any
}

export const PrivateRouteAll:React.FC<Props> = ( { path, component } ) => {
    const { isAuthenticatedUser } = useContext(AuthContext)
    const { isAuthenticatedManager } = useContext(AuthContext)
    return isAuthenticatedManager || isAuthenticatedUser ? (<Route path={path} component={component}/>) : (<Redirect to='/' />)
}