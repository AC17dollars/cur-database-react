import { Link, useNavigate } from "react-router-dom";
import AppContext from "../misc/AppContext";
import {
  BaseSyntheticEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Loading from "../components/Loading";

const Login = () => {
  const { loggedAs, login } = useContext(AppContext);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigator = useNavigate();

  useEffect(() => {
    if (loggedAs) {
      navigator("/");
    }
  }, [loggedAs]);

  return (
    <>
      {isSubmitting && <Loading />}
      <div className="flex items-center justify-center min-h-screen py-2 bg-slate-50">
        <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center w-full max-w-md space-y-8">
            <div>
              <img
                className="w-auto h-12"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              />
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <form
              className="flex flex-col items-center justify-center w-full space-y-6"
              onSubmit={async (e: BaseSyntheticEvent) => {
                setIsSubmitting(true);
                e.preventDefault();
                const response = await login(
                  emailRef.current!.value,
                  passwordRef.current!.value
                );
                if (response == true) {
                  e.target?.reset();
                }
                setIsSubmitting(false);
              }}
            >
              <div className="flex flex-col items-start w-full">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="relative w-full">
                  <input
                    ref={emailRef}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full px-4 py-2 mt-1 text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none border"
                  />
                </div>
              </div>
              <div className="flex flex-col items-start w-full">
                <div className="flex items-center justify-between w-full">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
                <div className="relative w-full">
                  <input
                    ref={passwordRef}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    maxLength={30}
                    minLength={8}
                    className="block w-full px-4 py-2 mt-1 text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none border"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="remember_me"
                    className="block ml-2 text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link
                    to="/signup"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    New user? Sign up!
                  </Link>
                </div>
              </div>
              <div className="relative w-full">
                <button
                  type="submit"
                  className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
