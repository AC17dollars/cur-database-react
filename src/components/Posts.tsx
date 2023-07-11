import { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import useUpvote from "../hooks/useUpvote";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
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
}) => {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const { upvoteDownvote } = useUpvote();

  function onUpvoteClick() {
    setUpvoted(!upvoted);
    setDownvoted(downvoted ? !downvoted : downvoted);
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
            onUpvoteClick();
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
            onDownVoteClick();
          }}
        />
      </div>
      <div className="flex flex-col w-full text-left">
        <div className="flex w-full gap-2 items-baseline ml-1">
          <span className="sm:text-md text-sm font-semibold">{author}</span>•
          {/* if date is larger than 1 day difference show date else show relative */}
          <span className="text-sm font-light">
            {dayjs().diff(dayjs(date), "hours") > 24
              ? dayjs(date).format("YYYY-MM-DD")
              : dayjs(date).fromNow()}
          </span>
        </div>
        <div className="sm:text-2xl md:text-3xl text-xl my-2 font-bold">
          {title}
        </div>
        <div className="sm:text-lg md:text-md text-sm text-left">{content}</div>
      </div>
    </div>
  );
};

export default Posts;
