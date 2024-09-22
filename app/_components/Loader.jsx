import { LuLoader2 } from "react-icons/lu";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="dark:bg-slate-800 bg-gray-400 size-20 rounded-lg  flex justify-center items-center">
        <LuLoader2 size={50} className=" animate-spin text-white" />
      </div>
    </div>
  );
};

export default Loader;