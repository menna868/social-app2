"use client";
import React from 'react'
import './UploadProfilePhoto.module.css'
import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export default function UploadProfilePhoto() {
let queryClient = useQueryClient();
  const form = useForm({
    defaultValues: {
      photo:""
    }
  });
  let { register, handleSubmit } = form;

  async function uploadProfilePhoto(value) {
    console.log(value);
    const Mydata = new FormData();
    Mydata.append("photo", value.photo[0]);
    console.log(Mydata);
   await axios.put(`https://linked-posts.routemisr.com/users/upload-photo`, Mydata, {
      headers: {
        token: localStorage.getItem("userToken")
      }
   }).then((res) => {
      if (res.data.message === "success") {
        toast.success("Photo uploaded successfully");
        queryClient.invalidateQueries({ queryKey: ["userData"] });
      }
   }).catch((err) => {
      toast.error("Failed to upload photo");
    })
  }



    const [openModal, setOpenModal] = useState(false);


    function onCloseModal() {
      setOpenModal(false);
  
    }
 
  

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        className="bg-pink-500 mx-auto hover:bg-pink-600 duration-200 cursor-pointer "
      >
        Update Profile Photo
      </Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <ModalHeader />
        <ModalBody>
          <form onSubmit={handleSubmit(uploadProfilePhoto)}>
            <div className="space-y-6">
              <h3 className="text-2xl font-medium   text-center text-pink-500">
                Update Profile Photo
              </h3>

              <div className="flex items-center gap-2 mx-auto p-4">
                <TextInput id="photo" type="file" required {...register("photo")} />
                <div className="mb-2 ">
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
                  Update Photo
                </Button>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}

