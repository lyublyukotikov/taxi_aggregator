import { useMemo } from "react";
import { UseFilteredTripsProps } from "@/models/UseFilteredTripsProps";

const useFilteredTrips = ({
  trips,
  regionName,
  selectedTariff,
}: UseFilteredTripsProps) => {
  return useMemo(() => {
    if (!trips.length) return [];

    // Фильтрация по региону и тарифу
    return trips.filter((trip) => {
      const isRegionMatch =
        trip.region.toLowerCase() === regionName.toLowerCase();
      const isTariffMatch = selectedTariff
        ? trip.tariff === selectedTariff
        : true;
      return isRegionMatch && isTariffMatch;
    });
  }, [trips, regionName, selectedTariff]);
};

export default useFilteredTrips;
