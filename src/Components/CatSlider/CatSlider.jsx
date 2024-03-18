// import React, { useEffect, useState } from "react";
import "./CatSlider.module.css";
import Slider from "react-slick";
import axios from "axios";
import { useQuery } from "react-query";

export default function CatSlider() {
   function getCatSlider() {
     return axios.get("https://route-ecommerce.onrender.com/api/v1/categories");
  }

  const { data } = useQuery("catSlider", getCatSlider);
  // console.log(data);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
  };
  return (
    
    <div className="slider-container my-5">
      <Slider {...settings}>
        {data?.data.data.map(cat => (
          <div key={cat._id}>
            <img src={cat.image} className="w-100" style={{ height:300 +'px'}} alt={cat.name} />
            <h6 className=" text-main">{cat.name}</h6>
          </div>
        ))}
      </Slider>
    </div>
  );
}
