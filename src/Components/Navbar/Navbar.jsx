import React, { useContext } from "react";
import "./Navbar.module.css";
import logo from "./../../assets/images/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  let navigate = useNavigate();
  let { userToken, setUserToken } = useContext(UserContext);
  let {getCartCount}=useContext(CartContext)
  function logoutUser() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 fixed-top">
        <div className="container">
          <Link className="navbar-brand" href="#">
            <img to={""} src={logo} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userToken && (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
                <li className="nav-item">
                  <Link className="nav-link" to={""}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/products"}>
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/cart"}>
                    cart
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/wishlist"}>
                    Wishlist
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/brands"}>
                    Brands
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/categories"}>
                    Categories
                  </Link>
                </li>
              </ul>
            )}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <div className="social">
                <i className="mx-2 fab fa-facebook"></i>
                <i className="mx-2 fab fa-youtube"></i>
                <i className="mx-2 fab fa-twitter"></i>
                <i className="mx-2 fab fa-tiktok"></i>
              </div>
              {userToken ? (
                <>
                  <li className="nav-item cursor-pointer">
                    <Link to={"/cart"} className="nav-link position-relative">
                      <i className="fa-solid fa-cart-shopping fa-2x"></i>
                      <span className="position-absolute w-50 start-100 translate-middle badge rounded-pill bg-main">
                        {getCartCount}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item cursor-pointer">
                    <span className="nav-link" onClick={() => logoutUser()}>
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/login"}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"register"} className="nav-link">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
