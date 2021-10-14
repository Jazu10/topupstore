import Head from "next/head";
import { useState, useContext } from "react";
import { getData } from "../../utils/fetchData";
import Image from "next/image";
import { DataContext } from "../../store/GlobalState";
import { addToCart } from "../../store/Actions";

function product(props) {
   const [product] = useState(props.product);
   const [tab, setTab] = useState(0);
   const [state, dispatch] = useContext(DataContext);
   const { cart } = state;

   return (
      <div className="m-5 md:m- md:mt-16">
         <Head>
            <title>Product Details</title>
         </Head>
         <main className="max-w-screen-2xl mx-auto mt-5">
            <div className="flex flex-wrap">
               <div className="px-5 mb-7 w-full md:w-7/12">
                  <div className="w-full mb-4">
                     <Image
                        className="w-full rounded-lg image"
                        width={800}
                        height={500}
                        objectFit="cover"
                        src={product.images[tab].url}
                        alt=""
                     />
                  </div>
                  <div className="flex items-center">
                     {product.images.map((img, index) => (
                        <div key={index} className="mr-3 mb-3 cursor-pointer">
                           <Image
                              key={index}
                              src={img.url}
                              width={100}
                              height={100}
                              objectFit="cover"
                              className="image"
                              style={{ height: "80px", width: "20%" }}
                              onClick={() => setTab(index)}
                           />
                        </div>
                     ))}
                  </div>
               </div>
               <div className="px-5 mb-10 w-full md:w-5/12 md:min-h-screen">
                  <p className="font-serif text-xl text-black">
                     {product.category}
                  </p>
                  <h1 className="my-2 text-5xl text-green-500 mb-7">
                     {product.title}
                  </h1>
                  <p className="text-gray-600 text-base mb-5 text-justify">
                     {product.description}
                  </p>
                  <p>
                     <b>
                        {product.inStock > 0 ? (
                           <span className="text-green-500">
                              {`Available in Stock :${product.inStock}`}
                           </span>
                        ) : (
                           <span className="text-red-500">Out of Stock!</span>
                        )}
                     </b>
                  </p>
                  <p className="text-red-500 text-2xl mb-7">
                     ₹ {product.price}
                  </p>
                  {product.inStock > 0 ? (
                     <button
                        onClick={() => dispatch(addToCart(product, cart))}
                        className="w-full button mt-4 hover:from-green-600">
                        Buy Now
                     </button>
                  ) : (
                     <button
                        disabled
                        className="w-full button1 mt-4 hover:from-red-600 cursor-not-allowed opacity-50">
                        Buy Now
                     </button>
                  )}
               </div>
            </div>
         </main>
      </div>
   );
}

export async function getServerSideProps({ params: { id } }) {
   const res = await getData(`product/${id}`);
   return {
      props: {
         product: res.product,
      },
   };
}

export default product;
