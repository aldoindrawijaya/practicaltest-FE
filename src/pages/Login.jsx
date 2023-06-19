import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function Login() {
    const navigate = useNavigate();

     const { user, setUser } = useState("");

    const loginUser =  async (data) => {
    
    const response = await axios.post("https://practicaltest-sepia.vercel.app//user/login", data);
    if (response.data.success) {
      console.log(response.data);
      localStorage.setItem("user_token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      alert("im success");
      navigate("/")
      window.location.reload()
     
    } else {
      alert(response.data.message);
    }
}

    const loginSchema = Yup.object().shape({
        email: Yup.string()
          .required("Email tidak boleh kosong")
          .email("Email format salah"),
        password: Yup.string()
          .required("Password tidak boleh kosong")
          .min(3, "Password terlalu pendek"),
      });

      const handleLoginUser = async (value) => {
        loginUser(value);
      };

  return (
    <div>
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={(value) => {
        handleLoginUser(value);
      }}
    >
      {(props) => {
    return (
        <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Login your account
              </h2>
            </div>
            <Form className="mt-8 space-y-6" action="#" method="POST">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <Field
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Email address"
                  />
                  <ErrorMessage
                    component="div"
                    name="email"
                    style={{ color: "red", fontSize: "12px" }}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    required
                    className="relative block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Password"
                  />
                  <ErrorMessage
                    component="div"
                    name="password"
                    style={{ color: "red", fontSize: "12px" }}
                  />
                </div>
              </div>

              <div className="flex flex-row px-5  ">
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </button>
              </div>
            </Form>
          </div>
        </div>
      );
    }}
  </Formik>
</div>
);
}

export default Login