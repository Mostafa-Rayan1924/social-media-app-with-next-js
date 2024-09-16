import PostCard from "./_components/PostCard";
export default async function Home() {
  let data = [];
  try {
    let fetching = await fetch(
      "https://tarmeezacademy.com/api/v1/posts?limit=5",
      {
        next: {
          revalidate: 10,
        },
      }
    );
    let res = await fetching.json();
    data = res?.data;
  } catch (err) {
    console.log(err);
  }
  if (!data.length) {
    return <p>skeletoooooooon</p>;
  }
  let postsMap = data.map((item) => <PostCard item={item} />);
  return <div className="mt-10">{postsMap}</div>;
}
