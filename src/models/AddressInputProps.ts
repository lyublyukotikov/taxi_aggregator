import { FieldProps } from "formik";
export interface AddressInputProps extends FieldProps {
  id: string;
  name: string;
  placeholder: string;
  style?: React.CSSProperties;
  region:string;
  
}