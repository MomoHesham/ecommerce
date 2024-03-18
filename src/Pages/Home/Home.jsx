import React from 'react'
import "./Home.module.css"
import FeaturedProducts from '../../Components/FeaturedProducts/FeaturedProducts';
import CatSlider from '../../Components/CatSlider/CatSlider';
import MainSlider from '../../Components/MainSlider/MainSlider';

export default function Home() {


  return (
    <div className='container'>
      <MainSlider/>
      <CatSlider/>
     <FeaturedProducts/>
   </div>
  );
}
