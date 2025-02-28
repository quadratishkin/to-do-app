import { ReactNode } from "react";
import "./Modal.scss";

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
}

export const Modal = ({ isOpen, children }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="background">
      <div className="modal">
        <div>{children}</div>
      </div>
    </div>
  );
};
