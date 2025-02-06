import { useState, useMemo, useCallback } from "react";
import { UsePaginationProps } from "@/models/UsePaginationProps ";

export const usePagination = ({
  trips,
  initialItemsPerPage,
}: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  // Вычисление количества страниц
  const pageCount = useMemo(
    () => Math.ceil(trips.length / itemsPerPage),
    [trips, itemsPerPage]
  );

  // Сегментируем поездки для отображения на текущей странице
  const displayedTrips = useMemo(
    () =>
      trips.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage),
    [trips, currentPage, itemsPerPage]
  );

  // Обработчик изменения количества элементов на странице
  const handleItemsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setItemsPerPage(Number(e.target.value));
      setCurrentPage(0); // сбрасываем на первую страницу
    },
    []
  );

  // Обработчик переключения страниц
  const handlePageClick = useCallback((selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  }, []);

  return {
    currentPage,
    pageCount,
    displayedTrips,
    itemsPerPage,
    handleItemsPerPageChange,
    handlePageClick,
  };
};
