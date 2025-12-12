import React from 'react'
import './DeletePost.module.css'
import { Button } from 'flowbite-react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export default function DeletePost({ postId }) {
  let queryClient =  useQueryClient();
  async function deletePost() {
    console.log("Delete post with ID:", postId);
     try {
     let res= await axios.delete(`https://linked-posts.routemisr.com/posts/${postId}`,{
      headers: {
        token: localStorage.getItem("userToken"), 
      }
     })
      if (res.data.message === "success") {
        toast.success("Post deleted successfully");
        queryClient.invalidateQueries({ queryKey: ['userPosts'] });

      }
    console.log(res);
    }
    catch (err) {
      toast.error("Failed to delete post");
    }
  }
  return (
    <Button className="bg-slate-800 text-white hover:bg-red-600 w-full cursor-pointer" onClick={()=>deletePost()}>
      Delete Post
    </Button>
  );
}
