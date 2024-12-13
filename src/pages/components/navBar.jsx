/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from 'react'
import { Menu, Mail, CircleAlert, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import DropDownMenu from './dropDownMenu';

const NavBar = ({ communityCount = 5 }) => {
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className=''>
            <nav className="bg-gradient-to-r from-green-100 to-green-200">
                <div className="container flex flex-wrap items-center justify-between mx-auto px-4 py-2 sm:py-3">
                    <Link to="/home" className="mr-2 sm:mr-4 py-2 sm:py-3 text-lg sm:text-xl font-semibold text-gray-800 hover:text-[#72BF78] transition-colors duration-300">
                        Anony Aid
                    </Link>
                    <div className="flex items-center">
                        <ul className="flex items-center gap-1 sm:gap-2 lg:gap-4">
                            <li>
                                <Link to="/messages" className="flex items-center p-1 sm:p-2 text-gray-600 hover:text-[#72BF78] hover:bg-green-100 rounded-full transition-all duration-300">
                                    <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/alerts" className="flex items-center p-1 sm:p-2 text-gray-600 hover:text-[#72BF78] hover:bg-green-100 rounded-full transition-all duration-300">
                                    <CircleAlert className="h-5 w-5 sm:h-6 sm:w-6" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/notifications" className="flex items-center p-1 sm:p-2 text-gray-600 hover:text-[#72BF78] hover:bg-green-100 rounded-full transition-all duration-300">
                                    <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
                                </Link>
                            </li>
                            <li className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsOpen((prev) => !prev)}
                                    className="flex items-center px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium text-white bg-[#72BF78] rounded-md hover:bg-green-600 transition-colors duration-300">
                                    <Menu className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                                    <span className="hidden sm:block xs:inline">Menu</span>
                                </button>
                                {isOpen && (
                                    <div className="absolute right-0 mt-2 w-48 z-10">
                                        <DropDownMenu />
                                    </div>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <nav className="shadow-md">
                <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
                    <div className="flex justify-center">
                        <ul className="flex flex-wrap justify-center space-x-2 sm:space-x-4 md:space-x-8 text-sm sm:text-md font-medium">
                            <li>
                                <Link to="/home" className="text-gray-600 hover:text-green-600 hover:underline" aria-current="page">Home</Link>
                            </li>
                            <li>
                                <Link to="/home/session" className="text-gray-600 hover:text-[#72BF78] hover:underline">Sessions</Link>
                            </li>
                            <li>
                                <Link to="#" className="text-gray-600 hover:text-[#72BF78] hover:underline">Buy Article</Link>
                            </li>
                            <li className="relative">
                                <Link to="/home/communities" className="text-gray-600 hover:text-[#72BF78] hover:underline">
                                    Communities
                                    <span className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-[#72BF78] text-white text-xs font-bold rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                                        {communityCount}
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;