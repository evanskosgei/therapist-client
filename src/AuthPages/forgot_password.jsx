/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { Success, Error } from '../components/toasts';
import EndPoints from '../Api/endPoints';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const { data } = await EndPoints.Auth.forgotpassword({email})
            if (data.status == 200) {
                setIsSubmitted(true);
                Success(data.message)
            }
        } catch (errors) {
            Error(errors.response.data.error || errors.response.data.message)
        }finally{
            setIsSubmitting(false);
        }
    };

    return (
        <div className="font-sans bg-gray-100 min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg flex max-w-4xl w-full overflow-hidden">
                <div className="w-2/5 bg-[#72BF78] p-12 hidden lg:block">
                    <h2 className="text-4xl font-bold text-white mb-6">Password Recovery</h2>
                    <p className="text-white text-lg mb-8">Don&apos;t worry, we&apos;ve got you covered. Reset your password in just a few simple steps.</p>
                    <ul className="text-white space-y-4">
                        <li className="flex items-center"><CheckCircle className="mr-2 h-5 w-5" /> Enter your email address</li>
                        <li className="flex items-center"><CheckCircle className="mr-2 h-5 w-5" /> Receive reset instructions</li>
                        <li className="flex items-center"><CheckCircle className="mr-2 h-5 w-5" /> Create a new password</li>
                    </ul>
                </div>

                <div className="w-full lg:w-3/5 p-12">
                    <h3 className="text-3xl font-bold text-gray-800 mb-6">Forgot Password</h3>

                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        id="email"
                                        type="email"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#72BF78] focus:border-[#72BF78] pl-10"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#72BF78] text-white py-3 px-4 rounded-lg hover:bg-[#5da963] transition duration-300 flex items-center justify-center"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Reset Instructions'}
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </button>
                        </form>
                    ) : (
                        <div className="text-center">
                            <CheckCircle className="w-16 h-16 text-[#72BF78] mx-auto mb-4" />
                            <h4 className="text-2xl font-bold text-gray-800 mb-2">Email Sent!</h4>
                            <p className="text-gray-600 mb-6">
                                We&apos;ve sent password reset instructions to your email. Please check your inbox.
                            </p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="text-[#72BF78] hover:underline"
                            >
                                Didn&apos;t receive the email? Try again
                            </button>
                        </div>
                    )}

                    <div className="mt-8 text-center">
                        <a href="/signin" className="text-[#72BF78] hover:underline text-sm">
                            Remember your password? Sign in
                        </a>
                    </div>
                    <p className="mt-4 text-sm text-gray-600 text-center">
                        Don&apos;t have an account? <a href="/signup" className="text-[#72BF78] hover:underline">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;