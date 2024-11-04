/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, Globe, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import EndPoints from '../Api/endPoints';
import { countryData } from '../utils/data';
import { Success, Error } from '../components/toasts';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [ip, setIp] = useState([]);
    const navigate = useNavigate();

    const getIp = async () => {
        const response = await fetch("https://ipapi.co/json/")
        const data = await response.json()
        setIp(data.ip)
    }

    useEffect(() => {
        getIp()
    }, [])

    const { register, handleSubmit, watch, formState: { errors }, setError, } = useForm({
        defaultValues: {
            email: '',
            contact: '',
            country: '',
            password: '',
            confirmPassword: '',
            ip_address: '',
            terms: false
        }
    });

    const password = watch('password');
    const onSubmit = async (values) => {
        try {
            setIsSubmitting(true);
            if (values.password !== values.confirmPassword) {
                setError('confirmPassword', {
                    type: 'match',
                    message: 'Passwords do not match'
                });
                return;
            }
            const { data } = await EndPoints.Auth.signup({
                username: values.username,
                email: values.email,
                contact: values.contact,
                country: values.country,
                password: values.password,
                ip_address: ip
            })
            if (data.status == 200) {
                Success(data.message)
                localStorage.setItem('email', values.email);
                navigate('/verification')
            }
        } catch (errors) {
            console.log(errors)
            Error(errors.response.data.error || errors.response.data.message)
        } finally {
            setIsSubmitting(false);
        }
    };

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

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                                User Name
                            </label>
                            <div className="relative">
                                <input
                                    id="username"
                                    type="text"
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-[#72BF78] focus:border-[#72BF78] pl-10 ${errors.username ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter your User name"
                                    {...register('username', {
                                        required: 'User name is required',
                                    })}
                                />
                                <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                            {errors.username && (
                                <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                                Email Address
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

                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="contact">
                                Contact
                            </label>
                            <div className="relative">
                                <input
                                    id="contact"
                                    type="tel"
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-[#72BF78] focus:border-[#72BF78] pl-10 ${errors.contact ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter your contact number"
                                    {...register('contact', {
                                        required: 'Contact number is required',
                                        pattern: {
                                            value: /^[0-9+\-\s()]{8,}$/,
                                            message: 'Invalid phone number'
                                        }
                                    })}
                                />
                                <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                            {errors.contact && (
                                <p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="country">
                                Country
                            </label>
                            <div className="relative">
                                <select
                                    id="country"
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-[#72BF78] focus:border-[#72BF78] pl-10 appearance-none ${errors.country ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    {...register('country', { required: 'Please select a country' })}
                                >
                                    <option value="">Select your country</option>
                                    {countryData.map((data, index) => (
                                        <option key={index} value={data.name}>{data.name}</option>
                                    ))}
                                </select>
                                <Globe className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                            {errors.country && (
                                <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-[#72BF78] focus:border-[#72BF78] pl-10 pr-10 ${errors.password ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter your password"
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 8,
                                            message: 'Password must be at least 8 characters'
                                        },
                                        pattern: {
                                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
                                            message: 'Password must contain at least one letter and one number'
                                        }
                                    })}
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
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-[#72BF78] focus:border-[#72BF78] pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Confirm your password"
                                    {...register('confirmPassword', {
                                        required: 'Please confirm your password',
                                        validate: value => value === password || 'Passwords do not match'
                                    })}
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
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <div className="flex items-center">
                            <input
                                id="terms"
                                type="checkbox"
                                className={`h-4 w-4 text-[#72BF78] focus:ring-[#72BF78] rounded ${errors.terms ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                {...register('terms', {
                                    required: 'You must accept the terms and conditions'
                                })}
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                I accept the <a href="#" className="text-[#72BF78] hover:underline">Terms and Conditions</a>
                            </label>
                        </div>
                        {errors.terms && (
                            <p className="text-red-500 text-xs mt-1">{errors.terms.message}</p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-[#72BF78] text-white py-2 px-4 rounded-lg hover:bg-[#5da963] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Creating account...' : 'Create an account'}
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