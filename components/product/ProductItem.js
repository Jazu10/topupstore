import Product from "./Product";

function ProductFeed({ products }) {
   return (
      <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:-mt-64 md:-mt-28">
         {products.map(
            ({ _id, title, price, description, category, images, inStock }) => (
               <Product
                  key={_id}
                  id={_id}
                  title={title}
                  price={price}
                  description={description}
                  category={category}
                  images={images}
                  inStock={inStock}
               />
            ),
         )}
         {/* <img
            className="md:col-span-full"
            src="https://links.papareact.com/dyz"
            alt=""
         /> */}
         <div className="h-20" />
      </div>
   );
}

export default ProductFeed;
