import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

function CheckAuth({isAuthenticated,user,children}){
    const location = useLocation();

    // If not authenticated and tries to access other pages rather than /login or /register
    if(!isAuthenticated && !(location.pathname.includes('/login') || location.pathname.includes('/register'))){
        return <Navigate to='/auth/login'/>
    }

    // If the user if authenticated and tries to access /login or /register
    if(isAuthenticated && (location.pathname.includes('/login') || location.pathname.includes('/register'))){
        if(user?.role==="admin"){
            // If its admin
            return <Navigate to='/admin/dashboard'/>
        }else{
            // If its user
            return <Navigate to='/shop/home'/>
        }
    }

    // If user is authenticated and role is not admin and tries to access /admin page
    if(isAuthenticated && user?.role!=='admin' && location.pathname.includes('/admin')){
        return <Navigate to='/unauth-page'/>
    }

    // If user is authenticated and role is admin then he is navigated to /admin page 
    if(isAuthenticated && user?.role==='admin' && location.pathname.includes('/shop')){
        return <Navigate to ='/admin/dashboard'/>    
    }

    return <>{children}</>
}

export default CheckAuth;