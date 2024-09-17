"use client";
import { useContext, useEffect, useState } from "react";
import PostCard from "./_components/PostCard";
import { UserContextFromRegisteration } from "./_context/UserContext";
import { PostContext } from "./_context/PostsContext";
import axios from "axios";
import AddPost from "./_components/AddPost";
import Loader from "./_components/Loader";

export default function Home() {
  const { user } = useContext(UserContextFromRegisteration);
  const { posts, setPosts } = useContext(PostContext);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://tarmeezacademy.com/api/v1/posts?limit=5"
        );
        setPosts(res.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    getData();
  }, [setPosts]);

  if (loading) return <Loader />;

  const postsMap = posts.map((item) => <PostCard key={item.id} item={item} />);

  return (
    <div className="mt-10">
      {postsMap}
      {user?.token && <AddPost />}
    </div>
  );
}
