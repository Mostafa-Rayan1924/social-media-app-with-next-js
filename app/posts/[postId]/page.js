import Comments from "@/app/_components/Comments";
import PostDetailsCard from "@/app/_components/PostDetailsCard";
import axios from "axios";

const PostDetails = async ({ params }) => {
  let data;
  try {
    let res = await axios.get(
      `https://tarmeezacademy.com/api/v1/posts/${params.postId}`
    );

    if (res) {
      data = res.data.data;
    }
  } catch (err) {
    console.log(err);
  }
  console.log(data.comments);

  return (
    <div className="my-10  container  dark:bg-darkBg ">
      <h2 className="mb-10  text-xl sm:text-3xl dark:text-textSmDark font-bold uppercase">
        {data.author.username}'S Post
      </h2>
      <PostDetailsCard item={data} />
      <Comments comments={data?.comments} postId={params.postId} />
    </div>
  );
};

export default PostDetails;
