import useLocalStorage from "@/hooks/useLocalStorage";
import React, { useContext } from "react";

const AuthContext = React.createContext({
  isAuth: false,
  logout: () => {},
  login: () => {},
});

const { Provider } = AuthContext;

interface AuthProviderProps {
  children: any;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // get value from the localstorage
  const [storedValue, setValue] = useLocalStorage("x-token", "");

  const logout = () => {
    setValue("");
  };

  const login = () => {
    setValue("7920457349203-24567823232-42678834561713-24767657682-76546789");
  };

  // decode value
  const value = {
    isAuth: storedValue ? true : false,
    logout,
    login,
  };

  return <Provider value={value}>{children}</Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
