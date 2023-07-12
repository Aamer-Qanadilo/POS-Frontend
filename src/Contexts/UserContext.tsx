import jwtDecode from "jwt-decode";
import * as React from "react";
import axios from "axios";
import httpCommon from "../http-common";
import { LoaderContext } from "./LoaderContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface props {
  children: React.ReactNode;
}

interface ContextValues {
  user?: string | null;
  authUser?: (token: string) => Promise<void>;
  handleUserToken?: (token: string) => void;
}

export const UserContext = React.createContext<ContextValues>({});

export const UserProvider = ({ children }: props) => {
  const [user, setUser] = useLocalStorage<string>("token", "");
  const { startLoader, stopLoader } = React.useContext(LoaderContext);

  const handleUserToken = (token: string) => {
    setUser(token);
  };

  const authUser = async (token: string) => {
    startLoader();

    try {
      const decoded = await jwtDecode(token);

      if (decoded) {
        const { data } = await httpCommon.get("/verifyToken", {
          headers: {
            authorization: "foothill__" + token,
          },
        });

        if (data.message == "success") {
          setUser(token);
        } else {
          setUser("");
        }
      }
    } catch (error) {
      // Invalid token, no need to do anything
      setUser("");
    }

    stopLoader();
  };

  React.useEffect(() => {
    authUser(user);
  }, []);

  return (
    <UserContext.Provider value={{ user, authUser, handleUserToken }}>
      {children}
    </UserContext.Provider>
  );
};
