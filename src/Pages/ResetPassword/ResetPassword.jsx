import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
   let navigate = useNavigate()
    async function passwordReset(values) {
        let {status, data} = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values).catch((err) => (console.log(err)));
        if (status === 200) {
            localStorage.setItem("userToken", data.token);
navigate("/")
        }
        console.log(status);
    }
    const resetFormik = useFormik({
        initialValues: {
            email:"",
            newPassword: ""
        },
        onSubmit: passwordReset
})

  return (
      <div className='container my-5 py-5'>
          <h3 className='fw-bold'>Reset your account password</h3>
          <form onSubmit={resetFormik.handleSubmit}>
              <div class="my-3">
                <input
                    type="text"
                    name="email"
                      id="email"
                      value={resetFormik.values.email}
                      onChange={resetFormik.handleChange}
                      onBlur={resetFormik.handleBlur}
                    class="form-control p-3"
                    placeholder="Email"
                />
              </div>
              <div class="my-3">
                <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                      class="form-control p-3"
                      value={resetFormik.values.newPassword}
                      onChange={resetFormik.handleChange}
                      onBlur={resetFormik.handleBlur}
                    placeholder="New Password"
                />
              </div>
              <button type='submit' className='btn bg-main text-white'>Reset Password</button>
          </form>
    </div>
  )
}
