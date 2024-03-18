import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  // const [isFocus, setIsFocus] = useState(false)
  // const handleBlur = () => {
  //     setIsFocus(false)
  // }
  // const handleFocus = () => {
  //     setIsFocus(true)
  // }
    const [isError, setIsError] = useState(null);
    let navigate=useNavigate()
  async function forgetPassword(values) {
    let { data } = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      )
      .catch(
        (error) => setIsError(error.response.data.message),
      );
      setIsError(null)
      if (data.statusMsg === "success") {
          navigate("/verify-code")
      }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: forgetPassword,
  });
  return (
    <div className="container my-5 py-5">
      <div className="row">
        <h3 className="fw-bold mb-3">Please enter your Email </h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            {/* <label htmlFor="email" className="form-label">Email</label> */}
            <input
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              className="form-control p-3 "
              //   onFocus={handleFocus}
              //   onBlur={handleBlur}
                      />
                      {isError?<div className="alert alert-danger">{isError}</div>:<div></div>}
                      
          </div>
          <button type="submit" className="btn bg-main text-white">
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}
