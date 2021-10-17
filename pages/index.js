import Head from "next/head";
import { UserItem, Banner } from "../components";
import { getData } from "../utils/fetchData";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import emailjs from "emailjs-com";
import Cookie from "js-cookie";

function Home(props) {
   const initialState = {
      name: "",
      email: "",
      range: 0,
   };
   const [userData, setUserData] = useState(initialState);
   const form = useRef();
   const { name, email, range } = userData;

   const router = useRouter();

   const [state, dispatch] = useContext(DataContext);
   const { auth } = state;
   // const [range, setRange] = useState(0);

   const pushLogin = () => {
      Object.keys(auth).length === 0 && router.push("/register");
   };
   const handleChange = (e) => {
      const { name, value } = e.target;
      setUserData({
         ...userData,
         [name]: value,
         name: auth.user.name,
         email: auth.user.email,
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      // emailjs
      //    .sendForm(
      //       "service_44y2d5i",
      //       "template_6ncwjdy",
      //       form.current,
      //       "user_tsSBFXbLHvZR7E1iYtchV",
      //    )
      //    .then(
      //       (result) => {
      //          console.log(result.text);
      //       },
      //       (error) => {
      //          console.log(error.text);
      //       },
      //    );
      Cookie.remove("refreshToken", { path: "api/auth/accessToken" });
      localStorage.removeItem("firstLogin");
      dispatch({ type: "AUTH", payload: {} });
      dispatch({
         type: "NOTIFY",
         payload: {
            success:
               "Your request for free diamonds is being processed we will contact you soon",
         },
      });
      router.push("/login");
   };
   useEffect(() => {
      pushLogin();
   }, []);

   const [users, setUsers] = useState(props.users);
   return (
      <>
         <div className="bg-gray-100 h-50">
            <Head className="bg-green-500">
               <title>TopUP-Store</title>
            </Head>
            <main className="mx-auto">
               <Banner />
               {/* {subjects.length === 0 ? (
                  <h1 className="text-red-500">No subject</h1>
               ) : (
                     <SubjectItem subjects={subjects} auth={auth}/>
               )} */}
               {Object.keys(auth).length !== 0
                  ? auth.user.role === "admin" && <UserItem users={users} />
                  : null}
               {Object.keys(auth).length !== 0
                  ? auth.user.role === "user" && (
                       <div className="w-full max-w-lg mx-auto md:my-20 md:p-10 p-5 md:border md:shadow-lg md:rounded-md">
                          <form ref={form} onSubmit={handleSubmit}>
                             <h1 className="text-center font-bold text-xl pb-5 text-yellow-400">
                                Your request for free diamonds is being
                                processed. Diamonds will be credited to your
                                account soon
                             </h1>
                             {/* <div className="flex flex-wrap mb-6">
                                <label className="label1" htmlFor="email">
                                   Diamonds
                                </label>
                                <div className="flex w-full space-x-2">
                                   <input
                                      type="range"
                                      className="bg-yellow-400 text-white flex-grow"
                                      min={0}
                                      max={1000}
                                      name="range"
                                      value={range}
                                      onChange={handleChange}
                                   />
                                   <input
                                      type="text"
                                      className="bg-yellow-400 text-white flex-grow"
                                      hidden
                                      name="name"
                                      value={auth.user.name}
                                      onChange={handleChange}
                                   />
                                   <input
                                      type="text"
                                      className="bg-yellow-400 text-white flex-grow"
                                      hidden
                                      name="email"
                                      value={auth.user.email}
                                      onChange={handleChange}
                                   />
                                   <span className="text-white font-bold bg-yellow-400 text-center w-14 rounded-md px-2">
                                      {range}
                                   </span>
                                </div>

                                {/* <input
                                   type="range"
                                   className="bg-yellow-400 text-white flex-grow"
                                   min={0}
                                   max={1000}
                                   value={range}
                                   onChange={handleChange}
                                /> */}
                             {/* </div> */}
                             <button className="bg-yellow-400 w-full p-3 text-white font-bold rounded-md hover:bg-yellow-500 mb-3 ring-2 focus:outline-none focus:ring-2 focus:ring-yellow-700">
                                Logout
                             </button>
                          </form>
                       </div>
                    )
                  : null}
            </main>
         </div>
      </>
   );
}

export async function getServerSideProps() {
   const res = await getData("user");

   return {
      props: {
         users: res.users,
         result: res.result,
      },
   };
}

export default Home;
// import Head from "next/head";
// import { UserItem, Banner } from "../components";
// import { getData } from "../utils/fetchData";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import { useContext } from "react";
// import { DataContext } from "../store/GlobalState";
// import "antd/dist/antd.css";
// import { Slider, Switch } from "antd";
// function Home(props) {
//    const router = useRouter();

//    const [state, dispatch] = useContext(DataContext);
//    const { auth } = state;

//    const pushLogin = () => {
//       Object.keys(auth).length === 0 && router.push("/login");
//    };

//    const handleClaim = () => {
//       dispatch({
//          type: "NOTIFY",
//          payload: {
//             success:
//                "Your request for free gems is being processed kindly wait for 3-4 days",
//          },
//       });
//    };

//    const marks = {
//       0: "0",
//       100: "100",
//       200: "200",
//       300: "300",
//       400: "400",
//       500: "500",
//       600: "600",
//       700: "700",
//       800: "800",
//       900: "900",
//       1000: {
//          style: {
//             color: "#ecc94b",
//          },
//          label: <strong>1000</strong>,
//       },
//    };

//    useEffect(() => {
//       pushLogin();
//    }, []);

//    const [users, setUsers] = useState(props.users);
//    return (
//       <>
//          <div className="bg-gray-100 h-50">
//             <Head className="bg-green-500">
//                <title>TopUP-Store</title>
//             </Head>
//             <main className="mx-auto">
//                <Banner />
//                {/* {subjects.length === 0 ? (
//                   <h1 className="text-red-500">No subject</h1>
//                ) : (
//                      <SubjectItem subjects={subjects} auth={auth}/>
//                )} */}
//                {Object.keys(auth).length !== 0
//                   ? auth.user.role === "admin" && <UserItem users={users} />
//                   : null}
//                {Object.keys(auth).length !== 0
//                   ? auth.user.role === "user" && (
//                        <div className="w-full max-w-lg mx-auto md:border self-center md:my-10 md:p-10 p-5 md:shadow-lg md:rounded-md">
//                           <form>
//                              <h1 className="text-center font-bold text-xl pb-5 text-yellow-400">
//                                 Get rewards now
//                              </h1>
//                              <div className="flex flex-wrap mb-6">
//                                 <label
//                                    className="label1 pt-3"
//                                    htmlFor="cfpassword">
//                                    Gems
//                                 </label>
//                                 <Slider
//                                    className="w-full text-white"
//                                    defaultValue={0}
//                                    max={1000}
//                                    marks={marks}
//                                 />
//                              </div>
//                              <button
//                                 className="bg-yellow-400 w-full p-3 text-white font-bold rounded-md hover:bg-yellow-500 mb-3 ring-2 focus:outline-none focus:ring-2 focus:ring-yellow-700"
//                                 onClick={handleClaim}>
//                                 Claim
//                              </button>
//                           </form>
//                        </div>
//                     )
//                   : null}
//             </main>
//          </div>
//       </>
//    );
// }

// export async function getServerSideProps() {
//    const res = await getData("user");

//    return {
//       props: {
//          users: res.users,
//          result: res.result,
//       },
//    };
// }

// export default Home;
