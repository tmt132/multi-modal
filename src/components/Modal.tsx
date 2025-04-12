import { ReactNode } from "react";
import { useDraggable } from "../hooks/useDraggable";
import styles from "../styles/Modal.module.css";

interface ModalProps {
  id: string;
  title: string;
  children: ReactNode;
  onClose: () => void;
  showCloseButton?: boolean;
}

export const Modal = ({
  id,
  title,
  children,
  onClose,
  showCloseButton = true,
}: ModalProps) => {
  const { ref, position, handleMouseDown } = useDraggable();

  return (
    <div
      ref={ref}
      className={styles.modal}
      id={id}
      style={{ top: position.top, left: position.left }}
    >
      <div className={styles["modal-header"]} onMouseDown={handleMouseDown}>
        <span>{title}</span>
        {showCloseButton && <button onClick={onClose}>X</button>}
      </div>
      <div className={styles["modal-content"]}>{children}</div>
    </div>
  );
};
