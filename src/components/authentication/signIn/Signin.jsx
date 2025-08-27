import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff, Loader2 } from "lucide-react";
// import { signInWithPopup } from "firebase/auth";

import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";

import { useAuth } from "../../../context/AuthContext";
// import { auth, provider } from "../../../config/firebaseConfig";
import api from "../../../api";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true);
        const res = await api.post("/user/login", values);
        login(res.data.token, res.data.data.user);

        toast.success("Login successful!");
        navigate("/");
        resetForm();
      } catch (err) {
        toast.error(err?.response?.data?.message || "Login failed!");
      } finally {
        setIsLoading(false);
      }
    },
  });

  // const handleGoogleLogin = async () => {
  //   setIsLoading(true);
  //   try {
  //     const res = await signInWithPopup(auth, provider);
  //     const data = {
  //       name: res?.user?.displayName,
  //       email: res?.user?.email,
  //       photo: res?.user?.photoURL,
  //       token: res?.user?.accessToken,
  //     };

  //     const apiRes = await api.post("/user/googleSignin", data);
  //     login(apiRes.data.token, apiRes.data.data.user);

  //     toast.success("Google login successful!");
  //     navigate("/");
  //   } catch (err) {
  //     toast.error("Google login failed!");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <form onSubmit={formik.handleSubmit}>
          <CardContent className="space-y-4">
            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={isLoading}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500">{formik.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={isLoading}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-500">{formik.errors.password}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-3">
            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center">
                  <Loader2 className="animate-spin w-4 h-4 mr-2" />
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </Button>

            <Separator className="my-2" />

            {/* Google Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center gap-2"
              // onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-4 h-4"
              />
              {isLoading ? "Please wait..." : "Login with Google"}
            </Button>
          </CardFooter>
        </form>

        <p className="text-center text-sm text-muted-foreground pb-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Signin;
