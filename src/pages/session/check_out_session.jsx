/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Star, LoaderCircle } from 'lucide-react';
import { Error } from '../../components/toasts'
import EndPoints from '../../Api/endPoints';
import { useParams } from 'react-router-dom';
import { dayOfWeek } from '../../utils/days';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomTimePicker from '../../components/custom';
import '../../App.css';
import { useForm } from "react-hook-form"

const CheckoutSession = () => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [therapist, setTherapist] = useState('');
    const [pmethods, setPMethods] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [startDate, setStartDate] = useState(new Date());
    const [value, onChange] = useState('');
    const { id } = useParams()
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        defaultValues: {
            therapist_id: id,
            session_topic: '',
            session_date: '',
            paymentMethod: '',
            phoneNumber: '',
            cardNumber: '',
            expiryDate: '',
            cvv: '',
            cardholderName: '',
            value: '',
        }
    });

    const fetch_therapist_data = async (id) => {
        try {
            setIsLoading(true)
            const { data } = await EndPoints.booking.fetch_therapist_data({ id });
            if (data.status === 200) {
                setTherapist(data.therapist[0]);
            }
        } catch (error) {
            Error(error.response.data.error || error.message || "An Error Occurred!")
        } finally {
            setIsLoading(false)
        }
    }
    const fetch_payment_method = async () => {
        try {
            setIsLoading(true);
            const { data } = await EndPoints.payment_methods.fetch_payment_methods()
            if (data.status === 200) {
                setPMethods(data.methods);
            }
        } catch (error) {
            Error(error.response?.data?.error || error.message || "An Error Occurred!");
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetch_therapist_data(id)
        fetch_payment_method()
    }, [id])

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const onSubmit = (values) => {
        console.log(values)
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <LoaderCircle className="animate-spin h-10 w-10" />
            </div>
        );
    }

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
                                {...register("phoneNumber", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^[0-9]{9}$/,
                                        message: "Please enter a valid phone number"
                                    }
                                })}
                                type="tel"
                                placeholder="712345678"
                                maxLength="9"
                                className="w-full p-2 border border-gray-300 focus:ring-2 focus:ring-[#72BF78] focus:border-[#72BF78]"
                            />
                        </div>
                        {errors.phoneNumber && (
                            <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>
                        )}
                        <p className="text-xs text-gray-500">Enter your M-Pesa registered phone number</p>
                    </div>
                );

            case 'credit card':
                return (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Card Number</label>
                            <input
                                {...register("cardNumber", {
                                    required: "Card number is required",
                                    pattern: {
                                        value: /^[0-9]{16}$/,
                                        message: "Please enter a valid card number"
                                    }
                                })}
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                maxLength="19"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72BF78] focus:border-[#72BF78]"
                            />
                            {errors.cardNumber && (
                                <p className="text-red-500 text-xs">{errors.cardNumber.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                                <input
                                    {...register("expiryDate", {
                                        required: "Expiry date is required",
                                        pattern: {
                                            value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                                            message: "Please enter a valid expiry date (MM/YY)"
                                        }
                                    })}
                                    type="text"
                                    placeholder="MM/YY"
                                    maxLength="5"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72BF78] focus:border-[#72BF78]"
                                />
                                {errors.expiryDate && (
                                    <p className="text-red-500 text-xs">{errors.expiryDate.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">CVV</label>
                                <input
                                    {...register("cvv", {
                                        required: "CVV is required",
                                        pattern: {
                                            value: /^[0-9]{3,4}$/,
                                            message: "Please enter a valid CVV"
                                        }
                                    })}
                                    type="text"
                                    placeholder="123"
                                    maxLength="3"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72BF78] focus:border-[#72BF78]"
                                />
                                {errors.cvv && (
                                    <p className="text-red-500 text-xs">{errors.cvv.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
                            <input
                                {...register("cardholderName", {
                                    required: "Cardholder name is required"
                                })}
                                type="text"
                                placeholder="John Doe"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72BF78] focus:border-[#72BF78]"
                            />
                            {errors.cardholderName && (
                                <p className="text-red-500 text-xs">{errors.cardholderName.message}</p>
                            )}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-full bg-gray-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                        <div className="w-20 h-20 bg-[#72BF78] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                            {therapist?.therapistprofile?.firstname.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{therapist?.therapistprofile?.firstname} {therapist?.therapistprofile?.middlename} {therapist?.therapistprofile?.lastname}</h2>
                            <p className="text-lg text-gray-600">
                                {therapist?.therapistprofile?.address}, {therapist.country}
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
                                        className={`w-5 h-5 ${i < Math.round(therapist?.average_rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                        fill="currentColor"
                                        aria-label={`Star rating: ${Math.round(therapist?.average_rating)}/5`}
                                    />
                                ))}
                                <span className="ml-2 text-gray-600">({therapist?.performance_ratings_count})</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="font-medium">Specialization:</span>
                            <span>{therapist?.therapistprofile?.specialization}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="font-medium">Completed Sessions:</span>
                            <span>{therapist?.completedSessions}</span>
                        </div>
                    </div>

                    {/* Session Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="flex items-center space-x-2">
                            <span className="font-medium">Hours Per Session:</span>
                            <span>{therapist?.therapistprofile?.hours_per_session} Hours</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="font-medium">Available:</span>
                            <span>{therapist?.profile_availability?.number_of_days_per_week}days Per Week.</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="font-medium">Price Per Session:</span>
                            <span className="text-[#72BF78] font-semibold">${therapist?.therapistprofile?.price_per_session}</span>
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
                                {therapist?.therapistprofile?.bio}
                            </p>
                        </div>
                    </div>

                    {/* Session Booking Form */}
                    <div className="border-t pt-8">
                        <h3 className="text-2xl font-bold mb-6">Request For A Session</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Session Topic</label>
                                <input
                                    {...register("session_topic", {
                                        required: "Session topic is required"
                                    })}
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72BF78] focus:border-[#72BF78]"
                                />
                                {errors.session_topic && (
                                    <p className="text-red-500 text-xs">{errors.session_topic.message}</p>
                                )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Day of the Week</label>
                                    <select
                                        {...register("dayOfWeek", {
                                            required: "Please select a day"
                                        })}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72BF78] focus:border-[#72BF78]">
                                        <option value="">Select Day</option>
                                        {dayOfWeek.map((day, index) => (
                                            <option key={index} value={day.day}>{day.day}</option>
                                        ))}
                                    </select>
                                    {errors.dayOfWeek && (
                                        <p className="text-red-500 text-xs">{errors.dayOfWeek.message}</p>
                                    )}
                                </div> */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                                    <select
                                        {...register("paymentMethod", {
                                            required: "Please select a payment method"
                                        })}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72BF78] focus:border-[#72BF78]"
                                        onChange={handlePaymentMethodChange}
                                        value={paymentMethod}>
                                        <option value="">Select Payment Method</option>
                                        {pmethods.map((method, index) => (
                                            <option key={index} value={(method.method_name).toLowerCase()}>
                                                {method.method_name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.paymentMethod && (
                                        <p className="text-red-500 text-xs">{errors.paymentMethod.message}</p>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Date for the Session</label>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => {
                                            setStartDate(date);
                                            setValue('session_date', date);
                                        }}
                                        className="date-picker w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72BF78] focus:border-[#72BF78]"
                                        minDate={new Date()}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Start Time for the Session</label>
                                    <CustomTimePicker />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">End Time for the Session</label>
                                    <CustomTimePicker />
                                </div>

                            </div>
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