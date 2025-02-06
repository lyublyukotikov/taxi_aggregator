import React from "react";
import { useNavigate } from "react-router-dom";
import DynamicButton from "@/components/DynamicButton/DynamicButton";
import RegionSelectionModal from "@/features/Modals/RegionSelectionModal/RegionSelectionModal";
import styles from "./HomePage.module.scss";
import { useModal } from "@/hooks/useModal"; 

const HomePage = () => {
  const navigate = useNavigate();
  const { isOpen: isRegionModalOpen, openModal: openRegionModal, closeModal: closeRegionModal } = useModal(); 

  return (
    <div className={styles.homePage}>
      <div className={styles.content}>
        <h1 className={styles.title}>Добро пожаловать в агрегатор такси!</h1>

        <img
          src="https://symbl-world.akamaized.net/i/webp/6c/b1eaa3c32e62dbb52c4deed3ee7b33.webp"
          alt="Машина"
          className={styles.image}
        />

        <div className={styles.roleSelection}>
          <h2 className={styles.roleTitle}>Выберите свою роль:</h2>
          <div className={styles.buttonsContainer}>
            {/* Кнопка пассажира */}
            <DynamicButton
              label="Пассажир"
              onClick={() => navigate("/passenger")}
              className={`${styles.button} ${styles.passengerButton}`}
            />

            {/* Кнопка водителя */}
            <DynamicButton
              label="Водитель"
              onClick={openRegionModal} // Открытие модального окна
              className={`${styles.button} ${styles.driverButton}`}
            />
          </div>
        </div>
      </div>

      {/* Модальное окно для выбора региона */}
      {isRegionModalOpen && (
        <RegionSelectionModal closeModalWindow={closeRegionModal} />
      )}
    </div>
  );
};

export default HomePage;
