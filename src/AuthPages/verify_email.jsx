/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, Mail, Lock, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

const Verify_email = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (values) => {
        console.log(values)
    }
    return (
        <div className="font-sans bg-gray-100 min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg flex max-w-4xl w-full overflow-hidden">
                <div className="w-2/5 bg-[#72BF78] p-12 hidden lg:block">
                    <h2 className="text-3xl font-bold text-white mb-6">Verify Your Email.</h2>
                    <p className="text-white text-lg mb-8">Create your account and start your journey with us.</p>
                    <ul className="text-white space-y-4">
                        <li className="flex items-center"><CheckCircle className="mr-2 h-5 w-5" /> Simple registration process</li>
                        <li className="flex items-center"><CheckCircle className="mr-2 h-5 w-5" /> Secure and private</li>
                        <li className="flex items-center"><CheckCircle className="mr-2 h-5 w-5" /> Access to exclusive features</li>
                    </ul>
                </div>

                <div className="w-full lg:w-3/5 p-12">
                    <h3 className="text-3xl font-bold text-gray-800 mb-6">Verify Your Email</h3>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                                OTP
                            </label>
                            <div className="relative">
                                <input
                                    id="email"
                                    type="email"
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-[#72BF78] focus:border-[#72BF78] pl-10 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter your email"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Invalid email address'
                                        }
                                    })}
                                />
                                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                            )}
                        </div>                      
                        <button
                            type="submit"
                            className="w-full bg-[#72BF78] text-white py-2 px-4 rounded-lg hover:bg-[#5da963] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                            Verify Email
                        </button>
                    </form>

                    <p className="mt-8 text-sm text-gray-600 text-center">
                        Already have an account? <a href="/" className="text-[#72BF78] hover:underline">Sign in</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Verify_email