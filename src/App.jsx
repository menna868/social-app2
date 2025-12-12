import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Notfound from "./components/Notfound/Notfound";
import { useState } from "react";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PostContextProvider from "./Context/PostContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PostDetails from './components/PostDetails/PostDetails';
import  { Toaster } from "react-hot-toast";

function App() {
  const query = new QueryClient();
  const [mood, setmood] = useState(localStorage.getItem("mood"));
  function changeMood() {
    if (mood === "light") {
      setmood("dark");
      localStorage.setItem("mood", "dark");
    } else {
      setmood("light");
      localStorage.setItem("mood", "light");
    }
  }
  const x = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "postdetails/:id",
          element: <PostDetails />,
        },
        {
          path: "*",
          element: <Notfound />,
        },
      ],
    },
  ]);
  return (
    <>
      <div
        className={`${
          mood === "light" ? "light-gradient " : "dark-gradient "
        } full-screen`}
      >
        <UserContextProvider>
          <PostContextProvider>
            <QueryClientProvider client={query}>
              <RouterProvider router={x}></RouterProvider>
              <Toaster/>
              <ReactQueryDevtools  />
            </QueryClientProvider>
          </PostContextProvider>
        </UserContextProvider>
      </div>
      <button
        onClick={() => changeMood()}
        className="fixed bottom-0 size-12 left-0 text-white cursor-pointer "
      >
        {mood === "light" ? (
          <i className="fas fa-moon fa-2x p-4"></i>
        ) : (
          <i className="fas fa-sun fa-2x p-4"></i>
        )}
      </button>
    </>
  );
}

export default App;
