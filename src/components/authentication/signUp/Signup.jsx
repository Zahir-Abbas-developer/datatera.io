import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Checkbox } from "../../../components/ui/checkbox";
import { Label } from "../../../components/ui/label";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termRead, setTermRead] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: yup.object({
      email: yup.string()
        .email('Invalid email format')
        .required('Please Enter Your Email'),
      password: yup.string()
        .required('Please Enter Your Password')
        .matches(/^\S*$/, 'Password cannot contain spaces'),
      passwordConfirm: yup.string()
        .required('Please Enter Your Confirm Password')
        .matches(/^\S*$/, 'Password cannot contain spaces'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (!termRead) {
          toast.warning('Please read and accept the Terms of Service');
          return;
        }
        setIsLoading(true);
        if (values.password.length < 8) {
          toast.warning('Password must contains at least 8 characters!');
          return;
        }
        if (values.password !== values.passwordConfirm) {
          toast.warning('Password and confirm password should be same!');
          return;
        }
        await new Promise((res) => setTimeout(res, 1500));
        toast.success('Verification link sent to your registered email address!');
        navigate('/');
        resetForm();
      } catch (err) {
        toast.error('Signup failed!');
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1000));
      toast.success('Google signup successful!');
      navigate('/');
    } catch (err) {
      toast.error('Google signup failed!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1E1E1E] rounded-xl p-6 shadow-lg text-white">
        <h2 className="text-3xl font-bold text-white mb-1">Sign up</h2>
        <p className="text-sm text-[#b3b3b3] mb-6">
          Enter your email below to create your account
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

          {/* Password Field */}
          <div>
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                className="w-full bg-[#e6efff] text-black pr-10 mt-2"
                onChange={(e) => {
                  formik.setFieldValue('password', e?.target?.value?.trim());
                }}
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

          {/* Confirm Password Field */}
          <div>
            <Label htmlFor="passwordConfirm" className="text-white">
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="passwordConfirm"
                name="passwordConfirm"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm password"
                className="w-full bg-[#e6efff] text-black pr-10 mt-2"
                onChange={(e) => {
                  formik.setFieldValue('passwordConfirm', e?.target?.value?.trim());
                }}
                onBlur={formik.handleBlur}
                value={formik.values.passwordConfirm}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
              <p className="text-sm text-red-400 mt-1">{formik.errors.passwordConfirm}</p>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={termRead}
              onCheckedChange={() => setTermRead(!termRead)}
              className="border-gray-400 data-[state=checked]:bg-[#4AA181] data-[state=checked]:border-[#4AA181]"
            />
            <Label htmlFor="terms" className="text-sm font-normal text-white">
              I agree to the{' '}
              <a href="https://www.datatera.ai/terms-of-service/" target="_blank" rel="noreferrer" className="text-[#4AA181] hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="https://www.datatera.ai/privacy-policy/" target="_blank" rel="noreferrer" className="text-[#4AA181] hover:underline">
                Privacy Policy
              </a>
            </Label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading || !termRead}
            className="w-full bg-[#2e7d6d] hover:bg-[#27695c] text-white"
          >
            {isLoading ? (
              <span className="flex justify-center items-center">
                <Loader2 className="animate-spin w-4 h-4 mr-2" /> Creating account...
              </span>
            ) : (
              'Sign up'
            )}
          </Button>
        </form>

        {/* Separator */}
        <div className="my-4 text-center text-sm text-gray-400">Or continue with</div>

        {/* Google Button */}
        <Button
          onClick={handleGoogleSignup}
          disabled={isLoading || !termRead}
          variant="outline"
          className="w-full border border-gray-600 bg-black text-white hover:bg-gray-900"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-4 h-4 mr-2"
          />
          {isLoading ? 'Please wait...' : 'Sign up with Google'}
        </Button>

        {/* Footer Link */}
        <p className="mt-6 text-sm text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/signin" className="text-[#4AA181] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup; 