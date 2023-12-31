import { useState } from "react";
import Cookies from "universal-cookie";

interface UserInformation {
  id: number;
  email: string;
  name: string;
}
interface SignUpData {
  name: string;
  email: string;
  password: string;
  dob: string;
  passwordConfirm: string;
}

const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<
    false | UserInformation
  >(false);

  const login = async (email?: string, password?: string) => {
    let token: string | undefined = new Cookies().get("token");
    if (!token || token == "") {
      token = undefined;
    }
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token!,
        },
        body: JSON.stringify({
          email: email!,
          password: password!,
        }),
      });
      if (response.status === 200) {
        const data = await response.json();
        const cookie = new Cookies();
        cookie.set("token", data?.token!, { path: "/" });
        setIsAuthenticated({
          email: data?.email,
          name: data?.name,
          id: data?.id,
        });
        return true;
      } else {
        new Cookies().remove("token");
        setIsAuthenticated(false);
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const signup = async (props: SignUpData) => {
    const { name, email, password, dob } = props;
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          dob: dob,
        }),
      });
      if (response.status == 200) {
        const data = await response.json();
        const cookie = new Cookies();
        cookie.set("token", data?.token!, { path: "/" });
        setIsAuthenticated({
          email: data?.email,
          name: data?.name,
          id: data?.id,
        });
        return true;
      } else {
        throw new Error("DB error");
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    new Cookies().remove("token");
  };

  return { isAuthenticated, login, logout, signup };
};

export default useAuthentication;
