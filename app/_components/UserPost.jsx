"use client";
import { useContext, useEffect, useState } from "react";
import { UserContextFromRegisteration } from "../_context/UserContext";
import axios from "axios";
import PostCard from "./PostCard";

const UserPost = ({ userId }) => {
  let [userPosts, setUserPosts] = useState([]);
  const { user } = useContext(UserContextFromRegisteration);

  let userPostMap = userPosts.map((post) => {
    return <PostCard item={post} user={user} />;
  });
  useEffect(() => {
    let getData = async () => {
      try {
        let res = await axios.get(
          `https://tarmeezacademy.com/api/v1/users/${userId}/posts`
        );
        setUserPosts(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <div>
      {userPosts.length > 0 ? (
        <div>
          <h2 className="my-10 text-xl sm:text-3xl dark:text-textSmDark font-bold text-center capitalize">
            {user?.user?.id == userPosts[0]?.author?.id
              ? "Your Posts"
              : userPosts[0]?.author?.username + "s Posts"}
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
