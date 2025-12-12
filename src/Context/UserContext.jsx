import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props){
    const [LoginUser, setLoginUser] = useState(localStorage.getItem("userToken"));
    // useEffect(() => {
    //     if (localStorage.getItem("userToken")) {
    //         setLoginUser(localStorage.getItem("userToken"))
    //     }
    // },[])
    return (
      <UserContext.Provider value={{LoginUser,setLoginUser}}>{props.children}</UserContext.Provider>
    );
    
    

}