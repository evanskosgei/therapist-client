/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import EndPoints from '../Api/endPoints';
import { Success, Error } from '../components/toasts';
import { saveToken } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, setToken, setLoading, setError } from '../redux/AuthReducer';

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ip, setIp] = useState([]);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const getIp = async () => {
    const response = await fetch("https://ipapi.co/json/")
    const data = await response.json()
    setIp(data.ip)
  }

  useEffect(() => {
    getIp()
  }, [])
  const onSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      dispatch(setLoading(true));
      const { data } = await EndPoints.Auth.login({
        email: values.email,
        password: values.password,
        ip_address: ip
      })
      if (data.status == 200) {
        Success(data.message)
        saveToken(data.token)
        dispatch(setToken(data.token));
        dispatch(setUser(data.user));
        navigate('/home')
      }
    } catch (errors) {
      if (errors.response.data.status == 400) {
        localStorage.setItem('email', errors.response.data.email)
        navigate('/verification')
      }
      Error(errors.response.data.error)
      dispatch(setError(errors.response.data.error));
    } finally {
      setIsSubmitting(false);
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="font-sans bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg flex max-w-4xl w-full overflow-hidden">
        <div className="w-2/5 bg-[#72BF78] p-12 hidden lg:block">
          <h2 className="text-4xl font-bold text-white mb-6">Welcome Back!</h2>
          <p className="text-white text-lg">Sign in to access your account and continue your journey with us.</p>
        </div>

        <div className="w-full lg:w-3/5 p-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Sign In</h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  {...register('email', { required: true })}
                  className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-[#72BF78] focus:border-[#72BF78] pl-10`}
                  placeholder="Enter your email"
                />
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
              {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register('password', { required: true })}
                  className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-[#72BF78] focus:border-[#72BF78] pl-10 pr-10`}
                  placeholder="Enter your password"
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
              {errors.password && <span className="text-red-500 text-sm">Password is required</span>}
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center">
                <input type="checkbox" className="hidden form-checkbox text-[#72BF78]" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="/forgot-password" className="text-sm text-[#72BF78] hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#72BF78] text-white py-2 px-4 rounded-lg hover:bg-[#5da963] transition duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-8 text-sm text-gray-600 text-center">
            Don&apos;t have an account? <a href="/signup" className="text-[#72BF78] hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;