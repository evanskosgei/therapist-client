/* eslint-disable no-unused-vars */
import React from 'react'

const Profile_settings = () => {
    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Client Information</h3>
            <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
                        <input type="text" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#72BF78] focus:ring focus:ring-[#72BF78] focus:ring-opacity-50" defaultValue="Stephene" />
                    </div>
                    <div>
                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input type="text" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#72BF78] focus:ring focus:ring-[#72BF78] focus:ring-opacity-50" defaultValue="Wambugu" />
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#72BF78] focus:ring focus:ring-[#72BF78] focus:ring-opacity-50" defaultValue="stephe.Wambugu@example.com" />
                </div>
                <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea rows="4" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#72BF78] focus:ring focus:ring-[#72BF78] focus:ring-opacity-50" defaultValue="I'm a passionate therapist with over 10 years of experience in Health and Medical fields. My goal is to make you feel good and mentally stable."></textarea>
                </div>
                <div>
                    <label htmlFor="hourly_rate" className="block text-sm font-medium text-gray-700">Hourly Rate ($)</label>
                    <input type="number" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#72BF78] focus:ring focus:ring-[#72BF78] focus:ring-opacity-50" defaultValue="50" />
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