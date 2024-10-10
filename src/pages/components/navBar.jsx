/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
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
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <Link to="/home" className="mr-4 py-3 text-xl font-semibold text-gray-800 hover:text-[#72BF78] transition-colors duration-300">
                        Anony Aid
                    </Link>
                    <div className="flex items-center">
                        <ul className="flex items-center gap-2 lg:gap-4">
                            <li>
                                <Link to="/messages" className="flex items-center p-2 text-gray-600 hover:text-[#72BF78] hover:bg-green-100 rounded-full transition-all duration-300">
                                    <Mail className="h-6 w-6" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/alerts" className="flex items-center p-2 text-gray-600 hover:text-[#72BF78] hover:bg-green-100 rounded-full transition-all duration-300">
                                    <CircleAlert className="h-6 w-6" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/notifications" className="flex items-center p-2 text-gray-600 hover:text-[#72BF78] hover:bg-green-100 rounded-full transition-all duration-300">
                                    <Bell className="h-6 w-6" />
                                </Link>
                            </li>
                            <li className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsOpen((prev) => !prev)}
                                    className="flex items-center px-3 py-2 text-sm font-medium text-white bg-[#72BF78] rounded-md hover:bg-green-600 transition-colors duration-300">
                                    <Menu className="h-5 w-5 mr-2" />
                                    <span>Menu</span>
                                </button>
                                {isOpen && (
                                    <div className="absolute right-2 mt-2">
                                        <DropDownMenu />
                                    </div>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <nav className="shadow-md">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-center">
                        <ul className="flex flex-wrap justify-center space-x-8 text-md font-medium">
                            <li>
                                <a href="/home" className="text-gray-600 hover:text-green-600 hover:underline" aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="/home/session" className="text-gray-600 hover:text-[#72BF78] hover:underline">Sessions</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-[#72BF78] hover:underline">Buy Article</a>
                            </li>
                            <li className="relative">
                                <a href="/home/communities" className="text-gray-600 hover:text-[#72BF78] hover:underline">
                                    Communities
                                    <span className="absolute -top-3 -right-3 bg-[#72BF78] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {communityCount}
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;