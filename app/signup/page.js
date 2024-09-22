"use client";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { signUpSchema } from "../_components/validation/signUpSchema";
import Error from "../_components/validation/Error";
import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { UserContextFromRegisteration } from "../_context/UserContext";
import { useRouter } from "next/navigation";
const Signup = () => {
  let [loading, setLoading] = useState(false);
  const router = useRouter();
  let { user, setUser } = useContext(UserContextFromRegisteration);
  console.log(user.user);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      name: "",
      image: null,
    },
    validateOnBlur: true,
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      setLoading(true);
      let formData = new FormData();
      formData.append("username", values.username);
      formData.append("password", values.password);
      formData.append("email", values.email);
      formData.append("name", values.name);
      formData.append("image", values.image); // تضمين الصورة في البيانات

      try {
        let res = await axios.post(
          "https://tarmeezacademy.com/api/v1/register",
          formData
        );

        let token = res.data.token;
        let user = res.data.user;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser({ token, user });
        toast.success("Account created successfully");
        formik.resetForm();
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } catch (err) {
        toast.error(err.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <section className="bg-white rounded-lg dark:bg-cardDark container my-6 py-4">
      <div className="lg:grid lg:min-h-[80vh] lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute  inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="#">
              <span className="sr-only">Home</span>
              <Image
                src={"/images/logo.svg"}
                className="bg-white w-[70px] h-[70px] rounded-full px-2"
                alt="logo"
                width={50}
                height={50}
              />
            </a>

            <h2 className="mt-6 text-2xl font-bold text-white  sm:text-3xl md:text-4xl">
              Welcome to Rayanco 🦑
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              nam dolorum aliquam, quibusdam aperiam voluptatum.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-purple-600 sm:size-20"
                href="#">
                <span className="sr-only">Home</span>
                <Image
                  src={"/images/logo.svg"}
                  alt="logo"
                  width={50}
                  height={50}
                />
              </a>

              <h1 className="mt-2 text-2xl font-bold dark:text-textSmDark text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to Rayanco 🦑
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
              </p>
            </div>

            <form
              onSubmit={formik.handleSubmit}
              disabled={loading}
              className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="FirstName"
                  className="block text-sm font-medium text-gray-700 dark:text-textSmDark">
                  UserName
                </label>

                <input
                  type="text"
                  id="FirstName"
                  name="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  onBlur={formik.handleBlur}
                  disabled={loading}
                  className={`mt-1 w-full ${
                    loading ? "cursor-not-allowed opacity-50" : ""
                  }  outline-none py-1 px-2 border-b-2 ${
                    formik.touched?.username && formik.errors.username
                      ? "border-red-500"
                      : "border-purple-700"
                  } border-purple-700 bg-white dark:bg-cardDark text-sm text-gray-700 shadow-sm`}
                />
                <Error formik={formik} nameOfField={"username"} />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Name"
                  className="block text-sm font-medium text-gray-700 dark:text-textSmDark">
                  Name
                </label>

                <input
                  type="text"
                  id="Name"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  disabled={loading}
                  className={`mt-1 w-full ${
                    loading ? "cursor-not-allowed opacity-50" : ""
                  }  outline-none py-1 px-2 border-b-2 ${
                    formik.touched?.name && formik.errors.name
                      ? "border-red-500"
                      : "border-purple-700"
                  } border-purple-700 bg-white dark:bg-cardDark text-sm text-gray-700 shadow-sm`}
                />
                <Error formik={formik} nameOfField={"name"} />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700 dark:text-textSmDark">
                  Email
                </label>

                <input
                  type="text"
                  id="Email"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  disabled={loading}
                  className={`mt-1 w-full ${
                    loading ? "cursor-not-allowed opacity-50" : ""
                  }  outline-none py-1 px-2 border-b-2 ${
                    formik.touched?.email && formik.errors.email
                      ? "border-red-500"
                      : "border-purple-700"
                  } border-purple-700 bg-white dark:bg-cardDark text-sm text-gray-700 shadow-sm`}
                />
                <Error formik={formik} nameOfField={"email"} />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700 dark:text-textSmDark">
                  Password
                </label>

                <input
                  type="password"
                  id="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="password"
                  disabled={loading}
                  className={`mt-1 w-full  ${
                    loading ? "cursor-not-allowed opacity-50" : ""
                  } outline-none py-1 px-2 border-b-2 ${
                    formik.touched?.password && formik.errors.password
                      ? "border-red-500"
                      : "border-purple-700"
                  } border-purple-700 bg-white dark:bg-cardDark text-sm text-gray-700 shadow-sm`}
                />
                <Error formik={formik} nameOfField={"password"} />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="sendfile"
                  className="block text-sm font-medium text-gray-700 dark:text-textSmDark">
                  Upload img
                </label>

                <input
                  type="file"
                  id="sendfile"
                  onChange={(event) => {
                    formik.setFieldValue("image", event.currentTarget.files[0]);
                  }}
                  name="image"
                  className="mt-1 w-full py-1 px-2 bg-white dark:bg-cardDark text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className={`inline-block ${
                    loading
                      ? "border-gray-500 bg-gray-500 cursor-not-allowed opacity-50"
                      : "border-purple-600 bg-purple-600"
                  } shrink-0 rounded-md border border-purple-600 bg-purple-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-purple-600 focus:outline-none focus:ring active:text-purple-500`}>
                  {loading ? "Loading..." : "Create an account"}
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account?
                  <Link
                    href="/login"
                    className="text-gray-700 dark:text-textSmDark underline">
                    Log in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
      <Toaster position="bottom-right" reverseOrder={true} />
    </section>
  );
};

export default Signup;
