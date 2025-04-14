import { ReactNode, useRef } from "react";
import { useDraggable } from "../hooks/useDraggable";
import { useResizable } from "../hooks/useResizable";
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
  const modalRef = useRef<HTMLDivElement>(null);

  const { position, handleDragMouseDown } = useDraggable(modalRef);
  const { size, handleResizeMouseDown } = useResizable(modalRef);

  return (
    <div
      ref={modalRef}
      className={styles.modal}
      id={id}
      style={{
        top: position.top,
        left: position.left,
        width: size.width,
        height: size.height,
      }}
    >
      <div className={styles["modal-header"]} onMouseDown={handleDragMouseDown}>
        <span>{title}</span>
        {showCloseButton && <button onClick={onClose}>X</button>}
      </div>
      <div className={styles["modal-content"]}>{children}</div>
      <div
        className={styles["resize-handle"]}
        onMouseDown={handleResizeMouseDown}
      />
    </div>
  );
};
