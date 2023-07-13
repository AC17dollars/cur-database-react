import { Link } from "react-router-dom";

export default function Error() {
  window.scrollTo(0, document.body.scrollHeight);
  return (
    <>
      <div className="absolute w-full h-screen bg-purple-600">
        <div
          id="error-page"
          className="flex flex-col gap-8 justify-center items-center content-center h-screen"
        >
          <h1 className="lg:text-6xl font-bold text-2xl text-white">Oops!</h1>
          <p className="text-xl text-white">
            Sorry, an unexpected error has occurred.
          </p>
          <p className="text-3xl text-white">
            Please check your request properly.
          </p>
          <div className="mt-4">
            <Link
              to="/"
              className="px-5 py-2 bg-white rounded-md hover:bg-gray-100"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
