import { Link } from "react-router-dom";
import { FaWindowClose } from "react-icons/fa";

const AlertLogin = ({
  setShowAlert,
}: {
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className="z-20 flex fixed bg-opacity-50 backdrop-blur-sm w-full min-h-screen bg-slate-300 justify-center items-center"
      onClick={() => {
        setShowAlert(false);
      }}
    >
      <div
        className="flex relative flex-col items-center justify-center md:w-96 bg-slate-200 rounded-md shadow-md p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute top-0 right-0 flex items-start justify-end w-10 h-10"
          onClick={() => {
            setShowAlert(false);
          }}
        >
          <FaWindowClose className="text-red-500 bg-slate-300 hover:text-red-600 w-6 h-6 rounded-full " />
        </div>

        <div className="flex flex-col items-center justify-center text-center w-full h-full gap-2">
          <span className="text-2xl font-semibold">You're not logged in</span>
          <span className="text-sm font-light">
            You must login to post and vote.
          </span>
          <span className="text-lg md:w-40 md:h-10 flex">
            <Link
              to="/login"
              className="text-slate-100 rounded border border-black bg-blue-500 h-full w-full flex items-center justify-center"
            >
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AlertLogin;
