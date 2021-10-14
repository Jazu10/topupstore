import User from "./User";

function UserItem({ users }) {
   return (
      <div>
         <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:-mt-64 md:-mt-28">
            {users.map(({ _id, uid, name, email, password, classe, role }) => (
               <User
                  key={_id}
                  id={_id}
                  uid={uid}
                  name={name}
                  email={email}
                  password={password}
                  classe={classe}
                  role={role}
               />
            ))}
            <div className="h-20" />
         </div>
      </div>
   );
}

export default UserItem;
