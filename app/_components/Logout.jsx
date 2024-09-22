import { useState, useContext } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FiLogOut } from "react-icons/fi";
import { UserContextFromRegisteration } from "../_context/UserContext";
import toast, { Toaster } from "react-hot-toast";

const Logout = ({ setOpenNav }) => {
  let { setUser } = useContext(UserContextFromRegisteration);

  const handleLogout = (e) => {
    e.stopPropagation(); // منع إغلاق الـ Sidebar
    toast.success("Logged out successfully");
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser({});
    }, 1000);
    setOpenNav(false);
  };

  return (
    <div className="p-4 ">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <FiLogOut
            size={25}
            className="hover:text-red-600 cursor-pointer dark:text-white"
            onClick={(e) => {
              e.stopPropagation();
              setOpenNav(true);
            }}
          />
        </AlertDialogTrigger>
        <AlertDialogContent className="z-[1001]">
          <AlertDialogHeader>
            <AlertDialogTitle className="dark:text-white">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="dark:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toaster position="bottom-right" reverseOrder={true} />
    </div>
  );
};

export default Logout;
