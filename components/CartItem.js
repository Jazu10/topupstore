import Link from "next/link";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { decrease, increase } from "../store/Actions";

function CartItem({ item, dispatch, cart }) {
   return (
      <div className="grid grid-cols-3 md:grid-cols-5 border-b border-gray-300 pb-5">
         <Image
            src={item.images[0].url}
            height={200}
            width={200}
            objectFit="contain"
         />
         <div className="col-span-2 md:col-span-3 flex-col items-center mx-5">
            <Link href={`/product/${item._id}`}>
               <p className="link hover:text-red-500 font-bold ">
                  {item.title}
               </p>
            </Link>
            <p className="text-red-500 font-bold">₹{item.price}</p>
            {item.inStock > 0 ? (
               <p className="text-red-500">Stock : {item.inStock} </p>
            ) : (
               <p className="text-red-500">Out of Stock</p>
            )}

            <div className="flex space-y-2 md:hidden">
               <>
                  <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                     <button
                        onClick={() => dispatch(decrease(cart, item._id))}
                        disabled={item.quantity === 1 ? true : false}
                        className="focus:outline-none bg-gray-300 w-10 md:w-20 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full rounded-l cursor-pointer outline-none">
                        <span className="m-auto text-2xl">−</span>
                     </button>
                     <div
                        type="number"
                        className=" focus:outline-none md:w-20 text-center flex items-center bg-gray-300 font-semibold text-md hover:text-black focus:text-black text-gray-700  outline-none">
                        <span className="m-auto text-xl font-bold">
                           {item.quantity}
                        </span>
                     </div>
                     <button
                        onClick={() => dispatch(increase(cart, item._id))}
                        disabled={item.quantity === item.inStock ? true : false}
                        className="focus:outline-none bg-gray-300 w-10 md:w-20 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full rounded-r cursor-pointer">
                        <span className="m-auto text-2xl">+</span>
                     </button>
                  </div>
               </>
               <MdDelete
                  size={40}
                  className="self-center justify-self-end text-red-500 hover:text-red-600"
               />
            </div>
         </div>
         <div className="hidden space-y-2 md:flex">
            <>
               <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                  <button
                     onClick={() => dispatch(decrease(cart, item._id))}
                     disabled={item.quantity === 1 ? true : false}
                     className="focus:outline-none bg-gray-300 w-10 md:w-20 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full rounded-l cursor-pointer outline-none">
                     <span className="m-auto text-2xl">−</span>
                  </button>
                  <div
                     type="number"
                     className=" focus:outline-none md:w-20 text-center flex items-center bg-gray-300 font-semibold text-md hover:text-black focus:text-black text-gray-700  outline-none">
                     <span className="m-auto text-2xl font-bold">
                        {item.quantity}
                     </span>
                  </div>
                  <button
                     onClick={() => dispatch(increase(cart, item._id))}
                     disabled={item.quantity === item.inStock ? true : false}
                     className="focus:outline-none bg-gray-300 w-10 md:w-20 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full rounded-r cursor-pointer">
                     <span className="m-auto text-2xl">+</span>
                  </button>
               </div>
            </>
         </div>
      </div>
   );
}

export default CartItem;
