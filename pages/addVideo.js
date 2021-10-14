import Head from "next/head";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import validVideo from "../utils/validVideo";
import { DataContext } from "../store/GlobalState";
import { postData } from "../utils/fetchData";
import { useRouter } from "next/router";
import { getData } from "../utils/fetchData";
import { storage } from "../utils/firebase";
import ProgressBar from "@ramonak/react-progress-bar";

function addVideo(props) {
   const initialState = {
      title: "",
      classe: "",
      subject: "",
      thumbnail: "",
      url: "",
      description: "",
   };
   const [videoData, setVideoData] = useState(initialState);

   const { title, classe, subject, thumbnail, url, description } = videoData;

   const [state, dispatch] = useContext(DataContext);
   const { auth } = state;
   const router = useRouter();

   const [subjects, setSubject] = useState(props.subjects);
   const [image, setImage] = useState("");
   const [video, setVideo] = useState("");
   const [imageProgress, setImageProgress] = useState(0);
   const [videoProgress, setVideoProgress] = useState(0);

   if (Object.keys(auth).length !== 0) {
      auth.user.role !== "admin" ? router.push("/") : null;
   }

   const classes = subjects
      .map((item) => item.classe)
      .filter((value, index, self) => self.indexOf(value) === index);
   const subjects1 = subjects
      .map((item) => item.title)
      .filter((value, index, self) => self.indexOf(value) === index);

   const handleChangeInput = (e) => {
      const { name, value } = e.target;
      setVideoData({ ...videoData, [name]: value });
      dispatch({ type: "NOTIFY", payload: {} });
   };

   const handleChangeImage = (e) => {
      if (e.target.files[0]) {
         setImage(e.target.files[0]);
      }
   };

   const handleUploadImage = (e) => {
      const uploadImageTask = storage.ref(`images/${image.name}`).put(image);
      uploadImageTask.on(
         "state_changed",
         (snapshot) => {
            const progress = Math.round(
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            );
            setImageProgress(progress);
         },
         (error) => {
            console.log(error);
         },
         () => {
            storage
               .ref("images")
               .child(image.name)
               .getDownloadURL()
               .then((imageurl) => {
                  setVideoData({ ...videoData, thumbnail: imageurl });
               });
         },
      );
   };

   const handleChangeVideo = (e) => {
      if (e.target.files[0]) {
         setVideo(e.target.files[0]);
      }
   };

   const handleUploadVideo = (e) => {
      const uploadVideoTask = storage.ref(`videos/${video.name}`).put(video);
      uploadVideoTask.on(
         "state_changed",
         (snapshot) => {
            const progress = Math.round(
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            );
            setVideoProgress(progress);
         },
         (error) => {
            console.log(error);
         },
         () => {
            storage
               .ref("videos")
               .child(video.name)
               .getDownloadURL()
               .then((videourl) => {
                  setVideoData({ ...videoData, url: videourl });
               });
         },
      );
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const errMsg = validVideo(
         title,
         classe,
         subject,
         thumbnail,
         url,
         description,
      );
      if (errMsg)
         return dispatch({ type: "NOTIFY", payload: { error: errMsg } });

      dispatch({ type: "NOTIFY", payload: { loading: true } });

      const res = await postData("auth/video", videoData);
      if (res.err)
         return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
   };

   return (
      <div className="w-full max-w-lg mx-auto md:border self-center md:my-10 md:p-10 p-5 md:shadow-lg md:rounded-md">
         <Head>
            <title>Add video</title>
         </Head>
         <form onSubmit={handleSubmit}>
            <h1 className="text-center font-bold text-xl pb-5 text-yellow-400">
               Add Video
            </h1>
            <div className="flex flex-wrap mb-6">
               <label className="label1 pt-3" htmlFor="class">
                  Class
               </label>
               <select
                  onChange={handleChangeInput}
                  value={classe}
                  className="input1 mb-2 cursor-pointer"
                  type="number"
                  placeholder="Enter district"
                  name="classe">
                  <option value="">Select an Option</option>
                  {classes.map((item) => (
                     <option key={item} value={item}>
                        {item}
                     </option>
                  ))}
               </select>
               <label className="label1 pt-3" htmlFor="subject">
                  Subject
               </label>
               <select
                  onChange={handleChangeInput}
                  value={subject}
                  className="input1 mb-2 cursor-pointer"
                  type="number"
                  placeholder="Enter district"
                  name="subject">
                  <option value="">Select an Option</option>
                  {subjects1.map((item) => (
                     <option key={item} value={item}>
                        {item}
                     </option>
                  ))}
               </select>
               <label className="label1" htmlFor="title">
                  Video title
               </label>
               <input
                  className="input1"
                  type="text"
                  placeholder="Enter video title"
                  name="title"
                  value={title}
                  onChange={handleChangeInput}
               />
               <label className="label1" htmlFor="description">
                  description
               </label>
               <textarea
                  className="input1"
                  type="text"
                  placeholder="Enter video description"
                  name="description"
                  value={description}
                  onChange={handleChangeInput}
               />
               <label className="label1 pt-3">thumbnail</label>
               <div className="flex flex-row space-x-2 md:space-x-10">
                  <input
                     className="input1"
                     type="file"
                     accept="image/*"
                     placeholder="add video"
                     name="image"
                     onChange={handleChangeImage}
                  />
                  <button
                     onClick={handleUploadImage}
                     type="button"
                     disabled={!image}
                     className="text-white bg-gray-700 rounded-md p-2">
                     Upload
                  </button>
               </div>
               <ProgressBar
                  completed={
                     imageProgress === 0
                        ? imageProgress
                        : !thumbnail
                        ? imageProgress - 2
                        : imageProgress
                  }
                  bgColor={thumbnail ? "#f2b400" : "#00FFFF"}
                  className="w-full my-2 justify-self-center pl-5"
               />
               <label className="label1 pt-3">Video Upload</label>
               <div className="flex flex-row space-x-2 md:space-x-10">
                  <input
                     className="input1"
                     type="file"
                     accept="video/*"
                     placeholder="add video"
                     name="image"
                     onChange={handleChangeVideo}
                  />
                  <button
                     onClick={handleUploadVideo}
                     type="button"
                     disabled={!video}
                     className="text-white bg-gray-700 rounded-md p-2">
                     Upload
                  </button>
               </div>
               <ProgressBar
                  completed={
                     videoProgress === 0
                        ? videoProgress
                        : !thumbnail
                        ? videoProgress - 5
                        : videoProgress
                  }
                  bgColor={url ? "#f2b400" : "#00FFFF"}
                  className="w-full my-2 pl-5 justify-self-center"
               />
            </div>
            <button className="bg-yellow-400 w-full p-3 text-white font-bold rounded-md hover:bg-yellow-500 mb-3 ring-2 focus:outline-none focus:ring-2 focus:ring-yellow-700">
               Add Video
            </button>
         </form>
      </div>
   );
}
export async function getServerSideProps() {
   const res = await getData("subject");

   return {
      props: {
         subjects: res.subjects,
         result: res.result,
      },
   };
}

export default addVideo;
