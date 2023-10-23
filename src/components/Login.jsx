import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { Button, Input, Logo } from "./index";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h1 className="text-center text-2xl font-bold leading-tight">
          SIgn in to your account
        </h1>
        <p className="text-center text-base text-black/60">
          Don&apos;t have an account?
          <Link
            to="/"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >  
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form action="" onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              type="email"
              label=" Email:"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /\w+@\w+\.\w+/g.test(value) ||
                    "Email address must be valid",
                },
              })}
            />
            <Input
              type="password"
              label="Password:"
              placeholder="Enter your Password"
              {...register("password", { required: true })}
            />
            <Button type="submit " className="w-full">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
