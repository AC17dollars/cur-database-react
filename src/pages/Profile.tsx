import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { GoKebabHorizontal } from "react-icons/go";

import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import Error from "./Error";
import Loading from "../components/Loading";
import AppContext from "../misc/AppContext";
import Cookies from "universal-cookie";
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
  isCurrentUser: boolean;
  handleDelete: (post_id: number) => void;
}
interface UserData {
  name: string;
  email: string;
  dob: string;
}

const Profile = () => {
  const [profileData, setProfileData] = useState<UserPostData>();
  const [isError, setIsError] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const location = useLocation();
  const { loggedAs } = useContext(AppContext);
  const [refetch, setRefetch] = useState(false);

  async function fetchUserPosts(email: string) {
    const response = await fetch(`/api/user?id=${email}`);
    const data: UserPostData = await response.json();
    if (response.status == 200) return data;
    else return false;
  }
  const profileID = location.pathname.split("/")[2];

  useEffect(() => {
    if (!loggedAs) {
      setIsCurrentUser(false);
    }
  }, [loggedAs]);

  useEffect(() => {
    fetchUserPosts(profileID).then((data) => {
      if (!data) {
        setIsError(true);
        return;
      }
      setProfileData(data);
      if (loggedAs && loggedAs.id == parseInt(profileID))
        setIsCurrentUser(true);
    });
  }, [refetch, profileID]);

  async function handleDelete(post_id: number) {
    console.log(new Cookies().get("token"));
    const response = await fetch(`/api/deletepost`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": new Cookies().get("token"),
      },
      body: JSON.stringify({
        post_id: post_id,
        author: profileData?.userdata.email,
      }),
    });
    if (response.status == 200) {
      setRefetch(!refetch);
    }
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
            isCurrentUser={isCurrentUser}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

const Post = (props: PostData) => {
  const [DropdownOpen, toggleDropdown] = useState(false);
  const { loggedAs } = useContext(AppContext);
  useEffect(() => {
    if (!loggedAs) {
      toggleDropdown(false);
    }
  }, [loggedAs]);

  const {
    post_id,
    date,
    title,
    upvotes,
    downvotes,
    isCurrentUser,
    handleDelete,
  } = props;
  return (
    <div className="m-4 p-2 shadow-sm shadow-black bg-slate-400 rounded-sm">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 justify-start">
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
        <div className="relative">
          {isCurrentUser && (
            <GoKebabHorizontal
              className="text-black w-6 h-6 hover:cursor-pointer"
              onClick={() => toggleDropdown(!DropdownOpen)}
            />
          )}
          {DropdownOpen && (
            <DropDownMenu post_id={post_id} handleDelete={handleDelete} />
          )}
        </div>
      </div>
      <span className="flex items-center gap-1">
        {upvotes}
        <FaArrowUp />
        |
        <FaArrowDown />
        {downvotes}
      </span>
    </div>
  );
};

const DropDownMenu = ({
  post_id,
  handleDelete,
}: {
  post_id: number;
  handleDelete: (post_id: number) => void;
}) => {
  return (
    <div className="absolute left-[-50px] px-4 pt- bg-slate-500 w-20 rounded-md shadow-sm shad-black text-slate-200">
      <div className="flex flex-col text-right h-full gap-2">
        <Link to={`/edit/${post_id}`} className="hover:underline">
          Edit
        </Link>
        <div
          className="hover:underline hover:cursor-pointer"
          onClick={() => {
            handleDelete(post_id);
          }}
        >
          Delete
        </div>
      </div>
    </div>
  );
};

export default Profile;
