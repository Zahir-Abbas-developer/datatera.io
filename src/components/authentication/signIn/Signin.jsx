import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/api';

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup.string().email('Invalid email').required('Email is required'),
      password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
  try {
    setIsLoading(true);
    const res = await api.post('/user/login', values);
    console.log(res, "res");

    // ✅ Store token/user in context or localStorage
    login(res.data.token, res.data.data.user);

    toast.success('Login successful!');
    navigate('/dashboard');
    resetForm();
  } catch (err) {
    toast.error('Login failed!');
  } finally {
    setIsLoading(false);
  }
}
  });

  //  const onSubmit = async (values, resetForm) => {
  //   try {
  //     setIsLoading(true);
  //     const res = await api.post('/user/login', values);
  //     loginSuccess(res.data.token, res.data.data.user);
  //     navigate('/');
  //     resetForm();
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //     toast(error?.response?.data?.message, { type: 'error' });
  //   }
  // };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1000));
      login({ email: 'googleuser@example.com' }); // Dummy google user
      toast.success('Google login successful!');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Google login failed!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1E1E1E] rounded-xl p-6 shadow-lg text-white">
        <h2 className="text-3xl font-bold text-white mb-1">Login</h2>
        <p className="text-sm text-[#b3b3b3] mb-6">
          Enter your email below to login to your account
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full bg-[#e6efff] text-black px-4 py-2 rounded-md focus:outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              disabled={isLoading}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-400 mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="text-sm font-medium text-white">
                Password
              </label>
              <Link to="/forgot-password" className="text-sm text-[#4AA181] hover:underline">
                Forgot your password?
              </Link>
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full bg-[#e6efff] text-black px-4 py-2 pr-10 rounded-md focus:outline-none"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-400 mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !formik.isValid}
            className="w-full bg-[#2e7d6d] hover:bg-[#27695c] text-white py-2 rounded-md transition-colors"
          >
            {isLoading ? (
              <span className="flex justify-center items-center">
                <Loader2 className="animate-spin w-4 h-4 mr-2" /> Logging in...
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Separator */}
        <div className="my-4 text-center text-sm text-gray-400">Login with Google</div>

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full border border-gray-600 bg-black text-white py-2 rounded-md flex justify-center items-center gap-2 hover:bg-gray-900"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-4 h-4"
          />
          {isLoading ? 'Please wait...' : 'Login with Google'}
        </button>

        {/* Footer Link */}
        <p className="mt-6 text-sm text-center text-gray-400">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-[#4AA181]  hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
