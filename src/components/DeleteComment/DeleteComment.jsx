import React from 'react'
import './DeleteComment.module.css'
import { Button } from 'flowbite-react';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axios from 'axios';
export default function DeleteComment({ Id }) {
    let queryClient = useQueryClient();
    async function deleteComment() {
      console.log("Delete comment with ID:", Id);
      try {
        let res = await axios.delete(
          `https://linked-posts.routemisr.com/comments/${Id}`,
          {
            headers: {
              token: localStorage.getItem("userToken"),
            },
          }
        );
        if (res.data.message === "success") {
          toast.success("Comment deleted successfully");
queryClient.invalidateQueries({ queryKey: ["getSinglePost"] });
        }
        console.log(res);
      } catch (err) {
        toast.error("Failed to delete comment");
      }
    }
  return (
    <Button className="bg-slate-800 text-white hover:bg-red-600 w-full cursor-pointer" onClick={()=>deleteComment()}>
      <i className="fa-solid fa-trash" ></i>
    </Button>
  );
}
