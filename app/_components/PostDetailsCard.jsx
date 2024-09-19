import Image from "next/image";
import { RiTimeFill } from "react-icons/ri";
import { LuSubtitles } from "react-icons/lu";
import { LiaCommentSolid } from "react-icons/lia";
import Link from "next/link";

const PostDetailsCard = ({ item }) => {
  return (
    <div className="max-w-[526px]  mx-auto bg-white dark:bg-cardDark  mb-3  flex-col flex gap-3 py-2.5 px-4 divide-y-2 dark:divide-slate-600 rounded-lg">
      <div className="flex items-center justify-between   ">
        <Link
          href={`/profile/${item.author.id}`}
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
      <div className="w-full ">
        <Image
          src={
            Object.keys(item.image).length === 0 ? "/images/no.jpg" : item.image
          }
          alt={"post img"}
          className="rounded-lg object-cover my-3 w-full h-[500px]"
          width={526}
          height={526}
        />
        <h2 className="font-bold truncate flex items-center dark:text-white gap-1">
          <LuSubtitles
            className="text-textSmLight dark:text-textSmDark"
            size={20}
          />
          {item.title}
        </h2>
        <p className="text-textSmLight line-clamp-2 mt-3">{item.body}</p>
      </div>
    </div>
  );
};

export default PostDetailsCard;
