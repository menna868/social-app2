import React from 'react'
import './CreateCommentModal.module.css'
"use client";
import { Button, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from "react-hot-toast";
import { useQueryClient } from '@tanstack/react-query';

export default function CreateCommentModal({ postId }) {
  let queryclient = useQueryClient();
  const form = useForm({
    defaultValues: {
      content: "",
      post: postId,
   }
  })
  const { register,handleSubmit} = form;
  async function addComment(value) {
   
    try {
     let res= await axios.post(`https://linked-posts.routemisr.com/comments`,value,{
      headers: {
        token: localStorage.getItem("userToken"), 
      }
     })
      if (res.data.message === "success") {
        toast.success("Comment added successfully");
        queryclient.invalidateQueries( ["getPosts"] );
      }
    console.log(res);
    }
    catch (err) {
      toast.error("Failed to add comment");
    }
  }

  const [openModal, setOpenModal] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
    form.reset();
  }

  return (
    <>
      <Button
        className="bg-slate-800 text-white hover:bg-slate-600 w-full cursor-pointer"
        onClick={() => setOpenModal(true)}
      >
        Add Comment
      </Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <ModalHeader />
        <ModalBody>
          <form onSubmit={handleSubmit(addComment)}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center text-pink-500">
                Add Comment
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="comment">Add Comment</Label>
                </div>
                <TextInput
                  {...register("content")}
                  id="comment"
                  type="text"
                  required
                />
              </div>
              <div>
                <TextInput
                  type="hidden"
                  required
                  {...register("post")}
                  value={postId}
                />
              </div>
              <div className="w-full ">
                <Button
                  className="w-full bg-pink-500 rounded-md hover:bg-slate-900 cursor-pointer duration-150"
                  type="submit"
                >
                  Add Comment
                </Button>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}

 
