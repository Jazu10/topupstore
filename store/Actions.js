const ACTIONS = {
   NOTIFY: "NOTIFY",
   AUTH: "AUTH",
   TO_CART: "TO_CART",
   SUBJECT: "SUBJECT",
};

export const addToCart = (product, cart) => {
   if (product.inStock === 0)
      return {
         type: "NOTIFY",
         payload: { error: "This product is not available at the moment." },
      };

   const check = cart.every((item) => {
      return item._id !== product._id;
   });


   if (!check)
      return {
         type: "NOTIFY",
         payload: { error: "Product already added to Cart" },
      };
   return {
      type: "TO_CART",
      payload: [...cart, { ...product, quantity: 1 }],
   };
};

export const decrease = (data, id) => {
   const newData = [...data];
   newData.forEach((item) => {
      if (item._id === id) item.quantity -= 1;
   });
   return { type: "TO_CART", payload: newData };
};
export const increase = (data, id) => {
   const newData = [...data];
   newData.forEach((item) => {
      if (item._id === id) item.quantity += 1;
   });
   return { type: "TO_CART", payload: newData };
};

export default ACTIONS;
