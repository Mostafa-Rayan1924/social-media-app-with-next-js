"use client";
import { createContext, useEffect, useState } from "react";

export let UserContextFromRegisteration = createContext();

const UserContext = ({ children }) => {
  let [user, setUser] = useState({});
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUser({
        token: localStorage.getItem("token"),
        user: JSON.parse(localStorage.getItem("user")),
      });
    } else {
      setUser({});
    }
  }, []);
  return (
    <UserContextFromRegisteration.Provider value={{ user, setUser }}>
      {children}
    </UserContextFromRegisteration.Provider>
  );
};

export default UserContext;
