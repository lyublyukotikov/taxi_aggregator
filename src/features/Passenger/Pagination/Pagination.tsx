import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";
import { PaginationProps } from "@/models/PaginationProps";

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  onPageChange,
  currentPage,
}) => {
  return (
    <ReactPaginate
      previousLabel={"←"}
      nextLabel={"→"}
      breakLabel={"..."}
      pageCount={pageCount}
      onPageChange={onPageChange}
      containerClassName={styles.pagination}
      activeClassName={styles.active}
      forcePage={currentPage}
    />
  );
};

export default Pagination;
