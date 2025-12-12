import React, {  useContext, useState } from 'react'
import './Login.module.css'
import { Label, TextInput } from "flowbite-react";
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export default function Login() {
 let { LoginUser, setLoginUser } = useContext(UserContext);
  const [apiError, setapiError] = useState("");
  const [isLoading, setisLoading] = useState(false)
  const navigate = useNavigate();
  const schema = z.object({
    email: z.email("invalid email"),
    password: z
            .string()
            .regex(
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
              "password must include 1 capital letter at least & 1 small letter at least & 1 special character & min lerngth is 8  "
            ),
  })
  const form = useForm({
    defaultValues:
    {
      email: "",
      password:"",
    },
    resolver:zodResolver(schema)
    
  });
  let { register,handleSubmit ,formState} = form;
  function handleLogin(data) {
    setisLoading(true);
    console.log(data);
    axios.post(`https://linked-posts.routemisr.com/users/signin`, data)
      .then((res) => {
        console.log(res.data.message);
        if (res.data.message === "success") {
          setisLoading(false);
          localStorage.setItem("userToken", res.data.token);
          setLoginUser(res.data.user);
          navigate("/");
        }
        
      }).catch((err) => {
        setisLoading(false);
        console.log(err.response.data.error);
        setapiError(err.response.data.error);
    });
    
  }
  return (
    <>
      {" "}
      {apiError ? (
        <div className="bg-red-500 text-white w-[30%] text-center mx-auto p-2 rounded-md my-1">
          {apiError}
        </div>
      ) : (
        ""
      )}
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex max-w-md flex-col mx-auto gap-4 mt-4 p-8  dark:bg-gray-800 bg-gray-600 rounded-lg  text-white "
      >
        <h1 className="text-3xl text-pink-500 text-center">Login</h1>

        <div>
          <div className=" block">
            <Label htmlFor="email2" className="text-white">
              Your email
            </Label>
          </div>
          <TextInput
            {...register("email")}
            id="email2"
            type="email"
            placeholder="name@flowbite.com"
            shadow
          />
          <div className="">
            {" "}
            {formState.errors.email && formState.touchedFields.email ? (
              <p className="text-red-500 text-center font-semibold mt-2">
                {formState.errors.email.message}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div>
          <div className=" block">
            <Label className="text-white" htmlFor="password">
              Your Password
            </Label>
          </div>
          <TextInput
            {...register("password")}
            id="password"
            type="password"
            placeholder="Your password...."
            shadow
          />
          <div className="">
            {" "}
            {formState.errors.password && formState.touchedFields.password ? (
              <p className="text-red-500 text-center font-semibold mt-2">
                {formState.errors.password.message}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>

        <button
          disabled={isLoading}
          className="bg-pink-500 p-2 rounded-2xl cursor-pointer"
        >
          {isLoading ? (
            <i className="fas fa-spinner fa-spin text-white"></i>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </>
  );
}
