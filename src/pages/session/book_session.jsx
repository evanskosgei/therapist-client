/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { therapyCategories } from '../../utils/bookingData';
import { countryData } from '../../utils/data';
import { Link } from 'react-router-dom';

const BookSession = () => {
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [therapist, setTherapist] = useState('');

    const therapists = [
        {
            id:1,
            name: "Simon Lewis",
            category: "Marriage Therapy",
            location: "Nairobi, KE",
            rating: 5,
            price: 200
        },
        {
            id:2,
            name: "Stephene Masha",
            category: "Sex Therapy",
            location: "London, UK",
            rating: 4,
            price: 600
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log({ category, location, date, time, therapist });
    };

    return (
        <div className="bg-gray-50 min-h-full space-y-4 p-4 sm:p-8">
            <main className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
                <div className="bg-[#72BF78] p-4 sm:p-8 text-white">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">Book Your Therapy Session</h1>
                    <p className="text-gray-100">Find the perfect therapist for your needs</p>
                </div>
                <form className="p-4 sm:p-8">
                    <div className="grid gap-4 sm:gap-6 mb-6 sm:mb-8 grid-cols-1 sm:grid-cols-2">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Therapy Category</label>
                            <div className="relative">
                                <select
                                    className="w-full p-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#72BF78] focus:border-[#72BF78]"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">Select Category</option>
                                    {therapyCategories.map((cat, index) => (
                                        <option key={index} value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Therapist Location</label>
                            <div className="relative">
                                <select
                                    className="w-full p-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#72BF78] focus:border-[#72BF78]"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                >
                                    <option value="">Select Location</option>
                                    {countryData.map((country, index) => (
                                        <option key={index} value={country.name}>{country.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Date</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    className="w-full p-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#72BF78] focus:border-[#72BF78]"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Time</label>
                            <div className="relative">
                                <input
                                    type="time"
                                    className="w-full p-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#72BF78] focus:border-[#72BF78]"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    min="06:00"
                                    max="18:00"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-6 sm:mb-8">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Preferred Therapist (Optional)</label>
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full p-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#72BF78] focus:border-[#72BF78]"
                                placeholder="Enter your preferred therapist's name"
                                value={therapist}
                                onChange={(e) => setTherapist(e.target.value)}
                            />
                        </div>
                    </div>
                </form>
            </main>

            <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
                <div className="px-4 sm:px-8 py-4">
                    <h2 className="text-xl font-bold mb-4">Select Your Favourite Therapist:</h2>
                </div>

                <div className="block p-2 space-y-4">
                    {therapists.map((t, index) => (
                        <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center rounded-md border border-gray-200 bg-white px-4 py-3 shadow-md mb-4">
                            <img src="/api/placeholder/80/80" alt={t.name} className="h-16 w-16 rounded-full bg-gray-200 object-cover shrink-0 mb-2 sm:mb-0" />
                            <div className="sm:ml-4 w-full sm:w-56 mb-2 sm:mb-0">
                                <p className="text-lg font-medium">{t.name}</p>
                                <p className="text-sm text-gray-600"><span className="font-medium">Category:</span> {t.category}</p>
                                <p className="text-sm text-gray-600"><span className="font-medium">Location:</span> {t.location}</p>
                            </div>
                            <div className="sm:ml-4 w-full sm:w-56 mb-2 sm:mb-0">
                                <div className='flex'>
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-5 h-5 ${i < t.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
                                    ))}
                                </div>
                            </div>
                            <div className="sm:ml-4 w-full sm:w-56 mb-2 sm:mb-0">
                                <p className="text-lg font-bold text-[#72BF78]">${t.price} <span className="text-sm font-normal text-gray-600">Per Session</span></p>
                            </div>
                            <div className="sm:ml-4 w-full sm:w-56 flex justify-start sm:justify-end">
                                <Link to={`/home/check-session/${t.id}`} className='py-2 px-4 bg-[#72BF78] text-bold text-white rounded-lg hover:bg-[#5da863] transition-colors duration-300'> Book Me</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookSession;