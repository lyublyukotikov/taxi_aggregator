import React from "react";
import styles from "@/components/ActionModal/ActionModal.module.scss";
import { ErrorDisplayProps } from "@/models/ErrorDisplayProps";

const ActionModal: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.errorMessage}>
       
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ActionModal;
