import { useEffect, useState } from "react";
import Posts from "../components/Posts";
import RightBar from "../components/RightBar";

interface PostData {
  post_id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  upvotes: number;
  downvotes: number;
}

export default function Home() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  const defaultPosts: PostData[] = [
    {
      post_id: 0,
      title: "Loading...",
      content: "Loading...",
      author: "Loading...",
      date: "Loading...",
      upvotes: 0,
      downvotes: 0,
    },
  ];

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/fetchposts", {
        method: "GET",
      });
      if (response.status == 200) {
        const data: PostData[] = await response.json();
        return setPosts(data);
      } else {
        console.log("Error fetching posts");
        setPosts(defaultPosts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setInterval(() => {
      setRefresh(!refresh);
    }, 1000 * 60 * 5);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [refresh]);

  return (
    <div className="flex items-center justify-start w-full h-full">
      <div className="flex w-1/4"></div>
      <div className="flex flex-col items-center justify-center w-full h-full bg-slate-200 mx-4 px-4 shadow-md shadow-black">
        {posts.map((post, index) => (
          <Posts
            setRefresh={setRefresh}
            key={index}
            post_id={post.post_id}
            title={post.title}
            author={post.author}
            content={post.content}
            date={post.date}
            upvotes={post.upvotes}
            downvotes={post.downvotes}
          />
        ))}
      </div>
      <div className="block sm:hidden w-1/5"></div>
      <div className="w-2/3 justify-center hidden sm:block">
        <RightBar />
      </div>
    </div>
  );
}
