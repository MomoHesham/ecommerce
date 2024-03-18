import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Loader from "../../Components/Loader/Loader";

export default function Brands() {
  function getBrands() {
    return axios
      .get("https://route-ecommerce.onrender.com/api/v1/brands")
      .then((response) => response)
      .catch((err) => err);
  }
  const { data, isLoading } = useQuery("brands", getBrands);
//   console.log(data);

  return (
      <div className="container my-5 py-5">
          <h1 className="text-main text-center fw-bolder">All Brands</h1>
      <div className="row gy-4">
        {isLoading ? (
          <Loader />
        ) : (
          data?.data.data.map((brand) => (
            <>
              <div className="col-md-3" key={brand._id}>
                <div
                  className="card bragat"
                  data-bs-toggle="modal"
                  data-bs-target={"#" + brand.name.split(' ').splice(0, 1).join(' ')}
                >
                  <div className="card-body">
                    <img src={brand.image} className="w-100" alt="" />
                    <h5 className="card-title text-center">{brand.name}</h5>
                  </div>
                </div>
                <div
                  className="modal fade"
                  id={brand.name.split(' ').splice(0, 1).join(' ')}
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="row align-items-center ">
                          <div className="col-6 ps-3">
                            <h2 className="text-main fw-bold fa-2x">{brand.name}</h2>
                            <h6>{brand.slug}</h6>
                          </div>
                          <div className="col-6">
                            <img src={brand.image} alt={brand.slug} className="w-100" />
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))
        )}
      </div>
    </div>
  );
}
