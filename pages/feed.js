import Head from "next/head";
import { FeedItem } from "../components";
import { getData } from "../utils/fetchData";
import { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import { useRouter } from "next/router";

function Feed(props) {
   const [state, dispatch] = useContext(DataContext);
   const { auth } = state;
   const [feeds, setFeeds] = useState(props.feeds);
   const router = useRouter();
   if (Object.keys(auth).length === 0) router.push("/login");
   return (
      <div className="text-white font-bold">
         <Head>
            <title>Feed</title>
         </Head>
         <div>
            <FeedItem feeds={feeds} auth={auth} />
         </div>
      </div>
   );
}

export async function getServerSideProps() {
   const res = await getData("feed");

   return {
      props: {
         feeds: res.feeds,
         result: res.result,
      },
   };
}

export default Feed;
