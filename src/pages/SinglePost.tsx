import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Posts from "../components/Posts";
import Loading from "../components/Loading";
import AlertLogin from "../components/AlertLogin";

interface PostData {
  post_id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  upvotes: number;
  downvotes: number;
}

const Post = () => {
  const [post, setPost] = useState<PostData>();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const location = useLocation();
  const postID = location.pathname.split("/")[2];

  const defaultPost: PostData = {
    post_id: 0,
    title: "ERROR LOADING POST",
    content: "This post doesn't exist or has been deleted.",
    date: new Date().toISOString(),
    downvotes: 0,
    upvotes: 17,
    author: "ADMIN",
  };

  useEffect(() => {
    fetchPost();
  }, [refresh]);

  async function fetchPost() {
    const res = await fetch(`/api/post?id=${postID}`);
    const data = await res.json();
    if (res.status === 200 && data.length > 0) {
      setPost(data[0]);
    } else {
      setPost(defaultPost);
    }
  }

  useEffect(() => {
    fetchPost();
  }, []);

  if (post === undefined) return <Loading />;

  return (
    <>
      {showAlert && <AlertLogin setShowAlert={setShowAlert} />}
      <div className="flex flex-col items-center bg-slate-400 min-h-screen">
        <div className="flex flex-col items-center justify-center mt-20 m-8 md:w-[700px] w-full bg-slate-300 px-4 shadow-md shadow-black">
          <Posts
            post_id={post.post_id}
            author={post.author}
            title={post.title}
            date={post.date}
            content={post.content}
            upvotes={post.upvotes}
            downvotes={post.downvotes}
            setRefresh={setRefresh}
            setShowAlert={setShowAlert}
          />
        </div>
        {/* <div className="flex flex-col bg-slate-300 mx-4 px-4 shadow-md shadow-black">
          <Comments />
        </div> */}
        <div className="flex flex-col items-center justify-center md:w-[700px] w-full h-20 bg-slate-300 mx-4 px-4 shadow-md shadow-black">
          Comments in the future
        </div>
      </div>
    </>
  );
};

export default Post;
