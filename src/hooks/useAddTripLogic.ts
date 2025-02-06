import { useState } from "react";
import { useAddTripMutation } from "@/services/api";
import { TripCreate } from "@/models/Trip";

const useAddTripLogic = () => {
  const [addTrip, { isLoading, error }] = useAddTripMutation();
  const [addTripError, setAddTripError] = useState<string | null>(null);

  const handleAddTrip = async (values: TripCreate) => {
    try {
      setAddTripError(null);
      await addTrip({
        from: values.from,
        to: values.to,
        tariff: values.tariff,
        region: values.region,
      }).unwrap();
    } catch (error) {
      setAddTripError("Ошибка при добавлении поездки");
    }
  };
  useAddTripLogic
  return {
    handleAddTrip,
    isLoading,
    error: addTripError,
  };
};

export default useAddTripLogic;
