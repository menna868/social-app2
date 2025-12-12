import React from 'react'
import './Footer.module.css'
import { Button } from "flowbite-react";

export default function Footer() {
  return (

    <div className="dark:bg-gray-800 fixed bottom-0 right-0 left-0 p-2 text-center bg-gray-600 text-white">
      Saved to{" "}
      <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-pink-500">
        {" "}
        <span className="relative text-white dark:text-gray-950">Menna's</span>
      </span>{" "}
      Copyright
    </div>
  );
}
