export interface CustomSelectProps {
  label: string;
  options: { value: string | number; label: string }[];
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  gap?: string;
  id?: string; 
  style?: React.CSSProperties; 
}
