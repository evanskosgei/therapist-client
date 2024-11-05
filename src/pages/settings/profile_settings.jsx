/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import EndPoints from '../../Api/endPoints';
import { Success, Error } from '../../components/toasts';

const Profile_settings = () => {
    const [profile, setProfile] = useState([]);
    const [formData, setFormData] = useState({
        username: '',
        contact: '',
        email: '',
        bio: '',
        country: ''
    });

    const fetch_user = async () => {
        try {
            const { data } = await EndPoints.setting.profile();
            if (data.status === 200) {
                setProfile(data.user);
                setFormData({
                    username: data.user.username || '',
                    contact: data.user.contact || '',
                    email: data.user.email || '',
                    bio: data.user.bio || '',
                    country: data.user.country || ''
                });
            }
        } catch (error) {
            Error(error.response?.data.error || error.response?.data.message);
        }
    };
    useEffect(() => {
        fetch_user()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await EndPoints.setting.update_profile(formData);
            if (data.status === 200) {
                Success(data.message);
                fetch_user();
            }
        } catch (errors) {
            Error(errors.response?.data.error || errors.response?.data.message);
        }
    };

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Client Information</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">User Name</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#72BF78] focus:ring focus:ring-[#72BF78] focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact</label>
                        <input
                            type="text"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#72BF78] focus:ring focus:ring-[#72BF78] focus:ring-opacity-50"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#72BF78] focus:ring focus:ring-[#72BF78] focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                        rows="2"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#72BF78] focus:ring focus:ring-[#72BF78] focus:ring-opacity-50"
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#72BF78] focus:ring focus:ring-[#72BF78] focus:ring-opacity-50"
                    />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="py-2 px-4 bg-[#72BF78] text-white rounded-lg hover:bg-[#5fa866] transition duration-300">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Profile_settings;