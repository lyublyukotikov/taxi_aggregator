//хук для обработки состояния загрузки и ошибок
import { useEffect } from "react";

export const useLoadingErrorHandler = (
  isLoading: boolean,
  error: boolean,
  onError?: () => void
) => {
  useEffect(() => {
    if (error && onError) {
      onError();
    }
  }, [error, onError]);

  return { isLoading, error };
};
