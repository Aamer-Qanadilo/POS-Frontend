import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { UserContext } from "../../Contexts/UserContext";

type Props = {};

const NotFound = (props: Props) => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    document.title = "POS-Foothill | Not Found";
  }, []);

  return (
    <div className={styles["not-found"]}>
      <h2 className={styles["not-found__header"]}>
        Not Found, go back to{" "}
        {user ? (
          <Link to="/" className={styles["not-found__anchor"]}>
            Home
          </Link>
        ) : (
          <Link to="/login" className={styles["not-found__anchor"]}>
            Home
          </Link>
        )}
      </h2>
    </div>
  );
};

export default NotFound;
