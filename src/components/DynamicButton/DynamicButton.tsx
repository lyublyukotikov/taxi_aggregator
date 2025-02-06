import React from "react";
import { DynamicButtonProps } from "@/models/DynamicButtonProps";

const DynamicButton: React.FC<DynamicButtonProps> = ({
  label,
  onClick,
  className,
  type = "button",
}) => {
  return (
    <button onClick={onClick} className={className} type={type}>
      {label}
    </button>
  );
};

export default DynamicButton;
