/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Star } from 'lucide-react';

const CheckoutSession = () => {
    const [paymentMethod, setPaymentMethod] = useState('');

    const therapist = {
        username: 'staroneso123',
        city: 'Nairobi',
        country: 'Kenya',
        reviews: 809,
        specialization: 'Marriage Therapy',
        completedSessions: 408,
        hoursPerSession: '2 hours',
        pricePerSession: 200,
        activitySummary: '9 Sessions in last 14 days',
        bio: 'Licensed Marriage and Family Therapist with over 10 years of experience.'
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const renderPaymentDetails = () => {
        switch (paymentMethod) {
            case 'mpesa':
                return (
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">M-Pesa Phone Number</label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg">
                                +254
                            </span>
                            <input
                                type="tel"
                                pattern="[0-9]{9}"
                                placeholder="712345678"
                                maxLength="9"
                                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-none rounded-r-lg focus:ring-2 focus:ring-[#72BF78] focus:border-[#72BF78]"
                            />
                        </div>
                        <p className="text-xs text-gray-500">Enter your M-Pesa registered phone number</p>
                    </div>
                );

            case 'card':
                return (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Card Number</label>
                            <input
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                maxLength="19"
                                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72BF78] focus:border-[#72BF78]"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                                <input
                                    type="text"
                                    placeholder="MM/YY"
                                    maxLength="5"
                                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72BF78] focus:border-[#72BF78]"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">CVV</label>
                                <input
                                    type="text"
                                    placeholder="123"
                                    maxLength="3"
                                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72BF78] focus:border-[#72BF78]"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72BF78] focus:border-[#72BF78]"
                            />
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                    {/* Therapist Header */}
                    <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                        <div className="w-20 h-20 bg-[#72BF78] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                            {therapist.username.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{therapist.username}</h2>
                            <p className="text-lg text-gray-600">
                                {therapist.city}, {therapist.country}
                            </p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="flex items-center space-x-2">
                            <span className="font-medium">Reputation:</span>
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-5 h-5 text-yellow-400"
                                        fill="currentColor"
                                    />
                                ))}
                                <span className="ml-2 text-gray-600">({therapist.reviews})</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="font-medium">Specialization:</span>
                            <span>{therapist.specialization}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="font-medium">Completed Sessions:</span>
                            <span>{therapist.completedSessions}</span>
                        </div>
                    </div>

                    {/* Session Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="flex items-center space-x-2">
                            <span className="font-medium">Hours Per Session:</span>
                            <span>{therapist.hoursPerSession}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="font-medium">Price Per Session:</span>
                            <span className="text-[#72BF78] font-semibold">${therapist.pricePerSession}</span>
                        </div>
                    </div>

                    {/* Activity and Bio */}
                    <div className="space-y-4 mb-8">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Activity: </span>
                                {therapist.activitySummary}
                            </p>
                        </div>
                        <div className="border-t pt-4">
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Bio: </span>
                                {therapist.bio}
                            </p>
                        </div>
                    </div>

                    {/* Session Booking Form */}
                    <div className="border-t pt-8">
                        <h3 className="text-2xl font-bold mb-6">Request For A Session</h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Day of the Week</label>
                                    <select className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg">
                                        <option value="">Select Day</option>
                                        <option value="monday">Monday</option>
                                        <option value="tuesday">Tuesday</option>
                                        <option value="wednesday">Wednesday</option>
                                        <option value="thursday">Thursday</option>
                                        <option value="friday">Friday</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Date for the Session</label>
                                    <input
                                        type="date"
                                        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Time for the Session</label>
                                    <input
                                        type="time"
                                        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                                    <select
                                        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
                                        onChange={handlePaymentMethodChange}
                                        value={paymentMethod}
                                    >
                                        <option value="">Select Payment Method</option>
                                        <option value="mpesa">Mpesa</option>
                                        <option value="card">Credit Card</option>
                                    </select>
                                </div>
                            </div>

                            {/* Conditional Payment Details */}
                            {renderPaymentDetails()}

                            <button
                                type="submit"
                                className="w-full md:w-auto px-6 py-3 bg-[#72BF78] text-white font-medium rounded-lg hover:bg-[#5da962] transition-colors"
                            >
                                Book Session
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSession;