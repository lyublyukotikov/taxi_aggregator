import React, { useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import useOutsideClick from "../../../hooks/useOutsideClick";
import ModalTemplate from "../ModalTemplate/ModalTemplate";
import { useGetRegionsQuery } from "../../../services/api";
import Spinner from "../../../components/Spinner/Spinner";
import ErrorDisplay from "../../../components/ErrorDisplay/ErrorDisplay"; 
import styles from "./RegionSelectionModal.module.scss";
import { RegionSelectionModalProps } from "../../../models/RegionSelectionModalProps";

const RegionSelectionModal: React.FC<RegionSelectionModalProps> = ({ closeModalWindow }) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  useOutsideClick(drawerRef, closeModalWindow);

  const { data: regions, error, isLoading } = useGetRegionsQuery();

  const handleCloseModal = useCallback(() => {
    closeModalWindow();
  }, [closeModalWindow]);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorDisplay message="Ошибка при загрузке регионов." />;

  return (
    <ModalTemplate closeModalWindow={closeModalWindow} drawerRef={drawerRef}>
      <div ref={drawerRef} className={styles.regionSelectionModal}>
        <h2>Выберите регион</h2>
        <ul>
          {regions?.map((region) => (
            <li key={region.id}>
              <Link
                to={`/driver/trips/${encodeURIComponent(region.name)}`}
                 onClick={handleCloseModal}
              >
                {region.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </ModalTemplate>
  );
};

export default RegionSelectionModal;
