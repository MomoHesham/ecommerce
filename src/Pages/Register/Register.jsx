import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner";

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function registerData(values) {
    // api
    setIsLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.message);
      });
    if (data.message === "success") {
      setIsLoading(false);
      // redirect to login
      navigate("/login");
    }
  }

  // function validateForm(values) {
  //   let errors = {};
  //   let emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  //   let phoneRegex =
  //     /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  //   // name
  //   if (values.name === "") {
  //     errors.name = "Name is required";
  //   } else if (values.name.length < 3) {
  //     errors.name = "Name must be at least 3 characters";
  //   }

  //   // email

  //   if (!values.email) {
  //     errors.email = "Email is required";
  //   } else if (!emailRegex.test(values.email)) {
  //     errors.email = "Email is invalid";
  //   }

  //   // phone

  //   if (!values.phone) {
  //     errors.phone = "Phone is required";
  //   } else if (!phoneRegex.test(values.phone)) {
  //     errors.phone = "Phone is invalid";
  //   }
  //   // password

  //   if (!values.password) {
  //     errors.password = "password is required";
  //   } else if (!/[A-Z][a-z0-9]{3,}/.test(values.password)) {
  //     errors.password = "password is invalid";
  //   }

  //   if (!values.rePassword) {
  //     errors.rePassword = "rePassword is required";
  //   } else if(values.rePassword!==values.password){
  //     errors.rePassword = "rePassword does not match";
  //   }

  //   return errors;
  // }

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").min(3,"Name must be at least 3 characters"),
    email: Yup.string().required("Email is requird").email("Email is invalid"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(
        /^01[0125][0-9]{8}$/
      , "Phone is invalid"),
    password: Yup.string()
      .required("Password is required")
      .matches(/[A-Z][a-z0-9]{3,}/, "Password is invalid"),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")]),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: registerData,
  });
  return (
    <div className="w-75 mx-auto p-5">
      {error && <div className="alert alert-danger">{error}</div>}
      <h1>Register Now :</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            placeholder=""
            aria-describedby="helpId"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && (
            <div className="alert alert-danger">{formik.errors.name}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder=""
            aria-describedby="helpId"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <div className="alert alert-danger">{formik.errors.email}</div>
          )}
        </div>{" "}
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            className="form-control"
            placeholder=""
            aria-describedby="helpId"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone && (
            <div className="alert alert-danger">{formik.errors.phone}</div>
          )}
        </div>{" "}
        <div className="mb-3">
          <label className="form-label">password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            placeholder=""
            aria-describedby="helpId"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <div className="alert alert-danger">{formik.errors.password}</div>
          )}
        </div>{" "}
        <div className="mb-3">
          <label className="form-label">rePassword</label>
          <input
            type="password"
            name="rePassword"
            id="rePassword"
            className="form-control"
            placeholder=""
            aria-describedby="helpId"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <div className="alert alert-danger">{formik.errors.rePassword}</div>
          )}
        </div>
        <button type="submit" className="btn bg-main text-white">
          {isLoading ? (
            <Circles
              height="80"
              width="80"
              color="#fff"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            "Register"
          )}
        </button>
      </form>
    </div>
  );
}
