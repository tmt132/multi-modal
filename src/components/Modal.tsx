import { ReactNode } from "react";
import "./Modal.css";

interface ModalProps {
  id: string;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({ id, title, children, onClose }: ModalProps) => {
  return (
    <div className="modal" id={id}>
      <div className="modal-header">
        <span>{title}</span>
        <button onClick={onClose}>X</button>
      </div>
      <div className="modal-content">{children}</div>
    </div>
  );
};
