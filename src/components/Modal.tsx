import { ReactNode } from "react";
import styles from "../styles/Modal.module.css";

interface ModalProps {
  id: string;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({ id, title, children, onClose }: ModalProps) => {
  return (
    <div className={styles.modal} id={id}>
      <div className={styles["modal-header"]}>
        <span>{title}</span>
        <button onClick={onClose}>X</button>
      </div>
      <div className={styles["modal-content"]}>{children}</div>
    </div>
  );
};
