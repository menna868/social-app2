import React, { useEffect } from 'react'
import './Profile.module.css'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import UserPosts from '../UserPosts/UserPosts';
import ChangePassword from './../ChangePassword/ChangePassword';
import UploadProfilePhoto from './../UploadProfilePhoto/UploadProfilePhoto';
export default function Profile() {

  function getuserData() {
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }
  
 let {data,isError,isLoading,error}= useQuery({
    queryKey: ["userData"],
   queryFn: getuserData,
   select:(data)=>data?.data?.user,
 });
    useEffect(() => {
      if (data?._id) {
        localStorage.setItem("userId", data._id);
      }
    }, [data]);
  console.log(data);
   if (isError) {
     return <h3>{error.message}</h3>;
   }
   if (isLoading) {
     return (
       <div className="sk-circle">
         <div className="sk-circle1 sk-child"></div>
         <div className="sk-circle2 sk-child"></div>
         <div className="sk-circle3 sk-child"></div>
         <div className="sk-circle4 sk-child"></div>
         <div className="sk-circle5 sk-child"></div>
         <div className="sk-circle6 sk-child"></div>
         <div className="sk-circle7 sk-child"></div>
         <div className="sk-circle8 sk-child"></div>
         <div className="sk-circle9 sk-child"></div>
         <div className="sk-circle10 sk-child"></div>
         <div className="sk-circle11 sk-child"></div>
         <div className="sk-circle12 sk-child"></div>
       </div>
     );
   }
  
  return (
    <>
      <div className=" md:w-[60%] lg:w-[40%] text-center   border-2 border-pink-500 p-4 mx-auto rounded-lg m-8">
        <img src={data?.photo} className="size-[50px] mx-auto" alt="" />
        <p>Name:{data?.name}</p>
        <p>Gender:{data?.gender}</p>
        <p>Email:{data?.email}</p>
        <p>Birthday:{data?.dateOfBirth}</p>
      </div>
      <div className=" md:w-[60%] lg:w-[40%] text-center   border-2 border-pink-500 p-4 mx-auto rounded-lg m-8">
        <ChangePassword />
      </div>
      <div className=" md:w-[60%] lg:w-[40%] text-center   border-2 border-pink-500 p-4 mx-auto rounded-lg m-8">
        <UploadProfilePhoto />
      </div>

      {data && <UserPosts id={data?._id} />}
    </>
  );
}
