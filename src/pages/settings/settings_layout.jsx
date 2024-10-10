/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { User, Bell, DollarSign, Settings, Star, Clock, Briefcase, GraduationCap } from 'lucide-react';
import Profile_settings from './profile_settings';
import Notification_settings from './notification_settings';
import Security_settings from './security_settings';
import Billing_settings from './billing_settings';
import { Link } from 'react-router-dom';

const SettingsLayout = () => {
    const [currentDiv, setCurrentDiv] = useState('profile')
    const navItems = [
        { name: 'Profile', icon: User, label:'profile' },
        { name: 'Notifications', icon: Bell, label:'notification' },
        { name: 'Billings', icon: DollarSign, label:'billings' },
        { name: 'Security', icon: Settings, label:'security' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <nav className="flex justify-between overflow-x-auto border-b p-4 bg-[#72BF78] text-white">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            onClick={()=>setCurrentDiv(item.label)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out ${item.name === navItems.label
                                    ? 'bg-white text-[#72BF78]'
                                    : 'hover:bg-[#5fa866]'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 p-6 rounded-xl border border-gray-200">
                        <div className="flex flex-col items-center space-y-4">
                            <img
                                className="w-32 h-32 rounded-full border-4 border-[#72BF78]"
                                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                                alt="Tutor profile"
                            />
                            <h2 className="text-2xl font-bold text-gray-800">Jane Ferguson</h2>
                            <p className="text-gray-600">Marriage Therapist</p>
                            <button className="w-full py-2 px-4 bg-[#72BF78] text-white rounded-lg hover:bg-[#5fa866] transition duration-300">
                                Edit Profile Image
                            </button>
                        </div>
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center space-x-2 text-gray-600">
                                <Clock className="w-5 h-5" />
                                <span>Member since 2024</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                                <Briefcase className="w-5 h-5" />
                                <span>534 Sessions Completed</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                                <GraduationCap className="w-5 h-5" />
                                <span>Ph.D. in Health And Psychology, MIT</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 p-6 rounded-xl border border-gray-200">
                        {currentDiv === 'profile' && (
                            <Profile_settings />
                        )}
                        {currentDiv === 'notification' && (
                            <Notification_settings />
                        )}
                        {currentDiv === 'billings' && (
                            <Billing_settings />
                        )}
                         {currentDiv === 'security' && (
                            <Security_settings />
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsLayout;