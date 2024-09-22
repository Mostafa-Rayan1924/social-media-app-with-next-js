"use client";

import Image from "next/image";
import { useContext, useState } from "react";
import { addComment } from "./validation/addComment";
import { useFormik } from "formik";
import Error from "./validation/Error";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { PostContext } from "../_context/PostsContext";

const Comments = ({ Datacomments, postId }) => {
  const [loading, setLoading] = useState(false);
  const [dataCommentsState, setDataCommentsState] = useState(Datacomments);
  const [showMore, setShowMore] = useState(false);

  const commentsToShow = showMore
    ? dataCommentsState
    : dataCommentsState.slice(0, 4);

  const { posts, setPosts } = useContext(PostContext);

  const handleAddComment = async () => {
    setLoading(true);

    const params = {
      body: formik.values.body,
    };

    const headers = {
      authorization: "Bearer " + localStorage.getItem("token"),
    };

    try {
      const res = await axios.post(
        `https://tarmeezacademy.com/api/v1/posts/${postId}/comments`,
        params,
        {
          headers: headers,
        }
      );

      const newComment = res.data.data;
      setDataCommentsState((prevState) => [...prevState, newComment]);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments_count: post.comments_count + 1,
                comments: [...post.comments, newComment],
              }
            : post
        )
      );

      toast.success("Comment created successfully");
    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      setLoading(false);
      formik.resetForm();
    }
  };

  const formik = useFormik({
    initialValues: {
      body: "",
    },
    validateOnBlur: true,
    validationSchema: addComment,
    onSubmit: handleAddComment,
  });

  const commentsMap = commentsToShow?.map((item) => (
    <div
      className="hover:bg-slate-100 dark:hover:bg-slate-800 hover:ps-2 transition-all duration-200 rounded-lg"
      key={item.id}>
      <div className="flex flex-row  justify-start  text-start items-center gap-2 py-4 border-b-2 dark:border-b-slate-800 border-[#f5f5f5]">
        <Image
          src={
            Object.keys(item.author.profile_image).length === 0
              ? "/images/ano.png"
              : item.author.profile_image
          }
          width={50}
          height={50}
          className="rounded-full  aspect-square object-cover"
          alt="profile img"
        />
        <div>
          <h3 className="text-xl font-bold dark:text-white">
            {item.author.username}
          </h3>
          <h2 className="text-textSmLight text-wrap">{item.body}</h2>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="my-5">
      <h2 className="text-3xl font-bold mb-5 dark:text-textSmDark">
        Comments Of Post
      </h2>
      <div className="bg-white p-4 rounded-lg dark:bg-cardDark dark:text-textSmDark dark:border-slate-800">
        {dataCommentsState.length > 0 ? commentsMap : "No Comments yet"}
      </div>

      {/* Toggle between "Read More" and "Read Less" */}
      {dataCommentsState.length > 4 && (
        <div className="text-center my-3">
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-blue-500 hover:text-blue-700">
            {showMore ? "Read Less" : "Read More"}
          </button>
        </div>
      )}

      <div className="mt-5 ">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <textarea
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.body}
            name="body"
            placeholder="Write your comment here..."
            className={`border p-2 dark:text-white dark:bg-cardDark dark:border-slate-800 outline-none rounded-lg w-full ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            } resize-none`}
            rows="3"
          />
          <Error formik={formik} nameOfField="body" />
          <button
            type="submit"
            className={`bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}>
            {loading ? "Loading..." : "Add Comment"}
          </button>
        </form>
      </div>
      <Toaster position="bottom-right" reverseOrder={true} />
    </div>
  );
};

export default Comments;
