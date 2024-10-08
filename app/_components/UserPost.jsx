"use client";
import { useContext, useEffect, useState } from "react";
import { UserContextFromRegisteration } from "../_context/UserContext";
import axios from "axios";
import PostCard from "./PostCard";
import { PostContext } from "../_context/PostsContext";
import { useRouter } from "next/navigation";
import ProtectedAuth from "./ProtectedAuth";

const UserPost = ({ userId }) => {
  const { posts, setPosts } = useContext(PostContext);
  const { user } = useContext(UserContextFromRegisteration);
  let userPostMap = posts.map((post) => {
    return <PostCard item={post} user={user} />;
  });

  useEffect(() => {
    let getData = async () => {
      try {
        let res = await axios.get(
          `https://tarmeezacademy.com/api/v1/users/${userId}/posts`
        );
        setPosts(res.data.data.reverse());
      } catch (err) {
        console.log(err);
      }
    };
    getData();
    return () => {
      setPosts([]);
    };
  }, [userId]);

  return (
    <div>
      <ProtectedAuth />
      {posts.length > 0 ? (
        <div>
          <h2 className="my-10 text-xl sm:text-3xl dark:text-textSmDark font-bold text-center capitalize">
            {user?.user?.id == posts[0]?.author?.id
              ? "Your Posts"
              : posts[0]?.author?.username + "s Posts"}
          </h2>
          {userPostMap}
        </div>
      ) : (
        <h2 className="text-center dark:text-white my-10 text-3xl sm:text-4xl font-bold">
          No Posts Yet
        </h2>
      )}
    </div>
  );
};

export default UserPost;
