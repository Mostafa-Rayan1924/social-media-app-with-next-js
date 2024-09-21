import { useState, useContext } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { UserContextFromRegisteration } from "../_context/UserContext";
import toast, { Toaster } from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { PostContext } from "../_context/PostsContext";
const DeletePost = ({ itemId }) => {
  const { posts, setPosts } = useContext(PostContext);

  let handleDel = async () => {
    let headers = {
      authorization: "Bearer " + localStorage.getItem("token"),
    };
    try {
      let res = await axios.delete(
        `https://tarmeezacademy.com/api/v1/posts/${itemId}`,
        {
          headers: headers,
        }
      );
      setPosts(posts.filter((post) => post.id !== itemId));
      toast.success("Post deleted successfully ");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-red-600 border-2  h-[35px] border-red-600 rounded-lg w-full  flex justify-center items-center gap-1 hover:text-white hover:bg-red-500 hover:border-transparent">
          <RiDeleteBin6Line /> <p className="hidden sm:flex">Delete</p>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="z-[1001]">
        <AlertDialogHeader>
          <AlertDialogTitle className="dark:text-white">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="dark:text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDel}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
      <Toaster position="bottom-right" reverseOrder={true} />
    </AlertDialog>
  );
};

export default DeletePost;
