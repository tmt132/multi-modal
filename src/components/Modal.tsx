import { ReactNode, useRef } from "react";
import { useDraggable } from "../hooks/useDraggable";
import { useResizable } from "../hooks/useResizable";
import styles from "../styles/Modal.module.css";
import { useModalContext } from "../context/ModalContext";

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

  const { modals, bringToFront } = useModalContext();

  const modal = modals.find((modal) => modal.id === id);
  const zIndex = modal ? modal.zIndex : 1000;

  const handleFocus = () => {
    bringToFront(id);
  };

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
        zIndex: zIndex,
      }}
      onMouseDown={handleFocus}
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
