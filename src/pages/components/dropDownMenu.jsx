/* eslint-disable no-unused-vars */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { dropDownMenuData } from './dropDownMenuData'
import { persistor } from '../../redux/store'

const DropDownMenu = () => {
    const menuItems = dropDownMenuData()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await persistor.purge();
        localStorage.clear();
        navigate('/');

    }
    return (
        <div className="z-10 bg-white rounded-lg shadow-lg w-48 flex-grow border border-gray-200">
            <ul className="py-1">
                {menuItems.map((item) => (
                    <li key={item.id}>
                        {item.link ? (
                            <Link
                                to={item.link}
                                className="flex items-center px-4 py-4 text-sm text-gray-700 hover:bg-[#72BF78] hover:text-white transition-colors duration-200"
                            >
                                <item.icon className="w-5 h-5 mr-3" />
                                {item.label}
                            </Link>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="flex items-center w-full px-4 py-4 text-sm text-gray-700 hover:bg-[#72BF78] hover:text-white transition-colors duration-200"
                            >
                                <item.icon className="w-5 h-5 mr-3" />
                                {item.label}
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default DropDownMenu