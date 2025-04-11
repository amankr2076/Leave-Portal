import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet} from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const {token} = useSelector((state) => state.auth);

    if(token !== null)
        return <Outlet />
    else
        return <Navigate to="/login" />

}

export default PrivateRoute
