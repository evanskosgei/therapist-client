/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { Star, User, LoaderCircle, Search } from 'lucide-react';
import { therapyCategories } from '../../utils/bookingData';
import { countryData } from '../../utils/data';
import { dayOfWeek } from '../../utils/days';
import { Link } from 'react-router-dom';
import EndPoints from '../../Api/endPoints';
import { Error } from '../../components/toasts';

const BookSession = () => {
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [days, setDays] = useState('');
    const [therapist, setTherapist] = useState('');
    const [therapists, setTherapists] = useState([]);
    const [filteredTherapists, setFilteredTherapists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetch_therapists_available = async () => {
        setIsLoading(true);
        try {
            const { data } = await EndPoints.booking.open_session();
            if (data.status === 200) {
                setTherapists(data.therapists);
                setFilteredTherapists(data.therapists);
            }
        } catch (error) {
            Error(error?.response?.data.error || error?.message || "Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetch_therapists_available();
    }, []);

    // Debounce function
    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    };

    // Filter therapists based on search criteria
    const filterTherapists = useCallback(
        debounce(() => {
            let filtered = [...therapists];

            if (category) {
                filtered = filtered.filter(t =>
                    t.therapistprofile?.specialization?.toLowerCase().includes(category.toLowerCase())
                );
            }

            if (location) {
                filtered = filtered.filter(t =>
                    t.country?.toLowerCase() === location.toLowerCase()
                );
            }
            if (therapist) {
                filtered = filtered.filter(t => {
                    const fullName = `${t.therapistprofile?.firstname || ''} ${t.therapistprofile?.middlename || ''} ${t.therapistprofile?.lastname || ''}`.toLowerCase();
                    return fullName.includes(therapist.toLowerCase()) ||
                        t.email.toLowerCase().includes(therapist.toLowerCase());
                });
            }
            if (price) {
                filtered = filtered.filter(t => {
                    const sessionPrice = t.therapistprofile?.price_per_session;
                    return sessionPrice >= price && sessionPrice <= price;
                });
            }
            if (days) {
                filtered = filtered.filter(t => {
                    const availableDays = t.profile_availability?.days_of_week || [];
                    return availableDays.includes(days);  // Check if the selected day is in the available days array
                });
            }

            setFilteredTherapists(filtered);
        }, 300),
        [therapists, category, location, price, days, therapist]
    );

    // Apply filters when search criteria change
    useEffect(() => {
        filterTherapists();
    }, [category, location, therapist, price, days, filterTherapists]);

    const handleReset = () => {
        setCategory('');
        setLocation('');
        setPrice('');
        setDays('');
        setTherapist('');
        setFilteredTherapists(therapists);
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
                            <label className="block mb-2 text-sm font-medium text-gray-700">Price Per Session</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    className="w-full p-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#72BF78] focus:border-[#72BF78]"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Day Of The Week</label>
                            <div className="relative">
                                <select
                                    className="w-full p-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#72BF78] focus:border-[#72BF78]"
                                    value={days}
                                    onChange={(e) => setDays(e.target.value)}
                                >
                                    <option value="">Select day of the week</option>
                                    {dayOfWeek.map((cat, index) => (
                                        <option key={index} value={cat.day}>{cat.day}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="mb-6 sm:mb-8">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Search Therapist</label>
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full p-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#72BF78] focus:border-[#72BF78]"
                                placeholder="Search by name or email"
                                value={therapist}
                                onChange={(e) => setTherapist(e.target.value)}
                            />
                            <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleReset}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#72BF78]"
                        >
                            Reset Filters
                        </button>
                    </div>
                </form>
            </main>

            <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
                <div className="px-4 sm:px-8 py-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Select Your Favourite Therapist:</h2>
                    <p className="text-sm text-gray-600">
                        Showing {filteredTherapists.length} of {therapists.length} therapists
                    </p>
                </div>
                <div className="block p-2 space-y-4">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-48">
                            <LoaderCircle className="animate-spin h-5 w-5" />
                        </div>
                    ) : filteredTherapists.length > 0 ? (
                        filteredTherapists.map((t, index) => (
                            <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center rounded-md border border-gray-200 bg-white px-4 py-3 shadow-md mb-4">
                                <div className="relative h-16 w-16 rounded-full bg-gray-200 object-cover shrink-0 mb-2 sm:mb-0">
                                    {t.therapistprofile?.profile_image ? (
                                        <img
                                            src={t.therapistprofile.profile_image}
                                            alt={t.therapistprofile.firstname || "Therapist"}
                                            className="h-16 w-16 rounded-full object-cover"
                                        />
                                    ) : (
                                        <User className="h-16 w-16 text-gray-400" />
                                    )}
                                </div>
                                <div className="sm:ml-4 w-full sm:w-56 mb-2 sm:mb-0">
                                    <p className="text-lg font-medium">
                                        {t.therapistprofile
                                            ? `${t.therapistprofile.firstname} ${t.therapistprofile.middlename} ${t.therapistprofile.lastname}`
                                            : t.email}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Category:</span> {t.therapistprofile?.specialization || 'N/A'}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Location:</span> {t.therapistprofile?.address}, <strong>{t.country}</strong>
                                    </p>
                                </div>
                                <div className="sm:ml-4 w-full sm:w-56 mb-2 sm:mb-0">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${i < Math.round(t.average_rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                                fill="currentColor"
                                                aria-label={`Star rating: ${Math.round(t.average_rating)}/5`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="sm:ml-4 w-full sm:w-56 mb-2 sm:mb-0">
                                    <p className="text-lg font-bold text-[#72BF78]">
                                        ${t.therapistprofile?.price_per_session || 0} <span className="text-sm font-normal text-gray-600">Per Session</span>
                                    </p>
                                </div>
                                <div className="sm:ml-4 w-full sm:w-56 flex justify-start sm:justify-end">
                                    <Link
                                        to={`/home/check-session/${t.id}`}
                                        className="py-2 px-4 bg-[#72BF78] text-bold text-white rounded-lg hover:bg-[#5da863] transition-colors duration-300"
                                    >
                                        Book Me
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-600 mb-2">No therapists found matching your criteria.</p>
                            <button
                                onClick={handleReset}
                                className="text-[#72BF78] hover:text-[#5da863] font-medium"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookSession;