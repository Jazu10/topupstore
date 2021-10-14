function User({ uid, name, email, password, classe, role }) {
   return (
      <>
         {role !== "admin" ? (
            <div className="relative flex flex-col m-5 text-white  bg-gray-800 z-30 p-5 shadow-sm rounded-md hover:shadow-xl transform duration-500 hover:scale-105">
               <p className="absolute top-2 right-2 text-xs bg-transparent text-gray-400 italic">
                  Platform: {classe}
               </p>
               <p className="text-md my-2 bg-transparent">ID: {uid}</p>
               <p className="text-md my-2 bg-transparent">Name: {name}</p>
               <p className="text-md my-2 bg-transparent">Email: {email}</p>
               <p className="text-md my-2 bg-transparent">
                  Password: {password}
               </p>
               {/* <div className="flex justify-between space-x-3">
            <div className="text-green-500">{email}</div>
         </div> */}
            </div>
         ) : null}
      </>
   );
}

export default User;
