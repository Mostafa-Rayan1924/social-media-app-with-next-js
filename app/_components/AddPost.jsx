"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { useContext, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { addPostSchema } from "./validation/addPostSchema";
import { useFormik } from "formik";
import Error from "./validation/Error";
import { PostContext } from "../_context/PostsContext";
import toast, { Toaster } from "react-hot-toast";
const AddPost = () => {
  let [open, setOpen] = useState(false);
  let [loading, setLoading] = useState(false);
  const { posts, setPosts } = useContext(PostContext);
  let [img, setImg] = useState(null);
  let handleAddPost = async () => {
    setLoading(true);
    let formData = new FormData();
    formData.append("title", formik.values.title);
    formData.append("body", formik.values.body);
    formData.append("image", formik.values.image);

    let headers = {
      authorization: "Bearer " + localStorage.getItem("token"),
    };

    try {
      let res = await axios.post(
        "https://tarmeezacademy.com/api/v1/posts",
        formData,
        {
          headers: headers,
        }
      );
      setPosts([res.data.data, ...posts]);
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast.success("Post created successfully");
    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      setLoading(false);
      setOpen(false);
      setImg(null);
      formik.resetForm();
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
      image: null,
    },
    validateOnBlur: true,
    validationSchema: addPostSchema,
    onSubmit: handleAddPost,
  });

  return (
    <div className="fixed right-10 bottom-10">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button
            className="hidden sm:flex animate-bounce bg-[black] text-white dark:bg-white hover:text-white dark:hover:text-black dark:text-black hover:bg-black/90 dark:hover:bg-white"
            variant="outline">
            Add Post
          </Button>
          <Button
            className="flex sm:hidden bg-[black] text-white dark:bg-white hover:text-white dark:hover:text-black dark:text-black hover:bg-black/90 dark:hover:bg-white text-2xl border-none"
            variant="outline">
            <IoIosAddCircle />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px] ">
          <DialogHeader>
            <DialogTitle className="dark:text-white">Add New Post</DialogTitle>
            <DialogDescription>
              Share Your thoughts with the world
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={formik.handleSubmit}
            className="grid gap-6 py-6 px-4 bg-white dark:bg-black rounded-lg"
            disabled={loading} // disable the form while loading
          >
            {/* Title Input */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
              <label
                htmlFor="tit"
                className="text-right  dark:text-textSmDark sm:text-left font-bold text-sm sm:text-base capitalize text-gray-700">
                Title
              </label>
              <input
                id="tit"
                onChange={formik.handleChange}
                value={formik.values.title}
                onBlur={formik.handleBlur}
                name="title"
                placeholder="Enter title"
                className={`col-span-3 border-2 dark:bg-black dark:border-slate-800 dark:text-white border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              />
              <Error formik={formik} nameOfField={"title"} />
            </div>

            {/* Body Textarea */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-start">
              <label
                htmlFor="bo"
                className="text-right dark:text-textSmDark sm:text-left font-bold text-sm sm:text-base capitalize text-gray-700">
                Body
              </label>
              <textarea
                onChange={formik.handleChange}
                value={formik.values.body}
                onBlur={formik.handleBlur}
                id="bo"
                name="body"
                placeholder="Enter your content"
                className={`col-span-3 border-2 dark:bg-black dark:border-slate-800 dark:text-white border-gray-300 rounded-md p-2 h-[150px] resize-none focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              />
              <Error formik={formik} nameOfField={"body"} />
            </div>

            {/* File Input */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
              <label
                htmlFor="file"
                className="text-right dark:text-textSmDark sm:text-left font-bold text-sm sm:text-base capitalize text-gray-700">
                Add Image
              </label>
              <div className="col-span-3">
                {img !== null ? (
                  <label htmlFor="file" className="cursor-pointer">
                    <img
                      src={URL.createObjectURL(img)}
                      className="size-20 mx-auto rounded-full object-cover"
                      alt="Selected Image"
                    />
                  </label>
                ) : (
                  <label
                    htmlFor="file"
                    className={`flex items-center justify-center w-full h-12 bg-blue-500 text-white font-medium text-sm rounded-md cursor-pointer hover:bg-blue-600 transition-all duration-300 ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}>
                    <span>Choose a file</span>
                  </label>
                )}

                {/* File Input */}
                <input
                  onChange={(e) => {
                    formik.setFieldValue("image", e.target.files[0]);
                    setImg(e.target.files[0]);
                  }}
                  type="file"
                  id="file"
                  name="image"
                  className="hidden"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              className={`bg-black text-white dark:text-black dark:bg-white px-6 py-2 rounded-lg sm:w-fit sm:block sm:ml-auto ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={loading}>
              {loading ? "Posting..." : "Post"}
            </button>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster position="bottom-right" reverseOrder={true} />
    </div>
  );
};

export default AddPost;
