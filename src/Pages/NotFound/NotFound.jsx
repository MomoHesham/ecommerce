import React from 'react'
import "./NotFound.module.css"
import notFound from "../../assets/images/error.svg"


export default function NotFound() {
  return (
    <div className='container my-5 py-5 text-center'>
      <img className='w-75' src={notFound} alt="" />
    </div>
  )
}
