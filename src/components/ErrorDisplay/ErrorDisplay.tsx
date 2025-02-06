import React from "react";
import styles from "@/components/ErrorDisplay/ErrorDisplay.module.scss";
import { ErrorDisplayProps } from "@/models/ErrorDisplayProps";

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.errorMessage}>
        <h2>Произошла ошибка</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorDisplay;
