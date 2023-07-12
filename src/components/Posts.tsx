import { useContext, useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import useUpvote from "../hooks/useUpvote";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import AppContext from "../misc/AppContext";
import { Link } from "react-router-dom";
dayjs.extend(RelativeTime);

interface PostsProps {
  post_id: number;
  author: string;
  title: string;
  content: string;
  date: string;
  upvotes: number;
  downvotes: number;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
}
const Posts: React.FC<PostsProps> = ({
  post_id,
  author,
  title,
  content,
  date,
  downvotes,
  upvotes,
  setRefresh,
  setShowAlert,
}) => {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const { loggedAs } = useContext(AppContext);
  const { upvoteDownvote } = useUpvote();

  function onUpvoteClick() {
    setUpvoted(!upvoted);
    setDownvoted(downvoted ? !downvoted : downvoted);
    if (post_id != 0)
      upvoteDownvote({
        post_id: post_id,
        upvote: !upvoted,
        downvote: downvoted ? !downvoted : downvoted,
        setRefresh: setRefresh,
      });
  }

  function onDownVoteClick() {
    setDownvoted(!downvoted);
    setUpvoted(upvoted ? !upvoted : upvoted);
    upvoteDownvote({
      post_id: post_id,
      upvote: upvoted ? !upvoted : upvoted,
      downvote: !downvoted,
      setRefresh: setRefresh,
    });
  }

  return (
    <>
      <div
        className="w-full flex text-left my-6 py-6 bg-zinc-700 text-white rounded-xl shadow-lg shadow-black"
        id={post_id.toString()}
      >
        <div className="flex flex-col gap-2 m-3 text-center">
          <FaArrowUp
            className={`w-8 h-8 ${
              upvoted
                ? "text-orange-500 hover:text-orange-300"
                : "text-white  hover:text-orange-300"
            }`}
            onClick={() => {
              if (loggedAs) onUpvoteClick();
              else setShowAlert(true);
            }}
          />
          <span className="text-md font-normal">{upvotes - downvotes}</span>
          <FaArrowDown
            className={`w-8 h-8 ${
              downvoted
                ? "text-blue-500 hover:text-blue-300"
                : "text-white hover:text-blue-300"
            }`}
            onClick={() => {
              if (loggedAs) onDownVoteClick();
              else setShowAlert(true);
            }}
          />
        </div>
        <div className="flex flex-col w-full text-left">
          <div className="flex w-full gap-2 items-baseline ml-1">
            <span className="sm:text-md text-sm font-semibold">{author}</span>•
            {/* if date is larger than 1 day difference show date else show relative */}
            <span className="text-sm font-light">
              {dayjs().diff(dayjs(date), "hours") > 24
                ? dayjs(date).format("YYYY-MM-DD HH:mm")
                : dayjs(date).fromNow()}
            </span>
          </div>
          <Link
            to={`/post/${post_id}`}
            className="sm:text-2xl md:text-3xl text-xl my-2 font-bold hover:underline"
          >
            {title}
          </Link>
          <div className="sm:text-lg md:text-md text-sm text-left">
            {content}
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;
