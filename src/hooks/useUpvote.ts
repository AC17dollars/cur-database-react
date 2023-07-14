interface UpvoteDownvoteData {
  post_id: number;
  upvote: boolean;
  downvote: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const useUpvote = () => {
  const upvoteDownvote = async ({
    post_id,
    upvote,
    downvote,
    setRefresh,
  }: UpvoteDownvoteData) => {
    try {
      const response = await fetch("/api/upvotedownvote", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_id: post_id,
          upvote: upvote!,
          downvote: downvote!,
        }),
      });
      if (response.status === 200) {
        await response.json();
        setRefresh((prev) => !prev);
      } else {
        console.log("Error updating upvotes/downvotes");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { upvoteDownvote };
};

export default useUpvote;
