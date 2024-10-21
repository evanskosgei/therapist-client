/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, Globe, CheckCircle } from 'lucide-react';
import EndPoints from '../Api/endPoints';
import { countryData } from '../utils/data';


const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordsMatch(e.target.value === confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordsMatch(e.target.value === password);
    };

    const handleSubmit =async()=>{
        console.log('submitted')
    }

    return (
        <div className="font-sans bg-gray-100 min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg flex max-w-4xl w-full overflow-hidden">
                <div className="w-2/5 bg-[#72BF78] p-12 hidden lg:block">
                    <h2 className="text-3xl font-bold text-white mb-6">Welcome!</h2>
                    <p className="text-white text-lg mb-8">Create your account and start your journey with us.</p>
                    <ul className="text-white space-y-4">
                        <li className="flex items-center"><CheckCircle className="mr-2 h-5 w-5" /> Simple registration process</li>
                        <li className="flex items-center"><CheckCircle className="mr-2 h-5 w-5" /> Secure and private</li>
                        <li className="flex items-center"><CheckCircle className="mr-2 h-5 w-5" /> Access to exclusive features</li>
                    </ul>
                </div>

                <div className="w-full lg:w-3/5 p-12">
                    <h3 className="text-3xl font-bold text-gray-800 mb-6">Create an Account</h3>

                    <form className="space-y-6">
                        {/* <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
                Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#72BF78] focus:border-[#72BF78] pl-10"
                  placeholder="Enter your name"
                />
                <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div> */}

                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    id="email"
                                    type="email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#72BF78] focus:border-[#72BF78] pl-10"
                                    placeholder="Enter your email"
                                />
                                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="contact">
                                Contact
                            </label>
                            <div className="relative">
                                <input
                                    id="contact"
                                    type="tel"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#72BF78] focus:border-[#72BF78] pl-10"
                                    placeholder="Enter your contact number"
                                />
                                <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="country">
                                Country
                            </label>
                            <div className="relative">
                                <select
                                    id="country"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#72BF78] focus:border-[#72BF78] pl-10 appearance-none"
                                >
                                    {countryData.map((data, index) =>(
                                    // <option value="">Select your country</option>
                                    <option key={index} defaultValue={data.name}>{data.name}</option>
                                    // <option value="uganda">Uganda</option>
                                ))}
                                </select>
                                <Globe className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#72BF78] focus:border-[#72BF78] pl-10 pr-10"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5 text-gray-400" />
                                    ) : (
                                        <Eye className="w-5 h-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-[#72BF78] focus:border-[#72BF78] pl-10 pr-10 ${passwordsMatch ? 'border-gray-300' : 'border-red-500'
                                        }`}
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                />
                                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="w-5 h-5 text-gray-400" />
                                    ) : (
                                        <Eye className="w-5 h-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                            {!passwordsMatch && (
                                <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                            )}
                        </div>

                        <div className="flex items-center">
                            <input
                                id="terms"
                                type="checkbox"
                                className="h-4 w-4 text-[#72BF78] focus:ring-[#72BF78] border-gray-300 rounded"
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                I accept the <a href="#" className="text-[#72BF78] hover:underline">Terms and Conditions</a>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#72BF78] text-white py-2 px-4 rounded-lg hover:bg-[#5da963] transition duration-300"
                        >
                            Create an account
                        </button>
                    </form>

                    <p className="mt-8 text-sm text-gray-600 text-center">
                        Already have an account? <a href="/" className="text-[#72BF78] hover:underline">Sign in</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;