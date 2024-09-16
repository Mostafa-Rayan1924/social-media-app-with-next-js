"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoLogIn, IoPersonCircleOutline, IoClose } from "react-icons/io5";
import { UserContextFromRegisteration } from "../_context/UserContext";
import Logout from "../_components/Logout";

const Nav = () => {
  const [openNav, setOpenNav] = useState(false);
  const { user } = useContext(UserContextFromRegisteration);

  const handleCloseSideBar = (e) => {
    // Only close sidebar if clicking outside the sidebar content
    if (e.target === e.currentTarget) {
      setOpenNav(false);
    }
  };

  return (
    <header className="flex items-center justify-between container bg-white dark:bg-cardDark rounded-b-lg shadow-md py-3">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/images/logo.svg" alt="logo" width={70} height={50} />
        <h2 className="text-[#8046fd] font-bold hidden text-2xl sm:flex">
          Rayanco
        </h2>
      </Link>
      {Object.keys(user).length > 0 && (
        <div className="flex items-center gap-2 flex-1 justify-center">
          <Image
            src={user.user.profile_image}
            className="rounded-full aspect-square object-cover"
            alt="profile"
            width={50}
            height={50}
          />
          <h2 className="dark:text-textSmDark font-bold">{user.user.name}</h2>
        </div>
      )}
      <div onClick={() => setOpenNav((prev) => !prev)}>
        <FaBarsStaggered className="cursor-pointer dark:text-white" size={25} />
      </div>
      {/* SideMenu */}
      <AnimatePresence>
        {openNav && (
          <>
            <motion.div
              initial={{ opacity: 0, left: -500 }}
              exit={{ opacity: 0, left: -500 }}
              animate={{ opacity: 1, left: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleCloseSideBar}
              className="flex flex-col justify-between fixed left-0 top-0 z-[1000] w-[80%] md:w-[50%] lg:w-[30%] h-screen border-e bg-white dark:bg-cardDark">
              {/* Close SideMenu */}
              <div
                onClick={() => setOpenNav(false)}
                className="absolute top-6 right-6 cursor-pointer bg-rose-600 text-white rounded-full hover:bg-rose-800 transition-all duration-300">
                <IoClose size={25} />
              </div>
              {/* Sidebar Content */}
              <div className="mt-10 px-4 py-6">
                <Link href={"/"}>
                  <Image
                    onClick={() => setOpenNav(false)}
                    src="/images/logo.svg"
                    alt="logo"
                    width={70}
                    height={50}
                  />
                </Link>
                <ul className="mt-6 space-y-1">
                  <li>
                    <a
                      href="#"
                      className="block rounded-lg bg-gray-100 dark:bg-slate-800 px-4 py-2 text-sm font-medium text-textSmLight dark:text-textSmDark"
                      onClick={() => setOpenNav(false)}>
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:dark:bg-slate-800 dark:text-textSmDark hover:text-textSmLight"
                      onClick={() => setOpenNav(false)}>
                      Profile
                    </a>
                  </li>
                  <li>
                    {user.token ? (
                      <h1 className="text-center mt-5 text-2xl capitalize">
                        Welcome to Rayanco
                      </h1>
                    ) : (
                      <details className="group [&_summary::-webkit-details-marker]:hidden">
                        <summary
                          className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-textSmLight hover:dark:bg-slate-800 dark:text-textSmDark"
                          onClick={(e) => e.stopPropagation()} // Prevent sidebar close on details click
                        >
                          <span className="text-sm font-medium">
                            Registration
                          </span>
                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="size-5"
                              viewBox="0 0 20 20"
                              fill="currentColor">
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </summary>
                        <ul className="mt-2 space-y-1 px-4">
                          <Link href="/signup">
                            <button
                              className="flex items-center gap-2 dark:text-textSmDark text-sm"
                              onClick={() => setOpenNav(false)}>
                              <IoLogIn className="dark:text-white" size={25} />
                              Sign up
                            </button>
                          </Link>
                          <li>
                            <Link
                              href="/login"
                              className="flex items-center dark:text-textSmDark gap-2 rounded p-1 text-sm"
                              onClick={() => setOpenNav(false)}>
                              <IoPersonCircleOutline
                                className="dark:text-white"
                                size={25}
                              />
                              Login
                            </Link>
                          </li>
                        </ul>
                      </details>
                    )}
                  </li>
                </ul>
              </div>
              {/* Profile Section at the Bottom */}
              {Object.keys(user).length > 0 && (
                <div className="sticky flex items-center justify-between inset-x-0 bottom-0 border-t border-gray-100 dark:border-slate-900">
                  <a
                    href="#"
                    className="flex items-center gap-2 bg-white dark:bg-slate-800 dark:hover:bg-slate-800 p-4 hover:bg-gray-50">
                    <img
                      alt="profile"
                      src={user.user.profile_image}
                      className="size-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-xs">
                        <strong className="block font-medium dark:text-white">
                          {user.user.name}
                        </strong>
                        <span className="dark:text-textSmDark">
                          {user.user.email}
                        </span>
                      </p>
                    </div>
                  </a>
                  <Logout />
                </div>
              )}
            </motion.div>
            {/* Glass Effect on Side Menu */}
            <div className="fixed inset-0 w-full h-full bg-white/30 dark:bg-black/30 backdrop-blur-md backdrop-saturate-150 border z-[11]  border-white/30 shadow-lg rounded-lg p-8"></div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Nav;
