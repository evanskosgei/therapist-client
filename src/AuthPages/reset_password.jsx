/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Eye, EyeOff, Lock, CheckCircle, ArrowRight } from 'lucide-react';

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordsMatch(e.target.value === confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordsMatch(e.target.value === password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword && password.length > 0) {
            setIsSubmitted(true);
        }
    };

    return (
        <div className="font-sans bg-gray-100 min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg flex max-w-4xl w-full overflow-hidden">
                <div className="w-2/5 bg-[#72BF78] p-12 hidden lg:block">
                    <h2 className="text-4xl font-bold text-white mb-6">Password Reset</h2>
                    <p className="text-white text-lg mb-8">Create a new, strong password to secure your account.</p>
                    <ul className="text-white space-y-4">
                        <li className="flex items-center"><CheckCircle className="mr-2 h-5 w-5" /> Use at least 8 characters</li>
                        <li className="flex items-center"><CheckCircle className="mr-2 h-5 w-5" /> Include uppercase & lowercase letters</li>
                        <li className="flex items-center"><CheckCircle className="mr-2 h-5 w-5" /> Add numbers and symbols</li>
                    </ul>
                </div>

                <div className="w-full lg:w-3/5 p-12">
                    <h3 className="text-3xl font-bold text-gray-800 mb-6">Reset Your Password</h3>

                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#72BF78] focus:border-[#72BF78] pl-10 pr-10"
                                        placeholder="Enter your new password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        required
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

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="confirmPassword">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-[#72BF78] focus:border-[#72BF78] pl-10 pr-10 ${passwordsMatch ? 'border-gray-300' : 'border-red-500'
                                            }`}
                                        placeholder="Confirm your new password"
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        required
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

                            <button
                                type="submit"
                                className="w-full bg-[#72BF78] text-white py-3 px-4 rounded-lg hover:bg-[#5da963] transition duration-300 flex items-center justify-center"
                                disabled={!passwordsMatch}
                            >
                                Reset Password
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </button>
                        </form>
                    ) : (
                        <div className="text-center">
                            <CheckCircle className="w-16 h-16 text-[#72BF78] mx-auto mb-4" />
                            <h4 className="text-2xl font-bold text-gray-800 mb-2">Password Reset Successful!</h4>
                            <p className="text-gray-600 mb-6">
                                Your password has been successfully reset. You can now use your new password to sign in.
                            </p>
                            <a
                                href="/signin"
                                className="inline-block bg-[#72BF78] text-white py-2 px-4 rounded-lg hover:bg-[#5da963] transition duration-300"
                            >
                                Go to Sign In
                            </a>
                        </div>
                    )}

                    <div className="mt-8 text-center">
                        <a href="/" className="text-[#72BF78] hover:underline text-sm">
                            Remember your old password? Sign in
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

export default ResetPassword;