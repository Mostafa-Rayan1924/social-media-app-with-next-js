"use client";
import { createContext, useState } from "react";

export let PostContext = createContext();

const PostsContext = ({ children }) => {
  let [posts, setPosts] = useState([]);

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostsContext;
