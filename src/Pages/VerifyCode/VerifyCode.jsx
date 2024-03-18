import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function VerifyCode() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  async function codeVerify(values) {
    let { data } = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      )
      .catch((error) => console.log(error.response.data.message));
      if (data.status === "Success") {
        navigate("/reset-password");
      }
  }
  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: codeVerify,
  });
  return (
    <div className=" container my-5 p-5">
      <h3 className="fw-bold">Please Enter your Verification Code :</h3>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="resetCode"
            id="resetCode"
            className="form-control p-3"
            placeholder="Code"
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        <button type="submit" className="btn bg-main text-white">
          Register
        </button>
      </form>
    </div>
  );
}
