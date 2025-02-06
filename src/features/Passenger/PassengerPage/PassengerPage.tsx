import { useGetTripsQuery } from "@/services/api";
import AddTripForm from "@/features/Modals/AddTripForm/AddTripForm";
import Header from "@/features/Passenger/Header/Header";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import TripCard from "@/features/Passenger/TripCard /TripCard";
import Pagination from "@/features/Passenger/Pagination/Pagination";
import Spinner from "@/components/Spinner/Spinner";
import ErrorDisplay from "@/components/ErrorDisplay/ErrorDisplay";
import { usePagination } from "@/hooks/usePagination";
import { useModal } from "@/hooks/useModal";
import styles from "./PassengerPage.module.scss";

const PassengerPage: React.FC = () => {
  const { data: trips = [], error, isLoading } = useGetTripsQuery();

  const { isOpen: isAddTripModalOpen, openModal, closeModal } = useModal();

  const {
    currentPage,
    pageCount,
    displayedTrips,
    itemsPerPage,
    handleItemsPerPageChange,
    handlePageClick,
  } = usePagination({
    trips,
    initialItemsPerPage: 5,
  });

  if (isLoading) return <Spinner />;
  if (error) return <ErrorDisplay message="Ошибка при загрузке поездок." />;

  return (
    <div className={styles.passengerPage}>
      <Header onAddTripClick={openModal} />
      <CustomSelect
        label="Записей на странице"
        options={[
          { value: 5, label: "5" },
          { value: 10, label: "10" },
          { value: 20, label: "20" },
          { value: 50, label: "50" },
        ]}
        value={itemsPerPage}
        onChange={handleItemsPerPageChange}
        gap="10px" 
      />
      <div className={styles.tripList}>
        {displayedTrips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
      <div className={styles.paginationContainer}>
        <Pagination
          pageCount={pageCount}
          onPageChange={handlePageClick}
          currentPage={currentPage}
        />
      </div>
      {isAddTripModalOpen && <AddTripForm closeModalWindow={closeModal} />}
    </div>
  );
};

export default PassengerPage;
