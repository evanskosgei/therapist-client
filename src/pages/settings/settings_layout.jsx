/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { User, Bell, DollarSign, Settings, Star, Clock, Briefcase, GraduationCap, LocateFixedIcon } from 'lucide-react';
import Profile_settings from './profile_settings';
import Notification_settings from './notification_settings';
import Security_settings from './security_settings';
import Billing_settings from './billing_settings';
import { Link, useNavigate } from 'react-router-dom';
import EndPoints from '../../Api/endPoints';
import { Error } from '../../components/toasts';
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/AuthReducer';

const SettingsLayout = () => {
    const [currentDiv, setCurrentDiv] = useState('profile')
    const [profile, setProfile] = useState([]);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const navItems = [
        { name: 'Profile', icon: User, label:'profile' },
        { name: 'Notifications', icon: Bell, label:'notification' },
        { name: 'Billings', icon: DollarSign, label:'billings' },
        { name: 'Security', icon: Settings, label:'security' },
    ];
    const fetch_user = async () => {
        try {
            const { data } = await EndPoints.setting.profile()
            if (data.status == 200) {
                setProfile(data.user)
            }
        } catch (error) {
            Error(error.response.data.error || error.response.data.message)
        }
    }
    useEffect(() => {
        fetch_user()
    }, [])

    const delete_account=async()=>{
        const {data} = await EndPoints.setting.delete()
        if(data.status == 200){
            dispatch(logout())
            localStorage.removeItem('user')
            sessionStorage.removeItem('token')
            navigate('/')
        }
    }

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
                                src={profile.profile_image || <User/>}
                                alt=""
                            />
                            <h2 className="text-2xl font-bold text-gray-800">{profile.username}</h2>
                            <p className="text-gray-600">Marriage Therapist</p>
                            <button className="w-full py-2 px-4 bg-[#72BF78] text-white rounded-lg hover:bg-[#5fa866] transition duration-300">
                                Edit Profile Image
                            </button>
                        </div>
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center space-x-2 text-gray-600">
                                <Clock className="w-5 h-5" />
                                <span>Member Since {new Date(profile.activation_date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                                <Briefcase className="w-5 h-5" />
                                <span>534 Sessions Completed</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                                <LocateFixedIcon className="w-5 h-5" />
                                <span>Current IP Address {profile.ip_address}</span>
                            </div>
                            <div className="items-center text-gray-600">
                                <p className='text-sm'>This process is irreversible</p>
                                <button onClick={()=>delete_account()} className='text-red-500'>Delete Account</button>
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