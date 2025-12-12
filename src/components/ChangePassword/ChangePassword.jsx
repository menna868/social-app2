"use client";
import React from 'react'
import './ChangePassword.module.css'
import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { useState } from "react"
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
export default function ChangePassword() {
   const [openModal, setOpenModal] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
    form.reset();
  }


   const form = useForm({
     defaultValues: {
       password: "",
       newPassword: "",
     },
   });
  const { register, handleSubmit } = form;
  async function ChangePassword(value) {
   console.log("hiiii",value);
   
   try {
     let res = await axios.patch(
       `https://linked-posts.routemisr.com/users/change-password`,
       value,
       {
         headers: {
           token: localStorage.getItem("userToken"),
         },
       }
     );
     if (res.data.message === "success") {
       toast.success("Password changed successfully");
       console.log(res.data);
       
     }
     console.log(res);
   } catch (err) {
     toast.error("Failed to change password");
     console.log(err);
     
   }
 }
  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        className="bg-pink-500 mx-auto hover:bg-pink-600 duration-200 cursor-pointer "
      >
        Change Password
      </Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <ModalHeader />
        <ModalBody>
          {" "}
          <form onSubmit={handleSubmit(ChangePassword)}>
            <div className="space-y-6">
              <h3 className="text-2xl font-medium   text-center text-pink-500">
                Change Your Password
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="pass">Your Password</Label>
                </div>
                <TextInput
                  {...register("password")}
                  id="pass"
                  type="text"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="newpassword">Your new password</Label>
                </div>
                <TextInput
                  id="newpassword"
                  type="text"
                  required
                  {...register("newPassword")}
                />
              </div>

              <div className="w-full">
                <Button
                  type="submit"
                  className="w-full bg-pink-500 rounded-md hover:bg-slate-900 cursor-pointer duration-150"
                >
                  Change Password
                </Button>
              </div>
            </div>{" "}
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}

