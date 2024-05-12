import { Store } from "@/Store";
import { Button } from "@/component/ui/button";
import { toast } from "@/component/ui/use-toast";
import LoadingBox from "@/components/LoadingBox";
import { useSignupMutation } from "@/hooks/userHooks";
import { ApiError } from "@/type/ApiErros";
import { getError } from "@/utils";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useLocation, Link } from "react-router-dom";
export default function SignUp() {
  const navigate = useNavigate();

  const { search } = useLocation();

  const redireetInUrl = new URLSearchParams(search).get("redirect");

  const redirect = redireetInUrl ? redireetInUrl : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { state, dispatch } = useContext(Store);

  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const { mutateAsync: signup, isLoading } = useSignupMutation();

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "error",
        variant: "destructive",
        description: "Password and Confirm Password are not match",
      });
      return;
    }
    try {
      const data = await signup({ name, email, password });
      dispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      toast({
        title: "error",
        variant: "destructive",
        description: getError(err as ApiError),
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <div className="flex flex-1 justify-center items-center h-screen ">
        <form
          className="shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col "
          onSubmit={submitHandler}
        >
          <h2 className="text-2xl mb-4 font-bold text-gray-800 text-center">
            Sign UP
          </h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              minLength={8}
              maxLength={16}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Re-enter Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <Button
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign UP{" "}
            </Button>
            {isLoading && <LoadingBox />}
          </div>
          <div className=" mt-3 mb-3">
            <p className="text-xs text-gray-600 flex items-center">
              Already Have account?{" "}
              <Link
                to={`/signin?redirect=${redirect}`}
                className="ml-2 text-black-500 hover:text-blue-700 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
