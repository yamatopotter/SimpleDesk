import { createContext, useState } from "react";

export const AuthenticationContext = createContext({});

export const AuthenticationProvider = (props) => {
  const [userData, setUserData] = useState({});

  return (
    <AuthenticationContext.Provider value={{ userData, setUserData }}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};
