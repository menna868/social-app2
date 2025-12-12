import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Label, TextInput, Radio } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";

export default function Register() {
  const navigate = useNavigate();
  const [apiError, setapiError] = useState("");
  const [isLoading, setisLoading] = useState(false)
  const schema = z
    .object({
      name: z.string().min(1, "Name is required ").max(15, "max lemgth is 15"),
      email: z.email("invalid email"),
      password: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "password must include 1 capital letter at least & 1 small letter at least & 1 special character & min lerngth is 8  "
        ),
      rePassword: z.string(),
      dateOfBirth: z
        .string()
        .regex(/^\d{4}[-/]\d{2}[-/]\d{2}$/, "invalid date")
        .refine((date) => {
          const userDate = new Date(date);
          const nowDate = new Date();
          nowDate.setHours(0, 0, 0, 0);
          return userDate < nowDate;
        }, "Can't be future date"),
      gender: z.enum(["male", "female","please select"], ),
    })
    .refine((object) => object.password === object.rePassword, {
      error: "password and repassword must match !!",
      path: ["rePassword"],
    });
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender:"",
    },
    resolver:zodResolver(schema)
  })
  let { register, handleSubmit ,formState} = form;
  function handleRegister(data) {
    setisLoading(true);
    console.log(data);
    axios.post(`https://linked-posts.routemisr.com/users/signup`, data)
      .then((res) => {
        console.log(res);
        if (res.data.message === "success") {
          setisLoading(false);
          navigate("/login")
        }
       })
      .catch((err) => {
        console.log(err.response.data.error);
        setisLoading(false);
        setapiError(err.response.data.error);
      });
    
  }
  return (
    <>
      {apiError ? (
        <div className="bg-red-500 text-white w-[30%] text-center mx-auto p-2 rounded-md my-1">
          {apiError}
        </div>
      ) : (
        ""
      )}
      <div className="container mx-auto p-4 ">
        {" "}
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="flex max-w-md flex-col mx-auto gap-4 p-6  dark:bg-gray-800 bg-gray-600 rounded-lg  text-white "
        >
          <h1 className="text-3xl text-pink-500 text-center">Register</h1>
          <div>
            <div className=" block">
              <Label htmlFor="name" className="text-white">
                Your name
              </Label>
            </div>
            <TextInput
              {...register("name")}
              id="name"
              type="text"
              placeholder="Your name....."
              shadow
            />
            <div>
              {" "}
              {formState.errors.name && formState.touchedFields.name ? (
                <p className="text-red-500 text-center font-semibold mt-2">
                  {formState.errors.name.message}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
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
            <div >
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
            {formState.errors.password && formState.touchedFields.password ? (
              <p className="text-red-500 text-center font-semibold mt-2">
                {formState.errors.password.message}
              </p>
            ) : (
              ""
            )}
          </div>
          <div>
            <div className=" block">
              <Label className="text-white" htmlFor="repassword">
                Repassword
              </Label>
            </div>
            <TextInput
              {...register("rePassword")}
              id="repassword"
              type="password"
              placeholder="Re-enter your password...."
              shadow
            />
            <div >
              {" "}
              {formState.errors.rePassword &&
              formState.touchedFields.rePassword ? (
                <p className="text-red-500 text-center font-semibold mt-2">
                  {formState.errors.rePassword.message}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div>
            <div className=" block">
              <Label className="text-white" htmlFor="dateOfBirth">
                Enter Your Birthday
              </Label>
            </div>
            <TextInput
              id="dateOfBirth"
              {...register("dateOfBirth")}
              type="date"
              shadow
            />
            <div >
              {" "}
              {formState.errors.dateOfBirth &&
              formState.touchedFields.dateOfBirth ? (
                <p className="text-red-500 text-center font-semibold mt-2">
                  {formState.errors.dateOfBirth.message}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="flex max-w-md  gap-4">
            <div className="flex items-center gap-2">
              <Radio id="female" {...register("gender")} value="female" />
              <Label htmlFor="female">Female</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio id="male" {...register("gender")} value="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div >
              {" "}
              {formState.errors.gender && formState.touchedFields.gender ? (
                <p className="text-red-500 text-center font-semibold mt-2">
                  {formState.errors.gender.message}
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
              "Register"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
