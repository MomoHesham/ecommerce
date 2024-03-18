import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { WishContext } from "../../Context/WishContext";
import Loader from "../../Components/Loader/Loader";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function Wishlist() {
    let { getAllWishProduct, removeProductWish } = useContext(WishContext);
    let { addProductToCart, setGetCartCount} = useContext(CartContext)
  const [getWishData, setGetWishData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    function addCartRemoveWish(id) {
        addToCart(id);
        removeWishProduct(id)
    }
    async function addToCart(id) {
        let { data } = await addProductToCart(id);
        console.log(data.numOfCartItems);
        toast.success(data.message + " 🚚", {
          position: "bottom-right",
          className: "bg-main text-white",
        });
        setGetCartCount(data.numOfCartItems);
      }
  async function removeWishProduct(id) {
    await removeProductWish(id);
    getAllWish();
  }
  async function getAllWish() {
    setIsLoading(true);
    let { data } = await getAllWishProduct();
      console.log(data);
    setGetWishData(data.data);
    setIsLoading(false);
  }
  useEffect(() => {
    getAllWish();
  }, []);

  return (
    <div className="container my-5 py-5">
      <div className="bg-body-secondary p-3 py-5">
        <h1 className="mb-5">My Wish List</h1>
        {isLoading ? (
          <Loader />
        ) : (
          getWishData.map((wish) => (
            <div className="row align-items-center justify-content-center text-center text-md-start border-bottom mx-3 my-4 pb-4">
              <div className="col-md-2">
                <img src={wish.imageCover} className="w-100" alt="" />
              </div>
              <div className="col-md-7">
                <h5 className="fw-bold">{wish.title}</h5>
                <p className="fw-bold">{wish.price} EGP</p>
                <div
                  className="text-danger fw-bold cursor-pointer"
                  onClick={() => removeWishProduct(wish.id)}
                >
                  <i className="fa-solid fa-trash"></i> Remove
                </div>
              </div>
              <div className="col-md-3">
                <button type="button" class="my-btn-outline h4 p-2 rounded-3" onClick={()=>addCartRemoveWish(wish.id)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
