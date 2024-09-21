import Image from "next/image";
import Link from "next/link";
import { use } from "react";

const SliderCard = ({ user }) => {
  return (
    <Link
      href={`/profile/${user.id}`}
      className="p-2 bg-white border-[3px]   border-transparent hover:border-[#8046fd] transition-all duration-300   dark:bg-cardDark h-[150px]  rounded-lg flex flex-col justify-center items-center gap-2 ">
      <Image
        src={user.profile_image}
        alt={user.name}
        width={55}
        height={55}
        className="rounded-full  aspect-square object-cover border-gray-200 dark:border-slate-700 border-4"
      />
      <h2 className="font-bold text-center dark:text-textSmDark truncate text-wrap text-sm pb-1 pl-1">
        {user.username}
      </h2>
    </Link>
  );
};

export default SliderCard;
