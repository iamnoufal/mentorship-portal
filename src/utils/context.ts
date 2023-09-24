import { createContext } from "react";
import { AppContextType, UserType } from "./types";

// default data for user
export const UserDefaultData: UserType = {
  name: "",
  regno: "",
  year: "",
  email: "",
  department: "",
  type: "student",
};

// creating context
export const AppContext = createContext<AppContextType>({
  user: UserDefaultData,
  loading: true,
  setUser: () => {},
  setLoading: () => {},
  theme: "light",
  setTheme: () => {},
});
