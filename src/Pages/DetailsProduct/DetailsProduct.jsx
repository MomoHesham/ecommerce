import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishContext } from "../../Context/WishContext";

export default function DetailsProduct() {
  const { addProductWish, getAllWishProduct,removeProductWish } = useContext(WishContext);
  const [iconWishColor, setIconWishColor] = useState(false);
  const [getId, setGetId] = useState([])
  const [getWishData, setGetWishData] = useState([]);
  const [getWish, setGetWish] = useState([]);
  const { addProductToCart, setGetCartCount } = useContext(CartContext);
  async function addToCart(id) {
    let { data } = await addProductToCart(id);
    toast.success(data.message + " 🚚", {
      position: "bottom-right",
      className: "bg-main text-white",
    });
    setGetCartCount(data.numOfCartItems);
  }
  async function removeFromWish(id) {
    let { data } = await removeProductWish(id)
    toast.success(data.message + " 💔", {
      position: "top-right",
      className: "bg-main text-white",
    });

  }
  async function toggleWish(id) {
    if (iconWishColor === true) {
      // setWishColor(data.data)
      removeFromWish(id);
      setIconWishColor(false);
    } else {
      addToWish(id)
      setIconWishColor(true)
    }
   
  
   
  }
  async function addToWish(id) {
    let { data } = await addProductWish(id);
      toast.success(data.message + " ❤️", {
        position: "top-right",
        className: "bg-main text-white",
      });
      setGetWishData(data.data);
  }
  async function wishData() {
    const newArray=[]
    let { data } = await getAllWishProduct();
    setGetWish(data.data);

    for (let i = 0; i < data.data.length; i++) {
      newArray.push(data.data[i]._id)
      setGetId(newArray);
      if (newArray.includes(id)) {
        setIconWishColor(true);
      }
    }
  }
  const [productDetails, setProductDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let { id } = useParams();
  async function getProductDetails() {
    setIsLoading(true);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setProductDetails(data.data);
    setIsLoading(false);
  }
  useEffect(() => {
    getProductDetails();
    wishData();
  }, []);
  const settings = {
    customPaging: function (i) {
      return (
        <img src={productDetails.images[i]} className="w-100 rounded-circle" />
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="container my-5 py-5">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="row justify-content-center align-items-center" key={id}>
          <div className="col-md-4">
            <div className="slider-container">
              <Slider {...settings}>
                {productDetails.images.map((image) => (
                  <img src={image} alt="" />
                ))}
              </Slider>
            </div>
            {/* <img src={productDetails.imageCover} className="w-100" alt="" /> */}
          </div>
          <div className="col-md-7">
            <h3 className="fw-bold">{productDetails.title}</h3>
            <p>{productDetails.description}</p>
            <p>{productDetails.price} EGP</p>
            <button
              className="btn bg-main w-100 text-white"
              onClick={() => addToCart(id)}
            >
              Add To Cart
            </button>
          </div>
          <div className="col-md-1">
            <div>
              <i className="fa-solid fa-star mx-2 rating-color"></i>
              {productDetails.ratingsAverage}
            </div>
            <div className="text-center">
              <i
                className={`fa-solid fa-heart fa-2xl my-4 ${
                  iconWishColor ? "text-danger" : ""
                }`}
                onClick={() => toggleWish(productDetails.id)}
              ></i>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
