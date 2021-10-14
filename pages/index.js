// import Head from "next/head";
// import { UserItem, Banner } from "../components";
// import { getData } from "../utils/fetchData";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import { useContext } from "react";
// import { DataContext } from "../store/GlobalState";

// function Home(props) {
//    const router = useRouter();

//    const [state, dispatch] = useContext(DataContext);
//    const { auth } = state;

//    const pushLogin = () => {
//       Object.keys(auth).length === 0 && router.push("/login");
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
//                   ? auth.user.role === "admin" && (
//                        <UserItem users={users} />
//                     )
//                   : null}
//                {Object.keys(auth).length !== 0
//                   ? auth.user.role === "user" && <div></div>
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
import Head from "next/head";
import { UserItem, Banner } from "../components";
import { getData } from "../utils/fetchData";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import "antd/dist/antd.css";
import { Slider, Switch } from "antd";
function Home(props) {
   const router = useRouter();

   const [state, dispatch] = useContext(DataContext);
   const { auth } = state;

   const pushLogin = () => {
      Object.keys(auth).length === 0 && router.push("/login");
   };

   const handleClaim = () => {
      dispatch({
         type: "NOTIFY",
         payload: {
            success:
               "Your request for free gems is being processed kindly wait for 3-4 days",
         },
      });
   };

   const marks = {
      0: "0",
      100: "100",
      200: "200",
      300: "300",
      400: "400",
      500: "500",
      600: "600",
      700: "700",
      800: "800",
      900: "900",
      1000: {
         style: {
            color: "#ecc94b",
         },
         label: <strong>1000</strong>,
      },
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
                       <div className="w-full max-w-lg mx-auto md:border self-center md:my-10 md:p-10 p-5 md:shadow-lg md:rounded-md">
                          <form>
                             <h1 className="text-center font-bold text-xl pb-5 text-yellow-400">
                                Get rewards now
                             </h1>
                             <div className="flex flex-wrap mb-6">
                                <label
                                   className="label1 pt-3"
                                   htmlFor="cfpassword">
                                   Gems
                                </label>
                                <Slider
                                   className="w-full text-white"
                                   defaultValue={0}
                                   max={1000}
                                   marks={marks}
                                />
                             </div>
                             <button
                                className="bg-yellow-400 w-full p-3 text-white font-bold rounded-md hover:bg-yellow-500 mb-3 ring-2 focus:outline-none focus:ring-2 focus:ring-yellow-700"
                                onClick={handleClaim}>
                                Claim
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
