import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishContext } from "../../Context/WishContext";

export default function ProductItem({ product ,inWishColor, setInWishColor}) {
  const { addProductToCart, setGetCartCount } = useContext(CartContext);
  const { addProductWish,setWishColor } = useContext(WishContext);
  const [iconWishColor, setIconWishColor] = useState(false);

  const [getWishData, setGetWishData] = useState([])

  
  async function addToCart(id) {
    let { data } = await addProductToCart(id);
    console.log(data.numOfCartItems);
    toast.success(data.message + " 🚚", {
      position: "bottom-right",
      className: "bg-main text-white",
    });
    setGetCartCount(data.numOfCartItems);
    
  }
  
  
  
  async function addToWish(id) {
    let { data } = await addProductWish(id);
    console.log(data);
    toast.success(data.message + " ❤️", {
      position: "top-right",
      className: "bg-main text-white",
    });
    setGetWishData(data.data)
    setWishColor(data.data)
    setIconWishColor(true);
 
  }
  
  return (
    <div className="col-md-2 product " key={product.id}>
     
      <Link
        to={"/ProductDetails/" + product.id}
        className="text-decoration-none link-dark"
      >
        <img src={product.imageCover} className="w-100" alt="" />
        <h6 className=" text-main">{product.category.name}</h6>
        <h2 className="h6 fw-bold">
          {product.title.split(" ").splice(0, 2).join(" ")}
        </h2>
        <div className="d-flex justify-content-between">
          <p>${product.price} EGP</p>
          <div>
            <div>
              <i className="fa-solid fa-star mx-2 rating-color"></i>
              {product.ratingsAverage}
            </div>
          </div>
        </div>
      </Link>
      <div className="text-end" onClick={() => addToWish(product.id)}>
        <i className={`fa-solid fa-heart fa-2x ${iconWishColor? "text-danger": ""}`}></i>
      </div>
      <button
        className="btn bg-main text-white w-100 my-2"
        onClick={() => addToCart(product.id)}
      >
        Add to cart
      </button>
    </div>
  );
}
