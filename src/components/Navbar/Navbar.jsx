import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar as Nav,
  NavbarBrand,

} from "flowbite-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";



export default function Navbar() {
  let navigate=useNavigate()
let { LoginUser, setLoginUser } = useContext(UserContext);
  function signout() {
    localStorage.removeItem("userToken");
    setLoginUser(null);
    navigate("/login");
  }


   function getuserData() {
     return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
       headers: {
         token: localStorage.getItem("userToken"),
       },
     });
   }
   let { data, isError, isLoading, error } = useQuery({
     queryKey: ["userData"],
     queryFn: getuserData,
     select: (data) => data?.data?.user,
   });
  console.log(data);
  
  return (
    <Nav fluid rounded className="bg-gray-600 px-4 py-2.5 dark:bg-gray-800">
      <NavbarBrand as={Link} to="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold   text-pink-500">
          Social App
        </span>
      </NavbarBrand>

      <div className="flex md:order-2  ">
        {LoginUser !== null ? (
          <>
            {" "}
            <Dropdown
              arrowIcon={false}
              inline
              label={<Avatar alt="User settings" img={data?.photo} rounded />}
            >
              <DropdownHeader>
                <span className="block text-sm">{data?.name}</span>
                <span className="block truncate text-sm font-medium">
                  {data?.email}
                </span>
              </DropdownHeader>
              <DropdownItem as={Link} to="/profile">
                profile
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem>
                <span onClick={signout} className="cursor-pointer">
                  Signout
                </span>
              </DropdownItem>{" "}
            </Dropdown>
          </>
        ) : (
          <>
            {" "}
            <ul className="text-white flex items-center gap-4 m-4 ">
              <li>
                <Link to="login">Login</Link>
              </li>
              <li>
                <Link to="register">Register</Link>
              </li>
            </ul>
          </>
        )}
      </div>
    </Nav>
  );
}
