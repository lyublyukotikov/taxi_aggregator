import React from "react";
import styles from "./ TripCard.module.scss";
import { TripCardProps } from "@/models/TripCardProps";

const TripCard: React.FC<TripCardProps> = ({ trip}) => {
  return (
    <div className={styles.tripCard}>
      <div className={styles.tripDetails}>
        <h3>{trip.region}</h3>
        <div className={styles.tripInfo}>
          <p><strong>Откуда:</strong> {trip.from}</p>
          <p><strong>Куда:</strong> {trip.to}</p>
          <p><strong>Тариф:</strong> {trip.tariff}</p>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
