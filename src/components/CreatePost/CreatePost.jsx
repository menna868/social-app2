import React from "react";
import "./CreatePost.module.css";
import {
  Button,
  Label,
  TextInput,
} from "flowbite-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

export default function CreatePost() {
  let form = useForm({
    defaultValues: {
      body: "",
      image:"",
    }
  })
  let { register, handleSubmit } = form;
  async function createPost(value) {
    let mydata = new FormData();
    mydata.append("body", value.body);
    mydata.append("image", value.image[0]);
   await axios.post(`https://linked-posts.routemisr.com/posts`, mydata, {
      headers: {
        token:localStorage.getItem("userToken")
      }
   }).then((res) => {
     if (res.data.message === "success") {
        toast.success("Post created successfully");
      }
      console.log(res);
   }).catch((err) => {
      toast.error("There was an error creating the post");
      console.log(err);
      });
  }
  return (
    <div className=" md:w-[50%] lg:w-[35%] rounded-md bg-pink-500 my-8  mx-auto p-4">
      <form onSubmit={handleSubmit(createPost)}>
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
            className="w-full rounded-md bg-slate-800 hover:bg-slate-700 cursor-pointer "
            type="submit"
          >
            Upload Post
          </Button>
        </div>
      </form>
    </div>
  );
}
