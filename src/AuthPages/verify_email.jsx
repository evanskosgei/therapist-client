/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import EndPoints from '../Api/endPoints';
import { Success, Error } from '../components/toasts';
import { useNavigate } from 'react-router-dom';

const Verify_email = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [email, setEmail] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) setEmail(storedEmail);
    }, []);

    const partialEmail = email ? email.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, "$1***@$2") : '';

    const onSubmit = async (values) => {
        try {
            const { data } = await EndPoints.Auth.verify({
                email: email,
                activation_key: values.otp
            })
            if (data.status == 200) {
                Success(data.message)
                navigate('/')
            }
        } catch (errors) {
            Error(errors.response.data.error || errors.response.data.message)
        }
    };
    const resend = async()=>{
        try{
            const {data} = await EndPoints.Auth.otpResend({
                email:email
            })
            if(data.status == 200){
                Success(data.message)
            }
        }catch(errors){
            Error(errors.response.data.error || errors.response.data.message)
        }
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
                    <div className='mb-6 text-gray-600 text-center'>
                        {partialEmail || 'Loading...'}
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <div className="relative">
                                <input
                                    id="otp"
                                    type="number"
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-[#72BF78] focus:border-[#72BF78] pl-10 ${errors.otp ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter your One Time Password"
                                    {...register('otp', {
                                        required: 'Otp is required',
                                        minLength: {
                                            value: 6,
                                            message: 'OTP is less than 6 characters'
                                        },
                                        maxLength: {
                                            value: 6,
                                            message: 'OTP is more than 6 characters'
                                        }
                                    })}
                                />
                            </div>
                            {errors.otp && (
                                <p className="text-red-500 text-xs mt-1">{errors.otp.message}</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#72BF78] text-white py-2 px-4 rounded-lg hover:bg-[#5da963] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                            Verify Email
                        </button>
                    </form>

                    <p className="mt-8 text-sm text-gray-600 text-center">
                        Did not receive one time password? 
                        <button onClick={()=>resend()}
                         className="text-[#72BF78] hover:underline">Resend</button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Verify_email