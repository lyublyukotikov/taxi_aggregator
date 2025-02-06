import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TripList from "@/features/Driver/TripList/TripList";
import { useGetTripsQuery } from "@/services/api";
import Spinner from "@/components/Spinner/Spinner";
import ErrorDisplay from "@/components/ErrorDisplay/ErrorDisplay";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import useFilteredTrips from "@/hooks/useFilteredTrips";
import useUniqueTariffs from "@/hooks/useUniqueTariffs";
import styles from "./TripsPage.module.scss";

const TripsPage: React.FC = () => {
  const { regionName } = useParams<{ regionName: string }>();
  const decodedRegionName = decodeURIComponent(regionName || "");

  const { data: trips = [], isLoading, error } = useGetTripsQuery();
  const [selectedTariff, setSelectedTariff] = useState<string>("");

  const filteredTrips = useFilteredTrips({
    trips,
    regionName: decodedRegionName,
    selectedTariff,
  });

  const uniqueTariffs = useUniqueTariffs(trips);

  const handleTariffChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTariff(event.target.value);
  };

  if (isLoading) return <Spinner />;

  if (error) return <ErrorDisplay message="Ошибка загрузки данных" />;

  if (filteredTrips.length === 0)
    return <ErrorDisplay message={`Поездки из региона ${decodedRegionName} не найдены!`} />;

  return (
    <div className={styles.tripsPage}>
      <h2>Поездки из региона: {decodedRegionName}</h2>

      <div className={styles.filter}>
        <CustomSelect
          label="Выберите тариф"
          options={[
            { value: "", label: "Все тарифы" },
            ...uniqueTariffs.map((tariff) => ({
              value: tariff,
              label: tariff,
            })),
          ]}
          value={selectedTariff}
          onChange={handleTariffChange}
          gap="10px"
        />
      </div>

      <TripList trips={filteredTrips} />
    </div>
  );
};

export default TripsPage;
