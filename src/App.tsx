import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import useAuthentication from "./hooks/useAuthentication";
import AppContext from "./misc/AppContext";
import Cookies from "universal-cookie";
import Loading from "./components/Loading";
import Create from "./pages/Create";
import Page404 from "./pages/404";

function App() {
  const { isAuthenticated, login, logout, signup } = useAuthentication();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setIsLoading(true);
      login().then(() => {
        setIsLoading(false);
      });
    }
  }, [token]);

  return (
    <>
      {isLoading && <Loading />}
      <AppContext.Provider
        value={{
          loggedAs: isAuthenticated,
          login,
          logout,
          signup,
        }}
      >
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/signup" Component={SignUp} />
            <Route path="/login" Component={Login} />
            <Route path="/create" Component={Create} />
            <Route path="*" Component={Page404} />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </>
  );
}

export default App;
