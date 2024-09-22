"use client";
import { useContext } from "react";
import { UserContextFromRegisteration } from "../_context/UserContext";
import { useRouter } from "next/navigation";

const ProtectedAuth = () => {
  const router = useRouter();
  const { user } = useContext(UserContextFromRegisteration);
  if (user.token == null) {
    // router.push("/login");
  }
};

export default ProtectedAuth;
