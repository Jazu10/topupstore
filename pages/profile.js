import { DataContext } from "../store/GlobalState";
import React, { useContext, useState, useEffect } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import Head from "next/head";

function profile() {
   const router = useRouter();

   const [state, dispatch] = useContext(DataContext);
   const { auth, cart } = state;
   const handleLogout = () => {
      Cookie.remove("refreshToken", { path: "api/auth/accessToken" });
      localStorage.removeItem("firstLogin");
      dispatch({ type: "AUTH", payload: {} });
      dispatch({
         type: "NOTIFY",
         payload: { success: "Successfully logged out!" },
      });
      router.push("/login");
   };

   const pushLogin = () => {
      Object.keys(auth).length === 0 && router.push("/login");
   };

   useEffect(() => {
      pushLogin();
   }, [auth]);
   

   return (
      <>
         {Object.keys(auth).length !== 0 && (
            <div className="w-full max-w-lg mx-auto md:my-20 p-10 md:border justify-center md:shadow-lg md:rounded-md">
               <Head>
                  <title>Profile</title>
               </Head>
               <div>
                  <img
                     src={auth.user.avatar}
                     className="mx-auto rounded-full bg-gray-400 h-44 w-44 mb-10"
                  />
                  <input
                     className="input1 mb-2"
                     type="password"
                     placeholder={auth.user.name}
                     name="name"
                  />
                  <input
                     className="input1 mb-2"
                     type="password"
                     placeholder={auth.user.classe}
                     name="class"
                  />
                  <button className="button w-full" onClick={handleLogout}>
                     Logout
                  </button>
               </div>
            </div>
         )}
      </>
   );
}

export default profile;
