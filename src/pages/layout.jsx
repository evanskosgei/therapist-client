/* eslint-disable no-unused-vars */
import React from 'react'
import NavBar from './components/navBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className=''>
            <NavBar />
            <div className=" min-h-screen w-full">
                <Outlet />
            </div>
        </div>
    )
}
export default Layout;