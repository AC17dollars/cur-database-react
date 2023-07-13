import { createContext } from "react";

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
// interface PostData {
//   post_id: number;
//   title: string;
//   content: string;
//   author: string;
//   date: string;
//   upvotes: number;
//   downvotes: number;
// }

interface AppContextProps {
  loggedAs: false | UserInformation;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (props: SignUpData) => Promise<boolean>;
}

const AppContext = createContext<AppContextProps>({
  loggedAs: false,
  login: () => Promise.resolve(false),
  logout: () => {},
  signup: () => Promise.resolve(false),
});

export default AppContext;
