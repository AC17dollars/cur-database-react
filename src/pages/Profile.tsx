import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import AppContext from "../misc/AppContext";
import Error from "./Error";
import Loading from "../components/Loading";
dayjs.extend(RelativeTime);

interface UserPostData {
  userdata: UserData;
  postdata: PostData[];
}

interface PostData {
  post_id: number;
  title: string;
  date: string;
  upvotes: number;
  downvotes: number;
}
interface UserData {
  name: string;
  email: string;
  dob: string;
}

const Profile = () => {
  const [profileData, setProfileData] = useState<UserPostData>();
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const { loggedAs } = useContext(AppContext);

  async function fetchUserPosts(email: string) {
    const response = await fetch(`/api/user?id=${email}`);
    const data: UserPostData = await response.json();
    if (response.status == 200) return data;
    else return false;
  }
  const profileID = location.pathname.split("/")[2];

  useEffect(() => {
    fetchUserPosts(profileID).then((data) => {
      if (!data) {
        setIsError(true);
        return;
      }
      setProfileData(data);
    });
  }, []);

  if (!loggedAs) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen gap-2">
        Not Logged In
        <Link
          to="/login"
          className="border rounded-md border-blue-400 bg-blue-400 text-white p-2 hover:bg-blue-500"
        >
          Login
        </Link>
      </div>
    );
  }

  if (isError) {
    return <Error />;
  }
  if (!profileData) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col w-full lg:w-2/3 min-h-screen pt-24 px-6 mx-auto">
      <div className="flex flex-col text-right bg-slate-400 rounded-md shadow-md shadow-black">
        <h1 className="text-3xl font-bold">{profileData.userdata.name}</h1>
        <span className="text-md font-thin">{profileData.userdata.email}</span>
        <span className="text-md font-thin">{profileData.userdata.dob}</span>
      </div>
      <div className="m-2 p-2 text-2xl font-bold bg-slate-400 rounded-sm shadow-md shadow-black">
        Posts:{" "}
        <span className="font-thin text-sm text-black">
          (editing posts will come in future)
        </span>
      </div>
      <div>
        {profileData.postdata.map((post) => (
          <Post
            key={post.post_id}
            title={post.title}
            date={post.date}
            post_id={post.post_id}
            upvotes={post.upvotes}
            downvotes={post.downvotes}
          />
        ))}
      </div>
    </div>
  );
};

const Post = (props: PostData) => {
  const { post_id, date, title, upvotes, downvotes } = props;
  return (
    <div className="m-4 p-2 shadow-sm shadow-black bg-slate-400 rounded-sm">
      <Link to={`/post/${post_id}`}>
        <div className="flex items-center gap-2">
          <Link
            to={`/post/${post_id}`}
            className="text-lg hover:underline font-bold"
          >
            {title}
          </Link>
          <span className="font-extralight text-sm">
            {dayjs(date).format("YYYY-MM-DD @ HH:mm")}
          </span>
        </div>
        <span className="flex items-center gap-1">
          {upvotes}
          <FaArrowUp />
          |
          <FaArrowDown />
          {downvotes}
        </span>
      </Link>
    </div>
  );
};

export default Profile;
