import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  let { setUserToken } = useContext(UserContext);
  let navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  async function submitLoginForm(values) {
    setLoader(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((error) => {
        // console.log(error)
        setLoader(false);
        setError(error.response.data.message);
      });
    if (data.message === "success") {
      setLoader(false);
      // console.log(data);
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      setError(null);
      navigate("/");
    }
  }
  let validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z][a-z0-9]{3,}$/, "Password is invalid"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    // validate: validationForm,
    onSubmit: submitLoginForm,
  });
  return (
    <div className="w-75 mx-auto p-5">
      <h1>Login Now:</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Email
          </label>
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            name="email"
            id="email"
            className="form-control"
          />
          {formik.errors.email && formik.touched.email && (
            <div className="alert alert-danger">{formik.errors.email}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Password
          </label>
          <input
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            name="password"
            id="password"
            className="form-control"
          />
          {formik.errors.password && formik.touched.password && (
            <div className="alert alert-danger">{formik.errors.password}</div>
          )}
        </div>
        <div className="d-flex justify-content-between">
          <button
            type="submit"
            disabled={!formik.isValid}
            className="btn bg-main text-white "
          >
            {loader ? (
              <BallTriangle
                height={50}
                width={50}
                radius={5}
                color="#fff"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : (
              "Login Now"
            )}
          </button>
          <Link to={"/forget-password"}>
            <button className="btn btn-outline-success border-0">
              Forget your password?
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
