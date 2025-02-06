import { Trip } from "./Trip";
export interface UseFilteredTripsProps {
  trips: Trip[];
  regionName: string;
  selectedTariff: string;
}