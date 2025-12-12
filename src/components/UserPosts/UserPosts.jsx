import React from 'react'
import './UserPosts.module.css'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Comment from '../Comment/Comment';
import CreateCommentModal from './../CreateCommentModal/CreateCommentModal';
import UpdatePost from '../UpdatePost/UpdatePost';
import DeletePost from '../DeletePost/DeletePost';

export default function UserPosts({id}) {
  function getUserPosts() {
  return axios.get(
    `https://linked-posts.routemisr.com/users/${id}/posts?limit=5`
    , {
      headers: {
      token:localStorage.getItem("userToken")
    }
  });
}

let {data ,isError,isLoading,error}=  useQuery({
    queryKey: ["userPosts"],
  queryFn: getUserPosts,
    select:(data)=> data?.data?.posts
  })
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
      {" "}
      {data.map((post) => (
        <div
          className=" md:w-[50%] lg:w-[40%] rounded-md bg-pink-500 my-8  mx-auto p-4"
          key={post.id}
        >
          <Link to={`/postdetails/${post.id}`} className="my-2">
            <div className="flex justify-between items-center my-4">
              <div className="flex items-center gap-2">
                <img src={post.user.photo} alt="" className="size-8" />
                <p>{post.user.name}</p>
              </div>
              <div className="text-slate-500">{post.createdAt}</div>
            </div>
            {post.body && <h2 className="mb-4">{post.body}</h2>}
            {post.image && (
              <img
                src={post.image}
                className="w-full rounded-md "
                alt={post.body}
              />
            )}
          </Link>
          <br />
          {post.comments?.length > 0 && <Comment comment={post.comments[0]} />}
          <CreateCommentModal postId={post.id} />
          <br />
          <UpdatePost postId={post.id} />
          <br />
          <DeletePost postId={post.id} />
        </div>
      ))}
    </>
  );
}
