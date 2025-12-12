import React from 'react'
import './Layout.module.css'
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="mx-auto container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
