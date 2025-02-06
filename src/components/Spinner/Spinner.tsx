import React from "react";
import styles from "@/components/Spinner/Spinner.module.scss";

const Spinner: React.FC = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Spinner;
