import { DataContext } from "../store/GlobalState";
import { useContext, useState } from "react";
import { getData } from "../utils/fetchData";
import Head from "next/head";
import { NoteItem } from "../components";

function notes(props) {
   const [state, dispatch] = useContext(DataContext);
   const { subject, auth } = state;
    const [files, setFiles] = useState(props.files);
    return (
       <>
          {Object.keys(auth).length !== 0 && (
             <div className="mx-auto">
                <Head>
                   <title>
                      {auth.user.classe}-{subject.title}
                   </title>
                </Head>
                <div>
                   {files.length === 0 ? (
                      <h1 className="text-red-500">No files</h1>
                   ) : (
                      <NoteItem
                         files={files}
                         auth={auth}
                         subjects={subject}
                      />
                   )}
                </div>
             </div>
          )}
       </>
    );
}

export async function getServerSideProps() {
   const res = await getData("file");
   return {
      props: {
         files: res.files,
      },
   };
}

export default notes;
