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
import { useContext } from "react";
import { FiLogOut } from "react-icons/fi";
import { UserContextFromRegisteration } from "../_context/UserContext";
import toast, { Toaster } from "react-hot-toast";
const Logout = () => {
  let { setUser } = useContext(UserContextFromRegisteration);

  let handleLogout = () => {
    toast.success("logged out successfully");
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser({});
    }, 1000);
  };
  return (
    <div className="p-4 relative ">
      <AlertDialog>
        <AlertDialogTrigger>
          <FiLogOut size={25} className="hover:text-red-600 " />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
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
