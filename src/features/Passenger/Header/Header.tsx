import React from "react";
import DynamicButton from "@/components/DynamicButton/DynamicButton";
import styles from "@/features/Passenger/Header/Header.module.scss";
import { HeaderProps } from "@/models/HeaderProps";

const Header: React.FC<HeaderProps> = ({ onAddTripClick }) => {
  return (
    <div className={styles.header}>
      <h2>Список поездок</h2>
      <DynamicButton
        label="Добавить поездку"
        onClick={onAddTripClick}
        className={styles.addButton}
      />
    </div>
  );
};

export default Header;
