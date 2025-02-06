import React from "react";
import styles from "@/components/CustomSelect/CustomSelect.module.scss";
import { CustomSelectProps } from "@/models/CustomSelectProps";

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  value,
  onChange,
  gap = "0px",
}) => {
  return (
    <div className={styles.itemsPerPageSelector} style={{ gap }}>
      <label>{label}</label>
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
