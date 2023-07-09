import { useEffect, useState } from "react";
interface PostData {
  post_id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  upvotes: number;
  downvotes: number;
}

const usePosts = () => {
  const [refresh, setRefresh] = useState<boolean>(false);
  const [posts, setPosts] = useState<PostData[]>([]);
  let postsCopy = [...posts];
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

  useEffect(() => {
    console.log("Fetching posts");
    fetchPosts();
  }, [refresh]);

  useEffect(() => {
    console.log("Updating posts copy");
    postsCopy = [...posts];
  }, [posts]);

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
  return { postsCopy, refresh, setRefresh };
};

export default usePosts;
