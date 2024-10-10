/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Shield } from 'lucide-react';

const Security_settings = () => {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [twoFactor, setTwoFactor] = useState(false);

    const togglePasswordVisibility = (setter) => {
        setter(prev => !prev);
    };
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                <Lock className="w-6 h-6 mr-2 text-[#72BF78]" />
                Security Settings
            </h3>
            <form className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Old Password</label>
                    <div className="relative">
                        <input
                            type={showOldPassword ? "text" : "password"}
                            className="p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#72BF78] focus:ring focus:ring-[#72BF78] focus:ring-opacity-50"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            onClick={() => togglePasswordVisibility(setShowOldPassword)}
                        >
                            {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <div className="relative">
                        <input
                            type={showNewPassword ? "text" : "password"}
                            className="p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#72BF78] focus:ring focus:ring-[#72BF78] focus:ring-opacity-50"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            onClick={() => togglePasswordVisibility(setShowNewPassword)}
                        >
                            {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#72BF78] focus:ring focus:ring-[#72BF78] focus:ring-opacity-50"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            onClick={() => togglePasswordVisibility(setShowConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-between border-t border-b border-gray-200 py-4">
                    <div className="flex items-center">
                        <Shield className="w-6 h-6 mr-2 text-[#72BF78]" />
                        <span className="text-sm font-medium text-gray-700">Two-Factor Authentication</span>
                    </div>
                    <label className="flex items-center cursor-pointer">
                        <div className="relative">
                            <input
                                type="checkbox"
                                className="sr-only"
                                checked={twoFactor}
                                onChange={() => setTwoFactor(!twoFactor)}
                            />
                            <div className={`block w-14 h-8 rounded-full ${twoFactor ? 'bg-[#72BF78]' : 'bg-gray-300'}`}></div>
                            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${twoFactor ? 'transform translate-x-6' : ''}`}></div>
                        </div>
                    </label>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="py-2 px-6 bg-[#72BF78] text-white rounded-lg hover:bg-[#5fa866] transition duration-300">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Security_settings