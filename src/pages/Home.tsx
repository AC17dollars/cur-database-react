import { SetStateAction, useEffect, useState } from "react";
import Posts from "../components/Posts";
import RightBar from "../components/RightBar";
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

export default function Home() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<
    "date" | "popular" | "controversy" | "upvotes"
  >("date");

  useEffect(() => {
    switch (sortBy) {
      case "date":
        setPosts(
          [...posts].sort((a, b) => {
            return new Date(a.date).getTime() > new Date(b.date).getTime()
              ? -1
              : 1;
          })
        );
        break;
      case "popular":
        setPosts(
          [...posts].sort((a, b) => {
            return b.upvotes + b.downvotes - (a.upvotes + a.downvotes);
          })
        );
        break;
      case "controversy":
        setPosts(
          [...posts].sort((a, b) => {
            return a.downvotes > b.downvotes ? -1 : 1;
          })
        );
        break;
      case "upvotes":
        setPosts(
          [...posts].sort((a, b) => {
            return b.upvotes - b.downvotes - (a.upvotes - a.downvotes);
          })
        );
        break;
      default:
        setPosts((prev) =>
          prev.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime()
              ? 1
              : -1;
          })
        );
        break;
    }
  }, [sortBy]);

  const defaultPosts: PostData[] = [
    {
      post_id: 0,
      title: "ERROR LOADING POSTS",
      content: "An error has occured while loading the posts.",
      author: "ADMIN",
      date: new Date().toISOString(),
      upvotes: 17,
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
        setPosts(data);
        setSortBy("date");
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
      setSortBy("date");
    }, 1000 * 60 * 5);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [refresh]);

  return (
    <>
      {showAlert && <AlertLogin setShowAlert={setShowAlert} />}
      <div className="flex items-center justify-start w-full h-full">
        <div className="md:w-1/4 md:block hidden"></div>
        <div className="flex flex-col items-center justify-center w-full h-full bg-slate-200 mx-4 px-4 shadow-md shadow-black">
          <div className="lg:flex w-full h-full hidden">
            <SortBy sortBy={sortBy} setSortBy={setSortBy} />
          </div>
          <div className="lg:hidden w-full h-full flex">
            <MobileSortBy sortBy={sortBy} setSortBy={setSortBy} />
          </div>
          {posts.map((post) => (
            <Posts
              setShowAlert={setShowAlert}
              setRefresh={setRefresh}
              key={post.post_id}
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
        <div className="block md:hidden md:w-1/5"></div>
        <div className="w-2/3 justify-center hidden sm:block">
          <RightBar />
        </div>
      </div>
    </>
  );
}
const SortBy = ({
  sortBy = "date",
  setSortBy,
}: {
  sortBy?: "date" | "popular" | "controversy" | "upvotes";
  setSortBy: React.Dispatch<
    SetStateAction<"date" | "popular" | "controversy" | "upvotes">
  >;
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-slate-200 mx-4 p-2">
      <div className="flex flex-row items-center justify-center w-full h-16 bg-stone-600 rounded-xl p-2 m-2 gap-4">
        <div className="flex flex-row items-center justify-center w-1/3 h-full">
          <p className="text-white font-bold text-lg">Sort By:</p>
        </div>
        <div
          className={`flex flex-row items-center justify-center w-1/3 h-full rounded-lg hover:border ${
            sortBy == "date" ? "bg-stone-500" : "bg-stone-600"
          }`}
          onClick={() => setSortBy("date")}
        >
          <p className="text-white font-extralight text-lg">Date</p>
        </div>

        <div
          className={`flex flex-row items-center justify-center w-1/3 h-full rounded-lg hover:border ${
            sortBy == "popular" ? "bg-stone-500" : "bg-stone-600"
          }`}
          onClick={() => setSortBy("popular")}
        >
          <p className="text-white font-extralight text-lg">Popularity</p>
        </div>
        <div
          className={`flex flex-row items-center justify-center w-1/3 h-full rounded-lg hover:border ${
            sortBy == "controversy" ? "bg-stone-500" : "bg-stone-600"
          }`}
          onClick={() => setSortBy("controversy")}
        >
          <p className="text-white font-extralight text-lg">Controversial</p>
        </div>
        <div
          className={`flex flex-row items-center justify-center w-1/3 h-full rounded-lg hover:border ${
            sortBy == "upvotes" ? "bg-stone-500" : "bg-stone-600"
          }`}
          onClick={() => setSortBy("upvotes")}
        >
          <p className="text-white font-extralight text-lg">Net Upvotes</p>
        </div>
      </div>
    </div>
  );
};

const MobileSortBy = ({
  sortBy = "date",
  setSortBy,
}: {
  sortBy?: "date" | "popular" | "controversy" | "upvotes";
  setSortBy: React.Dispatch<
    SetStateAction<"date" | "popular" | "controversy" | "upvotes">
  >;
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-slate-200 mx-4 p-2">
      <div className="flex flex-row items-center justify-center w-full h-16 bg-stone-600 rounded-xl p-2 m-2 gap-4">
        <div className="flex flex-row items-center justify-center w-1/3 h-full">
          <p className="text-white font-bold text-lg">Sort By:</p>
        </div>
        <div className="flex flex-row items-center justify-center w-1/3 h-full rounded-lg bg-stone-600">
          <select
            className="text-white font-extralight text-lg bg-transparent [&>*]:text-black [&>*]:bg-slate-200 outline-none"
            value={sortBy}
            onChange={(e) =>
              setSortBy(
                e.target.value as "date" | "popular" | "controversy" | "upvotes"
              )
            }
          >
            <option value="date">Date</option>
            <option value="popular">Popularity</option>
            <option value="controversy">Controversial</option>
            <option value="upvotes">Net Upvotes</option>
          </select>
        </div>
      </div>
    </div>
  );
};
