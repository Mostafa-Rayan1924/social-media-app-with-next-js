"use client";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { UserContextFromRegisteration } from "../_context/UserContext";
import Sidebar from "../_components/Sidebar";
const Nav = () => {
  const [openNav, setOpenNav] = useState(false);
  const { user } = useContext(UserContextFromRegisteration);

  return (
    <header className="flex items-center justify-between container bg-white dark:bg-cardDark rounded-b-lg shadow-md py-3">
      <a href="/" className="flex items-center gap-2">
        <Image src="/images/logo.svg" alt="logo" width={70} height={50} />
        <h2 className="text-[#8046fd] font-bold hidden text-2xl sm:flex">
          Rayanco
        </h2>
      </a>
      {Object.keys(user).length > 0 && (
        <Link
          href={`/profile/${user.user.id}`}
          className="hidden sm:flex  items-center gap-2 flex-1 justify-center">
          <Image
            src={
              Object.keys(user.user.profile_image).length == 0
                ? "/images/ano.png"
                : user.user.profile_image
            }
            className="rounded-full aspect-square object-cover"
            alt="profile"
            width={50}
            height={50}
          />
          <h2 className="dark:text-textSmDark font-bold">{user.user.name}</h2>
        </Link>
      )}
      <div onClick={() => setOpenNav((prev) => !prev)}>
        <FaBarsStaggered className="cursor-pointer dark:text-white" size={25} />
      </div>
      {/* SideMenu */}
      <AnimatePresence>
        {openNav && (
          <>
            <Sidebar setOpenNav={setOpenNav} />
            {/* Glass Effect on Side Menu */}
            <div
              onClick={() => setOpenNav(false)}
              className="fixed inset-0 w-full h-full bg-white/30 dark:bg-black/30 backdrop-blur-md backdrop-saturate-150 border z-[11]  border-white/30 shadow-lg rounded-lg p-8"></div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Nav;
