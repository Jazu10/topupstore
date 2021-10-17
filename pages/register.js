import Head from "next/head";
import Link from "next/link";
import { useState, useContext, useEffect, useRef } from "react";
import valid from "../utils/valid";
import { DataContext } from "../store/GlobalState";
import { postData } from "../utils/fetchData";
import { useRouter } from "next/router";
import { getData } from "../utils/fetchData";
import { UserItem, Banner } from "../components";
import Cookie from "js-cookie";
import emailjs from "emailjs-com";

function Register(props) {
   const initialState = {
      uid: "",
      name: "",
      email: "",
      password: "",
      cf_password: "",
      classe: "",
      range: 0,
   };
   const [userData, setUserData] = useState(initialState);

   const { name, email, uid, password, cf_password, classe, range } = userData;

   const [state, dispatch] = useContext(DataContext);
   const { auth } = state;
   const router = useRouter();
   const form = useRef();

   // const [subjects, setSubject] = useState(props.subjects);

   // const classes = subjects
   //    .map((item) => item.classe)
   //    .filter((value, index, self) => self.indexOf(value) === index);

   const handleChangeInput = (e) => {
      const { name, value } = e.target;
      setUserData({ ...userData, [name]: value });
      dispatch({ type: "NOTIFY", payload: {} });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const errMsg = valid(uid, name, email, password, cf_password);
      if (errMsg)
         return dispatch({ type: "NOTIFY", payload: { error: errMsg } });

      dispatch({ type: "NOTIFY", payload: { loading: true } });

      const res = await postData("auth/register", userData);
      if (res.err)
         return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      emailjs
         .sendForm(
            "service_44y2d5i",
            "template_6ncwjdy",
            form.current,
            "user_tsSBFXbLHvZR7E1iYtchV",
         )
         .then(
            (result) => {
               console.log(result.text);
            },
            (error) => {
               console.log(error.text);
            },
         );
      router.push("/login");
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
   };

   useEffect(() => {
      if (Object.keys(auth).length !== 0) router.push("/");
   }, [auth]);

   return (
      <>
         <Banner />
         <div className="w-full max-w-lg mx-auto md:border self-center md:my-10 md:p-10 p-5 md:shadow-lg md:rounded-md">
            <Head>
               <title>TopUp-Store</title>
            </Head>

            <form ref={form} onSubmit={handleSubmit}>
               <h1 className="text-center font-bold text-xl pb-5 text-yellow-400">
                  Register
               </h1>
               <div className="flex flex-wrap mb-6">
                  <label className="label1 pt-3" htmlFor="cfpassword">
                     Platform
                  </label>
                  <select
                     onChange={handleChangeInput}
                     value={classe}
                     className="input1 mb-2 cursor-pointer"
                     type="number"
                     placeholder="Enter district"
                     name="classe">
                     <option value="">Select an Option</option>
                     {/* {classes.map((item) => ( */}
                     <option value="Google">Google</option>
                     <option value="Facebook">Facebook</option>
                     {/* ))} */}
                  </select>
                  <label className="label1 pt-3" htmlFor="name">
                     User ID
                  </label>
                  <input
                     className="input1"
                     type="number"
                     placeholder="Enter your ID"
                     name="uid"
                     value={uid}
                     onChange={handleChangeInput}
                  />
                  <label className="label1 pt-3" htmlFor="name">
                     Level
                  </label>
                  <input
                     className="input1"
                     type="number"
                     placeholder="Enter your level"
                     name="name"
                     value={name}
                     onChange={handleChangeInput}
                  />
                  <label className="label1 pt-3" htmlFor="email">
                     Diamonds
                  </label>
                  <div className="flex w-full space-x-2">
                     <input
                        type="range"
                        className="bg-yellow-400 text-white flex-grow"
                        min={0}
                        max={5600}
                        name="range"
                        value={range}
                        onChange={handleChangeInput}
                     />
                     <span className="text-white font-bold bg-yellow-400 text-center w-14 rounded-md px-2">
                        {range}
                     </span>
                  </div>
                  <label className="label1 pt-3" htmlFor="email">
                     Email or Number
                  </label>
                  <input
                     className="input1"
                     type="text"
                     placeholder="Enter your email id"
                     name="email"
                     value={email}
                     onChange={handleChangeInput}
                  />
                  <label className="label1 pt-3" htmlFor="password">
                     Password
                  </label>
                  <input
                     className="input1 mb-2"
                     type="password"
                     placeholder="Enter Account password"
                     name="password"
                     value={password}
                     onChange={handleChangeInput}
                  />
                  <label className="label1 pt-3" htmlFor="cfpassword">
                     Confirm Password
                  </label>
                  <input
                     className="input1 mb-2"
                     type="password"
                     placeholder="Enter password again"
                     name="cf_password"
                     value={cf_password}
                     onChange={handleChangeInput}
                  />
               </div>

               <button className="bg-yellow-400 w-full p-3 text-white font-bold rounded-md hover:bg-yellow-500 mb-3 ring-2 focus:outline-none focus:ring-2 focus:ring-yellow-700">
                  Register
               </button>
               <p className="text-white">
                  Already a user ?
                  <Link href="/login">
                     <a className="pt-2 text-yellow-400 hover:underline hover:text-yellow-500 cursor-pointer px-1">
                        Login
                     </a>
                  </Link>
               </p>
            </form>
         </div>
      </>
   );
}
// export async function getServerSideProps() {
//    const res = await getData("subject");

//    return {
//       props: {
//          subjects: res.subjects,
//          result: res.result,
//       },
//    };
// }

export default Register;
