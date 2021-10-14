import Feed from "./Feed";
function FeedItem({ feeds, auth }) {
   return (
      <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:-mt-64 md:-mt-28">
         {feeds.map(({ _id, title, classe, matter }) => (
            <Feed
               key={_id}
               id={_id}
               title={title}
               classe={classe}
               matter={matter}
               auth={auth}
            />
         ))}
      </div>
   );
}

export default FeedItem;
