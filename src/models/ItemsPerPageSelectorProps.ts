export default interface ItemsPerPageSelectorProps {
  itemsPerPage: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}