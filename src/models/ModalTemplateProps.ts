import { ReactNode, RefObject } from "react";

export default interface DrawerAddProps {
  drawerRef: RefObject<HTMLDivElement>;
  closeModalWindow: () => void;
  children: ReactNode;
}
