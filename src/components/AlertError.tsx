import { FaWindowClose } from "react-icons/fa";

const AlertError = ({
  setIsError,
}: {
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className="fixed z-40 text-zinc-700 min-h-screen w-full rounded-lg shadow-md bg-slate-300 backdrop-blur-sm bg-opacity-60 flex items-center justify-center"
      onClick={() => {
        setIsError(false);
      }}
    >
      <div
        className="relative flex border border-black p-10 rounded-lg bg-slate-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* put a close div */}
        <div
          className="absolute top-0 right-0 flex items-start justify-end w-10 h-10"
          onClick={() => {
            setIsError(false);
          }}
        >
          <FaWindowClose className="text-red-500 bg-slate-300 hover:text-red-600 w-6 h-6 rounded-full " />
        </div>

        <div className="py-1">
          <svg
            className="w-6 h-6 mr-4 text-red-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10.293 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 101.414 
                    1.414L4 8.414V14a2 2 0 002 2h8a2 2 0 002-2V8.414l1.293 
                    1.293a1 1 0 00 1.414-1.414l-7-7z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div>
          <p className="font-bold text-xl">Error</p>
          <p className="text-lg">Something went wrong.</p>
        </div>
      </div>
    </div>
  );
};

export default AlertError;
