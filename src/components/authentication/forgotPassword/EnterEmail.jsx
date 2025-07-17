import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext'; // Import this
import { Label } from "@/components/ui/label";

const EnterEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: yup.object({
      email: yup.string()
        .email('Invalid email format')
        .required('Please Enter Your Email'),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      try {
        setIsLoading(true);
        await new Promise((res) => setTimeout(res, 1500));
        login({ email: "googleuser@example.com" }); // Dummy user data
        toast.success('Login successful!');
        navigate('/dashboard');
        resetForm();
      } catch (err) {
        toast.error('Login failed!');
      } finally {
        setIsLoading(false);
      }
    
    },
  });

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1E1E1E] rounded-xl p-6 shadow-lg text-white">
        <h2 className="text-3xl font-bold text-white mb-1">Forgot Password</h2>
        <p className="text-sm text-[#b3b3b3] mb-6">
          Enter your email below to reset your password
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              className="w-full bg-[#e6efff] text-black mt-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              disabled={isLoading}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-400 mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#2e7d6d] hover:bg-[#27695c] text-white"
          >
            {isLoading ? (
              <span className="flex justify-center items-center">
                <Loader2 className="animate-spin w-4 h-4 mr-2" /> Sending...
              </span>
            ) : (
              'Send Reset Link'
            )}
          </Button>
        </form>

        {/* Footer Link */}
        <p className="mt-6 text-sm text-center text-gray-400">
          Remember your password?{' '}
          <Link to="/signin" className="text-[#4AA181] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default EnterEmail; 