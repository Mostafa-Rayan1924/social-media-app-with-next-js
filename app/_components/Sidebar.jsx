"use client";
import { IoLogIn, IoPersonCircleOutline, IoClose } from "react-icons/io5";
import Logout from "../_components/Logout";
import { useContext, useEffect } from "react";
import { UserContextFromRegisteration } from "../_context/UserContext";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Sidebar = ({ setOpenNav }) => {
  const { user } = useContext(UserContextFromRegisteration);
  let url = window.location.pathname;

  useEffect(() => {
    document.documentElement
      .querySelector(".sidebar")
      .addEventListener("click", (e) => {
        {
          setOpenNav(false);
        }
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, left: -500 }}
      exit={{ opacity: 0, left: -500 }}
      animate={{ opacity: 1, left: 0 }}
      transition={{ duration: 0.3 }}
      className="flex sidebar flex-col justify-between fixed left-0 top-0 z-[1000] w-[80%] md:w-[50%] lg:w-[30%] h-screen border-e bg-white dark:bg-cardDark">
      {/* Close SideMenu */}
      <div className="absolute top-6 right-6 cursor-pointer bg-rose-600 text-white rounded-full hover:bg-rose-800 transition-all duration-300">
        <IoClose onClick={() => setOpenNav(false)} size={25} />
      </div>
      {/* Sidebar Content */}
      <div className="mt-10 px-4 py-6">
        <Link href={"/"}>
          <Image src="/images/logo.svg" alt="logo" width={70} height={50} />
        </Link>
        <ul className="mt-6 space-y-1">
          <li>
            <Link
              href="/"
              className={`block ${
                !url.includes("profile") ? "bg-gray-100 dark:bg-slate-800" : ""
              } rounded-lg   px-4 py-2 text-sm font-medium text-textSmLight dark:text-textSmDark`}>
              Home
            </Link>
          </li>
          <li>
            <Link
              href={`/profile/${user?.user?.id}`}
              className={`block ${
                url.includes("profile") ? "bg-gray-100 dark:bg-slate-800" : ""
              } rounded-lg   px-4 py-2 text-sm font-medium text-textSmLight dark:text-textSmDark`}>
              Profile
            </Link>
          </li>
          <li>
            {/* IF USER LOGGED IN WE DISPLAY THIS OR ELSE DISPLAY REGISTRATION */}
            {user?.token ? (
              <h1 className="text-center dark:text-white mt-5 text-2xl capitalize">
                Welcome to Rayanco
              </h1>
            ) : (
              <ul className="mt-2 space-y-1 px-4">
                <Link href="/signup">
                  <button className="flex items-center gap-2 dark:text-textSmDark text-sm">
                    <IoLogIn className="dark:text-white" size={25} />
                    Sign up
                  </button>
                </Link>
                <li>
                  <Link
                    href="/login"
                    className="flex items-center dark:text-textSmDark gap-2 rounded p-1 text-sm">
                    <IoPersonCircleOutline
                      className="dark:text-white"
                      size={25}
                    />
                    Login
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
      {/* Profile Section at the Bottom : IF USER LOGGED IN WE SHOW PROFILE IN BOTTOM OF SIDEBAR */}
      {Object.keys(user).length > 0 && (
        <div className="sticky flex items-center justify-between inset-x-0 bottom-0 border-t border-gray-100 dark:border-slate-900">
          <a
            href="#"
            className="flex items-center gap-2 bg-white dark:bg-cardDark dark:hover:bg-slate-800 p-4 hover:bg-gray-50">
            <img
              alt="profile"
              src={
                Object.keys(user.user.profile_image).length == 0
                  ? "images/ano.png"
                  : user.user.profile_image
              }
              className="size-10 rounded-full object-cover"
            />
            <div>
              <p className="text-xs">
                <strong className="block font-medium dark:text-white">
                  {user.user.name}
                </strong>
                <span className="dark:text-textSmDark">{user.user.email}</span>
              </p>
            </div>
          </a>
          <Logout setOpenNav={setOpenNav} />
        </div>
      )}
    </motion.div>
  );
};

export default Sidebar;
