// import React, { useEffect, useState } from "react";
import "./FeaturedProducts.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import Loader from "../Loader/Loader";

import ProductItem from "../ProductItem/ProductItem";
import ProductSearch from './../ProductSearch/ProductSearch';

export default function FeaturedProducts() {
  function getAllProduct() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  let { data, isLoading } = useQuery("featuredProducts", getAllProduct);

  // console.log(x);

  return (
    <div>
      {isLoading ? (
        <Loader />
        ) : (
          <>
            <ProductSearch getAllProduct={getAllProduct} />
          
            </>
      )}
    </div>
  );

  // const [allProducts, setAllProducts] = useState([]);
  // async function getAllProducts() {
  //   const { data } = await axios.get(
  //     "https://route-ecommerce.onrender.com/api/v1/products"
  //   );
  //   console.log(data.data);
  //   setAllProducts(data.data);
  // }
  // useEffect(() => {
  //   getAllProducts();
  // }, []);

  // return (
  //   <div className="row gy-3 gx-2">
  //     {allProducts.map(product => (
  //       <div className="col-md-2 product">
  //         <img src={product.imageCover} className="w-100" alt="" />
  //         <h6 className=" text-main">{ product.category.name}</h6>
  //         <h2 className="h5">{product.title.split(' ').splice(0,2).join(' ')}</h2>
  //         <div className="d-flex justify-content-between">
  //           <p>${product.price} EGP</p>
  //           <div>
  //           <i className="fa-solid fa-star mx-2 rating-color"></i>{product.ratingsAverage}
  //           </div>
  //         </div>
  //         <button className="btn bg-main text-white w-100 my-2">Add to cart</button>
  //       </div>
  //     ))}
  //    </div>
  // );
}
