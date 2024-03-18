import React from "react";
import slideOne from "../../assets/images/sliderImages/slider-2.jpeg";
import slideTwo from "../../assets/images/sliderImages/slider-image-1.jpeg";
import slideThree from "../../assets/images/sliderImages/slider-image-2.jpeg";
import slideFour from "../../assets/images/sliderImages/slider-image-3.jpeg";
import Slider from "react-slick";
import "./MainSlider.module.css";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
  };
  return (
    <div className="row">
      <div className="col-8 pe-0">
        <div className="slider-container mainSliderImgs h-100">
          <Slider {...settings}>
            <img src={slideOne} height={500} className="w-100 " alt="" />
            <img src={slideTwo} height={500} className="w-100 " alt="" />
            <img src={slideThree} height={500} className="w-100 " alt="" />
            <img src={slideFour} height={500} className="w-100 " alt="" />
          </Slider>
        </div>
      </div>
      <div className="col-4 ps-0">
        <img src={slideTwo} height={250} className="w-100" alt="" />
        <img src={slideThree} height={250} className="w-100" alt="" />
      </div>
    </div>
  );
}
