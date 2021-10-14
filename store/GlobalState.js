import { createContext, useReducer, useEffect } from "react";
import reducers from "./Reducers";
import { getData } from "../utils/fetchData";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
   const initialState = { notify: {}, auth: {}, cart: [],subject:{} };
   const [state, dispatch] = useReducer(reducers, initialState);
   const { cart } = state;

   useEffect(() => {
      const firstLogin = localStorage.getItem("firstLogin");
      if (firstLogin) {
         getData("auth/accessToken").then((res) => {
            if (res.err) return localStorage.removeItem("firstLogin");
            dispatch({
               type: "AUTH",
               payload: {
                  token: res.access_token,
                  user: res.user,
               },
            });
         });
      }
   }, []);

   useEffect(() => {
      const __next__cart01__jaseem = JSON.parse(
         localStorage.getItem("__next__cart01__jaseem"),
      );
      if (__next__cart01__jaseem)
         dispatch({ type: "TO_CART", payload: __next__cart01__jaseem });
   }, []);

   useEffect(() => {
      localStorage.setItem("__next__cart01__jaseem", JSON.stringify(cart));
   }, [cart]);

   return (
      <DataContext.Provider value={[state, dispatch]}>
         {children}
      </DataContext.Provider>
   );
};
