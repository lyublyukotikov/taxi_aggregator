import React, { useState } from "react";
import styles from "./TripList.module.scss";
import { TripListProps } from "@/models/TripListProps";
import ActionModal from "@/components/ActionModal/ActionModal"; 

const TripList: React.FC<TripListProps> = ({ trips }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const handleAction = (id: number, action: string) => {
    setModalMessage(
      `Вы хотите выполнить действие: ${action} для поездки с ID: ${id}`
    );
     setIsModalOpen(true); 
  };

  return (
    <div className={styles.tripList}>
      {trips.map((trip) => (
        <div key={trip.id} className={styles.tripCard}>
          <div className={styles.tripDetails}>
            <div className={styles.tripInfo}>
              <p>
                <strong>Откуда:</strong> {trip.from}
              </p>
              <p>
                <strong>Куда:</strong> {trip.to}
              </p>
              <p>
                <strong>Тариф:</strong> {trip.tariff}
              </p>
            </div>
            <div className={styles.actionButtons}>
              <button onClick={() => handleAction(trip.id, "Начать поездку")}>
                Начать поездку
              </button>
              <button onClick={() => handleAction(trip.id, "Приехал на место")}>
                Приехал на место
              </button>
              <button
                onClick={() => handleAction(trip.id, "Завершить поездку")}
              >
                Завершить поездку
              </button>
            </div>
          </div>
        </div>
      ))}

      {isModalOpen && <ActionModal message={modalMessage} />}
    </div>
  );
};

export default TripList;
