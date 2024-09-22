import Image from "next/image";
import { RiTimeFill } from "react-icons/ri";
import { LuSubtitles } from "react-icons/lu";

import { LiaCommentSolid } from "react-icons/lia";
import { memo, useContext } from "react";
import Link from "next/link";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";

const PostCard = ({ item, user }) => {
  return (
    <div className="max-w-[526px] mx-3 bg-white dark:bg-cardDark sm:mx-auto mb-3  flex-col flex gap-3 py-2.5 px-4 divide-y-2 dark:divide-slate-600 rounded-lg">
      <div className="flex items-center justify-between   ">
        <Link
          href={`/profile/${item?.author?.id}`}
          className="flex items-center gap-2">
          <Image
            src={
              Object.keys(item.author.profile_image).length === 0
                ? "/images/ano.png"
                : item.author.profile_image
            }
            className="rounded-full aspect-square object-cover"
            alt={"logo"}
            width={50}
            height={50}
          />
          <h3 className="dark:text-textSmDark">{item.author.username}</h3>
        </Link>
        <div>
          <span className="text-[12px] flex items-center gap-1 dark:text-textSmDark">
            <RiTimeFill color="#8046fd" size={24} /> {item.created_at}
          </span>
        </div>
      </div>
      <Link href={`/posts/${item.id}`} className="w-full ">
        <Image
          src={
            Object.keys(item.image).length === 0 ? "/images/no.jpg" : item.image
          }
          alt={"post img"}
          className="rounded-lg object-cover my-3"
          width={526}
          height={526}
          layout="responsive" // Ensure image is responsive
        />
        <h2 className="font-bold truncate flex items-center dark:text-white gap-1">
          <LuSubtitles
            className="text-textSmLight dark:text-textSmDark"
            size={20}
          />
          {item.title}
        </h2>
        <p className="text-textSmLight line-clamp-2 mt-3">{item.body}</p>
      </Link>
      <div className="flex items-center justify-between gap-2 pt-2">
        <Link
          href={`/posts/${item.id}`}
          className="text-cyan-600 border-2 h-[35px] flex-1 border-cyan-600  rounded-lg justify-center  flex items-center gap-1 hover:text-white hover:bg-cyan-500 transition-all duration-300 hover:border-transparent">
          <LiaCommentSolid />({item.comments_count})
          <p className="hidden sm:flex">comments </p>
        </Link>
        {user?.user?.id == item?.author.id ? (
          <>
            <div className="flex-1">
              <DeletePost itemId={item.id} />
            </div>
            <div className="flex-1">
              <EditPost itemId={item.id} />
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default memo(PostCard);
