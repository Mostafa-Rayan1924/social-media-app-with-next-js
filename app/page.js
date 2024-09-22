"use client";
import { useContext, useEffect, useState } from "react";
import PostCard from "./_components/PostCard";
import { UserContextFromRegisteration } from "./_context/UserContext";
import { PostContext } from "./_context/PostsContext";
import axios from "axios";
import AddPost from "./_components/AddPost";
import Slider from "./_components/Slider";
import Loader from "./_components/Loader";
export default function Home() {
  const { user } = useContext(UserContextFromRegisteration);
  const { posts, setPosts } = useContext(PostContext);
  let [loading, setLoading] = useState(false);
  let [postPage, setPostPage] = useState(1);
  let [lastPage, setLastPage] = useState("");

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://tarmeezacademy.com/api/v1/posts?limit=5&page=${postPage}`
        );
        setPosts([...posts, ...res.data.data]);
        setLastPage(res.data.meta.last_page);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    getData();
  }, [postPage, setPosts]);
  useEffect(() => {
    if (postPage > lastPage) return;
    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 100
      ) {
        setPostPage((prev) => prev + 1);
        window.scrollTo({ x: 0, y: window.scrollY, behavior: "smooth" });
      }
    }
    window.addEventListener("scroll", () => handleScroll());
    return () => window.removeEventListener("scroll", handleScroll);
  }, [postPage, lastPage]);

  const postsMap = posts.map((item) => (
    <PostCard key={item.id} item={item} user={user} />
  ));

  return (
    <div className="mt-10">
      <Slider />
      {posts.length > 0 ? postsMap : <Loader />}
      {user?.token && <AddPost />}
    </div>
  );
}
