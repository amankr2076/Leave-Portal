import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet} from 'react-router-dom';

const AdminRoute = ({children}) => {

    const {token} = useSelector((state) => state.auth);
    const { user } = useSelector((state)=>state.profile);

    if(token !== null && user?.role==="admin")
        return <Outlet />
    else if(token !==null && user?.role!=="admin")
        return <Navigate to={"/not-auth"}/>
    else
        return <Navigate to="/login" />

}

export default AdminRoute
