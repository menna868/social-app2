import React from 'react'
import './UpdatePost.module.css'
"use client";
import { Button, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from "react-hot-toast";
import { useQueryClient } from '@tanstack/react-query';
export default function UpdatePost({ postId }) {
  let queryClient =  useQueryClient();
  const form = useForm({
    defaultValues: {
      body: "",
      image: "",
    },
  });
  const { register, handleSubmit } = form;
  async function updatePost(value) {
    console.log(value);
    let mydata = new FormData();
    mydata.append("body", value.body);
    mydata.append("image", value.image[0]);
    await axios
      .put(
        `https://linked-posts.routemisr.com/posts/${postId}`,
        mydata,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      )
      .then((res) => {
        if (res.data.message === "success") {
          toast.success("Post updated successfully");
          queryClient.invalidateQueries({ queryKey: ['userPosts'] });
        }
        console.log(res);
      })
      .catch((err) => {
        toast.error("There was an error updating the post");
        console.log(err);
      });
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
        Update Post
      </Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <ModalHeader />
        <ModalBody>
          <form onSubmit={handleSubmit(updatePost)}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center text-pink-500">
                Update Post
              </h3>
              <div>
                      <TextInput
                        {...register("body")}
                        type="text"
                        placeholder="post content"
                        className="customInput"
                        required
                      />
                    </div>
            
                    <div className="flex items-center gap-2 mx-auto p-4 ">
                      <TextInput id="photo" type="file" required className="hidden"{...register("image")} />
                      <div className="mb-2 mx-auto ">
                        <Label htmlFor="photo">
                          <i className="fa-regular fa-image fa-2xl cursor-pointer"></i>
                        </Label>
                      </div>
                    </div>
           
              <div className="w-full ">
                <Button
                  className="w-full bg-pink-500 rounded-md hover:bg-slate-900 cursor-pointer duration-150"
                  type="submit"
                >
                  Update Post
                </Button>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
