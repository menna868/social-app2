import React, { useEffect, useState } from 'react'
import './Home.module.css'
import { useContext } from 'react'
import { PostContext } from '../../Context/PostContext'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Comment from '../Comment/Comment'
import { Link } from 'react-router-dom'
import CreateCommentModal from '../CreateCommentModal/CreateCommentModal'
import CreatePost from './../CreatePost/CreatePost';
export default function Home() {
  async function getAllPosts() {
  return  await axios.get(`https://linked-posts.routemisr.com/posts?limit=50`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }
 let {data,isError,isLoading,error}= useQuery({
    queryKey: ["getPosts"],
   queryFn: getAllPosts,
   staleTime: 20000,
   retry: 4,
   retryDelay:3000,
 })
 
  if (isError) {
   return <h3>{error.message }</h3>
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
  
  // let { getAllposts } = useContext(PostContext);
  // const [posts, setposts] = useState([])
  // async function getPosts() {
  //   let res = await getAllposts();
  //   if(res.length){
  //     setposts(res);
  //     console.log(res);
      
  //   }
    
    
  // }
  // useEffect(() => {
  //   getPosts();
    
  // },[])
  return (
    <>
      <div>
        <CreatePost/>
     </div>
      {data?.data?.posts.map((post) => (
        <div
          className=" md:w-[50%] lg:w-[35%] rounded-md bg-pink-500 my-8  mx-auto p-4"
          key={post.id}
        >
          <Link to={`/postdetails/${post.id}`}>
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
            {post.comments?.length > 0 && (
              <Comment comment={post.comments[0]} />
            )}
          </Link>
          <CreateCommentModal postId={post.id } />
        </div>
      ))}
    </>
  );
}
