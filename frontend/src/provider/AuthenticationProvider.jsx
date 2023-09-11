import { createContext, useState } from "react";

export const AuthenticationContext = createContext({});

export const AuthenticationProvider = (props) => {
  const [userData, setUserData] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthenticationContext.Provider
      value={{ userData, setUserData, isAuthenticated, setIsAuthenticated }}
    >
      {props.children}
    </AuthenticationContext.Provider>
  );
};
