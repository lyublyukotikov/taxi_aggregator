import { useMemo } from "react";
import { Trip } from "@/models/Trip";

const useUniqueTariffs = (trips: Trip[]) => {
  return useMemo(() => {
    return Array.from(new Set(trips.map((trip) => trip.tariff)));
  }, [trips]);
};

export default useUniqueTariffs;
