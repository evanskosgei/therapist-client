/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import ImgData from '../../assets/imageData'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react';

const Billing_settings = () => {
    const [divs, setDivs] = useState('all')
    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Billing Settings</h3>
            {divs === 'all' && (
                <div className="">
                    <div className='space-y-4'>
                        <Link onClick={() => setDivs('add-card')} className="flex items-center rounded-md border border-gray-100 bg-white py-3 shadow">
                            <img className="h-10 object-contain pl-4" src={ImgData('visa')} alt="" />
                            <p className="ml-4 w-56">
                                <strong className="block text-lg font-medium">**** **** **** 453 </strong>
                                <strong className="block text-lg font-medium">Stephene K. Wambugu </strong>
                                <span className="text-xs text-gray-400"> Expires on: Dec 2024 </span>
                            </p>
                        </Link>

                        <Link onClick={() => setDivs('paypal')} className="flex items-center rounded-md border border-gray-100 bg-white py-3 shadow">
                            <img className="h-10 object-contain pl-4" src={ImgData('paypal')} alt="" />
                            <p className="ml-4 w-56">
                                <strong className="block text-lg font-medium">stephenwambugu@gmail.com </strong>
                                <span className="text-xs text-gray-400"> Connected on: Apr 2024 </span>
                            </p>
                        </Link>

                        <Link onClick={() => setDivs('mpesa')} className="flex items-center rounded-md border border-gray-100 bg-white py-3 shadow">
                            <img className="h-10 object-contain pl-4" src={ImgData('mpesa')} alt="" />
                            <p className="ml-4 w-56">
                                <strong className="block text-lg font-medium">+254 757657268 </strong>
                                <span className="text-xs text-gray-400"> Connected on: Apr 2024 </span>
                            </p>
                        </Link>
                    </div>
                </div>
            )}
            {divs === 'add-card' && (
                <div className=" mx-auto p-6 rounded-lg">
                    <button
                        onClick={() => setDivs('all')}
                        className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200">
                        <ArrowLeft className="mr-2" size={18} />
                        <span>Back</span>
                    </button>

                    <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-4">Payment Details</h2>

                    <form>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-200 focus:border-green-400 outline-none transition-colors duration-200" placeholder="your.email@example.com" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="card-holder" className="block text-sm font-medium text-gray-700 mb-1">Card Holder</label>
                            <input type="text" id="card-holder" name="card-holder" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-200 focus:border-green-400 outline-none transition-colors duration-200" placeholder="Full name on card" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="card-no" className="block text-sm font-medium text-gray-700 mb-1">Card Details</label>
                            <div className="flex space-x-2">
                                <input type="text" id="card-no" name="card-no" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-200 focus:border-green-400 outline-none transition-colors duration-200" placeholder="1234 5678 9012 3456" />
                                <input type="text" name="credit-expiry" className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-200 focus:border-green-400 outline-none transition-colors duration-200" placeholder="MM/YY" />
                                <input type="text" name="credit-cvc" className="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-200 focus:border-green-400 outline-none transition-colors duration-200" placeholder="CVC" />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="billing-address" className="block text-sm font-medium text-gray-700 mb-1">Billing Address</label>
                            <input type="text" id="billing-address" name="billing-address" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-200 focus:border-green-400 outline-none transition-colors duration-200 mb-2" placeholder="Street Address" />
                            <div className="flex space-x-2">
                                <select name="billing-state" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-200 focus:border-green-400 outline-none transition-colors duration-200">
                                    <option value="">Select State</option>
                                </select>
                                <input type="text" name="billing-zip" className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-200 focus:border-green-400 outline-none transition-colors duration-200" placeholder="ZIP" />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-colors duration-200">
                            Pay Now
                        </button>
                    </form>
                </div>
            )}
            {divs === 'paypal' && (
                <div className=" mx-auto p-6 rounded-lg">
                    <button
                        onClick={() => setDivs('all')}
                        className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200">
                        <ArrowLeft className="mr-2" size={18} />
                        <span>Back</span>
                    </button>
                    <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-4">Payment Details</h2>
                    <button className="w-full mb-6 shadow-lg rounded-lg overflow-hidden transition-all duration-200 hover:shadow-xl">
                        <label className="flex items-center cursor-pointer select-none p-4 bg-white hover:bg-gray-50 transition-colors duration-200">
                            <img className="w-14 h-14 object-contain" src={ImgData('paypal')} alt="PayPal logo" />
                            <div className="ml-5 text-left">
                                <span className="block font-semibold text-gray-800">Connect to PayPal</span>
                                <span className="text-sm text-gray-600">Pay with your PayPal account</span>
                            </div>
                        </label>
                    </button>
                </div>
            )}
            {divs === 'mpesa' && (
                <div className=" mx-auto p-6 rounded-lg">
                    <button
                        onClick={() => setDivs('all')}
                        className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200">
                        <ArrowLeft className="mr-2" size={18} />
                        <span>Back</span>
                    </button>
                    <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-4">Payment Details</h2>
                    <div className="mb-4">
                        <label htmlFor="card-holder" className="block text-sm font-medium text-gray-700 mb-1">Holder Name</label>
                        <input type="text" id="card-holder" name="card-holder" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-200 focus:border-green-400 outline-none transition-colors duration-200" placeholder="Full name on card" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="card-no" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <div className="flex space-x-2">
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-200 focus:border-green-400 outline-none transition-colors duration-200" placeholder="+2547 1234 5678" />
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-colors duration-200">
                        Save Now
                    </button>
                </div>
            )}
        </div>
    )
}

export default Billing_settings;