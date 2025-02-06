import React, { ReactNode, RefObject } from "react";
import styles from "./ModalTemplate.module.scss";
import ModalTemplateProps from "@/models/ModalTemplateProps";

const ModalTemplate: React.FC<ModalTemplateProps> = ({
  drawerRef,
  closeModalWindow,
  children,
}) => {
  return (
    <div className={styles.overlay}>
      <div ref={drawerRef} className={styles.drawer}>
        <button className={styles.closeButton} onClick={closeModalWindow}>
          <span className={styles.vissualyHidden}>Закрыть</span>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalTemplate;
