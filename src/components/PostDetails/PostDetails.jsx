import React from 'react'
import './PostDetails.module.css'
import { useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Comment from '../Comment/Comment';

export default function PostDetails() {
  let { id } = useParams();
  console.log(id);
  function getsinglePost()
  {
  return  axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
      headers: {
        token:localStorage.getItem("userToken")
      }
    })
}
 let { data, isError, isLoading, error } = useQuery({
   queryKey: ["getSinglePost"],
   queryFn: getsinglePost,
   select: (data) => data?.data?.post,
 });
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
      <div
       key={data?.id}
        className=" md:w-[50%] lg:w-[40%] rounded-md bg-pink-500 my-8  mx-auto p-4"
      >
        <div className="flex justify-between items-center my-4">
          <div className="flex items-center gap-2">
            <img src={data?.user.photo} alt="" className="size-8" />
            <p>{data?.user.name}</p>
          </div>
          <div className="text-slate-500">{data?.createdAt}</div>
        </div>
        {data?.body && <h2 className="mb-4">{data?.body}</h2>}
        {data?.image && (
          <img
            src={data?.image}
            className="w-full rounded-md "
            alt={data.body}
          />
        )}
        {data?.comments.map((comment) => <Comment key={comment.id} comment={comment} />)}
        
        
      </div>
    </>
  );
}
