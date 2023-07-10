import { NavLink, Link, useLocation } from "react-router-dom";
import UserIcon from "../assets/user.png";
import { useContext, useEffect, useState } from "react";
import AppContext from "../misc/AppContext";
import LoggedIcon from "../assets/man.png";

export default function NavBar() {
  const [sticky, setSticky] = useState(true);

  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      setSticky(true);
    } else {
      setSticky(false);
    }
  }, [location.pathname]);

  return (
    <nav
      className={`${
        sticky ? "sticky" : "fixed"
      } top-0 left-0 z-10 w-full h-20 bg-[#2f3231] backdrop-blur shadow-2xl flex`}
    >
      <div className="flex items-center justify-between w-full h-full px-4 mx-auto">
        <div className="flex items-center justify-start">
          <NavLink
            to="/"
            className="flex items-center justify-center h-10 text-2xl font-bold text-white"
          >
            <span className="text-[#61dafb]">cur-Database</span>
          </NavLink>
        </div>
        <div className="flex items-center justify-end">
          <div className="flex items-center justify-center h-10 space-x-4">
            <a
              href="https://github.com/AC17dollars/cur-database-react"
              target="_blank"
              rel="noreferrer"
              className="text-lg font-medium text-white"
            >
              About
            </a>
            {/* <NavLink to="/about" className="text-lg font-medium text-white">
              About
            </NavLink> */}
            <ProfileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}

const ProfileMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { loggedAs, logout } = useContext(AppContext);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="w-full inline-flex justify-center px-4 py-2 text-sm font-medium rounded-ee-2xl rounded-ss-2xl bg-slate-50 hover:bg-sky-200"
          id="options-menu"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <img
            className="w-8 h-8 rounded-full"
            src={loggedAs ? LoggedIcon : UserIcon}
            alt="Profile Picture"
          />
        </button>
      </div>
      {isMenuOpen && (
        <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {loggedAs && (
              <>
                <Link
                  to="/profile"
                  className="block px-4 py-2 font-bold text-md text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {loggedAs.name}
                </Link>
                <hr />
              </>
            )}
            <Link
              to="/create"
              className="block px-4 py-2 text-sm font-bold text-gray-900 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={() => setIsMenuOpen(false)}
            >
              Create a Post
            </Link>
            <Link
              to={loggedAs ? "?settings" : "/signup"}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={() => setIsMenuOpen(false)}
            >
              {loggedAs ? "Settings" : "Signup"}
            </Link>
            <Link
              to={loggedAs ? "?logout" : "/login"}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={
                loggedAs
                  ? () => {
                      logout();
                      setIsMenuOpen(!isMenuOpen);
                    }
                  : () => {
                      setIsMenuOpen(!isMenuOpen);
                    }
              }
            >
              {loggedAs ? "Logout" : "Login"}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
