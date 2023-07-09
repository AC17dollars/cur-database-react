import {
  BaseSyntheticEvent,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../misc/AppContext";
import Loading from "../components/Loading";
import Cookies from "universal-cookie";

interface PostData {
  title: string;
  content: string;
  author: string;
  date: string;
}

const Create = () => {
  const { loggedAs } = useContext(AppContext);
  const navigator = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onChange = (event: BaseSyntheticEvent) => setValue(event.target.value);
  const MIN_TEXTAREA_HEIGHT = 150;

  useEffect(() => {
    if (!loggedAs) {
      navigator("/login");
    }
  }, [loggedAs]);

  async function submitPost(e: BaseSyntheticEvent) {
    e.preventDefault();
    if (loggedAs) {
      const formData = new FormData(e.target);
      const data: PostData = JSON.parse(
        JSON.stringify(Object.fromEntries(formData.entries()))
      );
      data.content = data.content.replace(/'/g, `"`);

      data.author = loggedAs.email;
      data.date = new Date().toISOString();

      const response = await fetch("/api/createpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": new Cookies().get("token"),
        },
        body: JSON.stringify(data),
      });

      setIsSubmitting(false);
      if (response.status === 200) {
        navigator("/");
      } else {
      }
    }
  }

  useLayoutEffect(() => {
    // Reset height - important to shrink on delete
    textareaRef.current!.style.height = "inherit";
    // Set height
    textareaRef.current!.style.height = `${Math.max(
      textareaRef.current!.scrollHeight,
      MIN_TEXTAREA_HEIGHT
    )}px`;
  }, [value]);
  return (
    <>
      {isSubmitting && <Loading />}
      <div className="min-h-screen items-center justify-center flex">
        <div className="flex flex-col lg:w-1/2 md:w-3/5 sm:w-4/5 w-full items-center gap-4 p-6 m-6 bg-slate-200 rounded-xl shadow-md">
          <h1 className="lg:text-3xl font-bold text-2xl text-black">
            Create a Post
          </h1>
          <form
            className="flex flex-col gap-1 w-full"
            onSubmit={(e) => {
              setIsSubmitting(true);
              submitPost(e);
            }}
          >
            <label className="text-lg font-semibold" htmlFor="title">
              Title
            </label>
            <input
              className="rounded-md px-4 py-2 w-full mt-1 text-gray-900 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none border"
              id="title"
              name="title"
              placeholder="Title"
              maxLength={100}
              onChange={onChange}
              required
            />

            <label className="text-lg font-semibold" htmlFor="body">
              Content
            </label>
            <textarea
              ref={textareaRef}
              onChange={onChange}
              className="rounded-md px-2 py-1 resize-none"
              id="content"
              name="content"
              placeholder="Enter your post here"
            />
            <button className="px-5 py-2 bg-blue-500 rounded-md hover:bg-blue-600 text-white font-semibold mt-5">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
