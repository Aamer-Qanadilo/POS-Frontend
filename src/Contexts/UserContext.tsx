import jwtDecode from "jwt-decode";
import * as React from "react";
import axios from "axios";
import httpCommon from "../http-common";
import { LoaderContext } from "./LoaderContext";

interface props {
  children: React.ReactNode;
}

interface ContextValues {
  user?: string | null;
  handleUser?: (token: string) => Promise<void>;
}

export const UserContext = React.createContext<ContextValues>({});

export const UserProvider = ({ children }: props) => {
  const [user, setUser] = React.useState<string | null>();
  const { startLoader, stopLoader } = React.useContext(LoaderContext);

  const handleUser = async (token: string) => {
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
          localStorage.setItem("token", token);
        }
      }
    } catch (error) {
      // Invalid token, no need to do anything
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  React.useEffect(() => {
    const tokenItem: string | null = localStorage.getItem("token");
    if (tokenItem) {
      handleUser(tokenItem);
    }
  }, []);

  React.useEffect(() => {
    stopLoader();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, handleUser }}>
      {children}
    </UserContext.Provider>
  );
};
