import { useNavigate } from "react-router-dom";
import AppContext from "../misc/AppContext";
import { BaseSyntheticEvent, useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";

interface SignUpData {
  name: string;
  email: string;
  password: string;
  dob: string;
  passwordConfirm: string;
}

const SignUp = () => {
  const { loggedAs, signup } = useContext(AppContext);
  const [passwordError, setPasswordError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigator = useNavigate();

  useEffect(() => {
    if (loggedAs) {
      navigator("/");
    }
  }, [loggedAs]);

  async function submitForm(e: BaseSyntheticEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    if (formData.get("password") !== formData.get("confirm-password")) {
      setPasswordError(true);
      setTimeout(() => {
        setPasswordError(false);
      }, 5000);
      setIsSubmitting(false);
      return;
    }

    const data: SignUpData = JSON.parse(
      JSON.stringify(Object.fromEntries(formData.entries()))
    );

    await signup(data);
    setIsSubmitting(false);
  }

  return (
    <>
      {isSubmitting && <Loading />}
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-slate-50">
        <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col w-full max-w-sm space-y-8">
            <div className="flex flex-col items-center justify-center w-full space-y-6">
              <img
                className="w-auto h-12"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              />
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Sign up for an account
              </h2>
            </div>
            <div className="flex flex-col items-center justify-center w-full space-y-6">
              <form
                className="flex flex-col items-center justify-center w-full space-y-6"
                onSubmit={(e) => {
                  setIsSubmitting(true);
                  submitForm(e);
                }}
              >
                <div className="flex flex-col items-start w-full gap-1">
                  <label
                    htmlFor="Name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div className="relative w-full my-1">
                    <input
                      id="name"
                      name="name"
                      type="name"
                      autoComplete="Name"
                      required
                      className="block w-full px-4 py-2 mt-1 text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none border"
                    />
                  </div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="relative w-full my-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full px-4 py-2 mt-1 text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none border"
                    />
                  </div>
                  <label
                    htmlFor="date"
                    className="text-sm font-medium text-gray-700"
                  >
                    Date of Birth
                  </label>
                  <div className="relative w-full my-1">
                    <input
                      id="date"
                      name="dob"
                      type="date"
                      required
                      className="block w-full px-4 py-2 mt-1 text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none border"
                    />
                  </div>
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative w-full my-1">
                    <input
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
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="relative w-full my-1">
                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      required
                      maxLength={30}
                      minLength={8}
                      className={`block w-full px-4 py-2 mt-1 text-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none border ${
                        passwordError ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  <div className="relative w-full my-10">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none"
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUp;
