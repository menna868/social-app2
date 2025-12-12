import React from "react";
import "./UpdateComment.module.css";
("use client");
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
export default function UpdateComment({ commentId }) {
  let queryClient = useQueryClient();
  const form = useForm({
    defaultValues: {
      content: "",
    },
  });
  const { register, handleSubmit } = form;
  async function updateComment(value) {
    console.log(value);
    try {
      let res = await axios.put(`https://linked-posts.routemisr.com/comments/${commentId}`, value, {
        headers: {
          token: localStorage.getItem("userToken"),
        }
      });
      if (res.data.message === "success") {
        toast.success("Comment updated successfully");
        queryClient.invalidateQueries(["getPosts"]);
      }
console.log("resssss",res);

    }
    catch (err) {
      toast.error("There was an error updating the comment");
      
   
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
        <i
          className="fa-solid fa-pen cursor-pointer hover:text-pink-500"
         
        ></i>
      </Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <ModalHeader />
        <ModalBody>
          <form onSubmit={handleSubmit(updateComment)}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center text-pink-500">
                Update Comment
              </h3>
              <div>
                <TextInput
                  {...register("content")}
                  type="text"
                  placeholder="Comment content"
                  className="customInput"
                  required
                />
              </div>

              <div className="w-full ">
                <Button
                  className=" bg-pink-500 rounded-md hover:bg-slate-900 cursor-pointer duration-150"
                  type="submit"
                >
                  Update Comment
                </Button>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
