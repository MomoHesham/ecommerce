import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import Loader from "../../Components/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";


export default function Cart() {
  const {
    getProductCart,
    updateProductCart,
    removeProductCart,
    removeAllCart,
    setGetCartCount,
    setError,
    error,
  } = useContext(CartContext);
  const [getCartDetail, setGetCartDetail] = useState({});
  const [getAllCart, setGetAllCart] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  async function getCart() {
    if (!error) {
      setIsLoading(true);
      let { data } = await getProductCart();
      // console.log(data);
      // setIsLoading(false);
      // setGetCartDetail(data);
      // setGetCartCount(data?.numOfCartItems);
    } else {
      // setGetCartDetail({});
      console.log(error);
    }
  }
  async function updateCart(id, count) {
    await updateProductCart(id, count);
    if (count === 0) {
      removeCartProduct(id);
    }
    getCart();
  }
  useEffect(() => {
    getCart();
  }, []);

  async function removeCartProduct(id) {
    await removeProductCart(id);
    getCart();
  }
  async function delAllCart() {
    let { data } = await removeAllCart();
    console.log("Hello remove All Cart");
    console.log(data);
    navigate("/");
  }
  return (
    <div className="container  my-5 py-5">
      <div className="bg-body-secondary p-3">
        {console.log("data", getCartDetail)}
        {console.log("All Cart", getAllCart)}
        {/* {console.log("Error",error)} */}
        <h1>Cart Shop:</h1>

        {getCartDetail?.numOfCartItems === 0 || error ? (
          <h4 className="fw-bold my-4">Cart Is Empty</h4>
        ) : (
          <>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <div className="row  align-items-center">
                  <div className="col-md-6">
                    <p className="fw-bold text-black">
                      Total Number of Items:
                      <span className="text-main ms-2">
                        {getCartDetail.numOfCartItems}
                      </span>
                    </p>
                    <p className="fw-bold text-black">
                      Total Price:{" "}
                      <span className="text-main ms-2">
                        {getCartDetail.data?.totalCartPrice} EGP
                      </span>
                    </p>
                  </div>
                  <div className="col-md-6 d-flex justify-content-center">
                    <Link to={"/checkout"} className="btn bg-main text-white">
                      Checkout
                    </Link>
                  </div>
                </div>
                {getCartDetail.data?.products.map((product) => (
                  <div
                    className="row gy-2 align-items-center justify-content-center text-center text-md-start border-bottom mx-3 my-4 pb-4"
                    key={product.product.id}
                  >
                    <div className="col-md-2">
                      <img
                        src={product.product.imageCover}
                        className="w-100"
                        alt=""
                      />
                    </div>
                    <div className="col-md-7">
                      <h5 className="fw-bold">{product.product.title}</h5>
                      <p className="fw-bold">{product.price} EGP</p>
                      <div
                        className="text-danger fw-bold cursor-pointer"
                        onClick={() => removeCartProduct(product.product.id)}
                      >
                        <i className="fa-solid fa-trash"></i> Remove
                      </div>
                    </div>
                    <div className="col-md-3 text-md-end text-center">
                      <button
                        className=" my-btn-outline rounded-3 update-count "
                        onClick={() =>
                          updateCart(product.product.id, product.count + 1)
                        }
                      >
                        +
                      </button>
                      <span className="mx-2">{product.count}</span>
                      <button
                        className=" my-btn-outline rounded-3 update-count"
                        onClick={() =>
                          updateCart(product.product.id, product.count - 1)
                        }
                      >
                        -
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  className="my-btn-outline rounded-3 p-2 d-block ms-auto"
                  onClick={delAllCart}
                >
                  Clear my Cart
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
