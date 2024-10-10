/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import { dropDownMenuData } from './dropDownMenuData'

const DropDownMenu = () => {
    const menuItems = dropDownMenuData()
    return (
        <div className="z-10 bg-white rounded-lg shadow-lg w-48 flex-grow border border-gray-200">
            <ul className="py-1">
                {menuItems.map((item) => (
                    <li key={item.id}>
                        <Link
                            to={item.link}
                            className="flex items-center px-4 py-4 text-sm text-gray-700 hover:bg-[#72BF78] hover:text-white transition-colors duration-200">
                            <item.icon className="w-5 h-5 mr-3" />
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DropDownMenu;