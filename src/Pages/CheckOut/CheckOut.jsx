import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CartContext } from "../../Context/CartContext";

export default function CheckOut() {
  const {checkOutPayment, getProductCart} = useContext(CartContext)
  async function onsubmit(id, values) {
    let { data } = await getProductCart();
    id=data.data._id
    let {data:payment} = await checkOutPayment(id,values)
    console.log(payment);
    window.location.href = payment.session.url;
  }
  let validationSchema = Yup.object({
    details: Yup.string()
      .required("Details is required")
      .min(3, "Details must be at least 3 characters"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(
        /^01[0125][0-9]{8}$/
     ,
        "Invalid Phone"
      ),
    city: Yup.string().required("City is required"),
  });
  let checkFormik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: onsubmit,
  });

  
  return (
    <div className="container my-5 py-5">
      <div className="row">
        <form onSubmit={checkFormik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="details" className="form-label">
              Details
            </label>
            <input
              type="text"
              name=""
              id="details"
              value={checkFormik.details}
              onChange={checkFormik.handleChange}
              onBlur={checkFormik.handleBlur}
              className="form-control"
              placeholder=""
            />
            {checkFormik.errors.details && checkFormik.touched.details &&(
              <div className="alert alert-danger">
                {checkFormik.errors.details}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              name=""
              id="phone"
              value={checkFormik.phone}
              onChange={checkFormik.handleChange}
              onBlur={checkFormik.handleBlur}
              className="form-control"
              placeholder=""
            />
              {checkFormik.errors.phone && checkFormik.touched.phone && (
              <div className="alert alert-danger">
                {checkFormik.errors.phone}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              name=""
              id="city"
              value={checkFormik.values.city}
              onChange={checkFormik.handleChange}
              onBlur={checkFormik.handleBlur}
              className="form-control"
              placeholder=""
            />
              {checkFormik.errors.city && checkFormik.touched.city && (
              <div className="alert alert-danger">
                {checkFormik.errors.city}
              </div>
            )}
          </div>
          <button  type="submit" className=" my-btn-outline p-1 rounded-2 w-100"   disabled={!checkFormik.isValid}>
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}
