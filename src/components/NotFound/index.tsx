import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

type Props = {};

const NotFound = (props: Props) => {
  return (
    <div className={styles["not-found"]}>
      <h2 className={styles["not-found__header"]}>
        Not Found, go back to{" "}
        <Link to="/" className={styles["not-found__anchor"]}>
          Home
        </Link>
      </h2>
    </div>
  );
};

export default NotFound;
