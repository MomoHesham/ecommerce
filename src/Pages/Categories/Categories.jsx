import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Loader from "../../Components/Loader/Loader";

export default function Categories() {
  const [allSubcat, setAllSubcat] = useState([]);
  const [getCatName, setGetCatName] = useState(" ");
  const [loader, setLoader] = useState(false);

  async function getSubCategories(id, catName) {
    setLoader(true);
    let { data } = await axios
      .get(
        `https://route-ecommerce.onrender.com/api/v1/categories/${id}/subcategories`
      )
      .then((response) => response)
      .catch((err) => err);
    //    console.log(data);
    // console.log(catName);
    setAllSubcat(data.data);
    setGetCatName(catName);
    setLoader(false);
  }
  function getAllCategories() {
    return axios
      .get("https://route-ecommerce.onrender.com/api/v1/categories")
      .then((response) => response)
      .catch((err) => err);
  }
  const { data, isLoading } = useQuery("categories", getAllCategories);
  //   console.log(data);
  return (
    <div className="container my-5 py-5">
      {console.log(allSubcat, getCatName)}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="row gy-4">
            {data?.data.data.map((cat) => (
              <div
                className="col-md-4"
                key={cat._id}
                onClick={() => getSubCategories(cat._id, cat.name)}
              >
                <div className="card bragat catCard overflow-hidden">
                  <div className="w-100 card-img">
                    <img
                      src={cat.image}
                      className="w-100 object-fit-cover"
                      alt=""
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title text-center">{cat.name}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="subCatContainer my-5">
            <h3 className="text-center text-main fw-bold">
              { getCatName +" subcategories"} 
            </h3>
            <div className="row gy-4">
              {loader ? (
                <Loader />
              ) : (
                allSubcat.map((subcat) => (
                  <div className="col-md-4" key={subcat._id}>
                    <div className="card bragat catCard overflow-hidden">
                      <div className="card-body">
                        <h5 className="card-title text-center">
                          {subcat.name}
                        </h5>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
