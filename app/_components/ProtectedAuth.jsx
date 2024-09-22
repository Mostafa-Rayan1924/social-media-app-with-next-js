"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { UserContextFromRegisteration } from "../_context/UserContext";
const ProtectedAuth = () => {
  const router = useRouter();
  const { user } = useContext(UserContextFromRegisteration);
  let pathName = usePathname();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router, user]);
};
export default ProtectedAuth;
