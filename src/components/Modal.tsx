import { useRef, useState, useEffect, ReactNode } from "react";
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
  const [position, setPosition] = useState({ top: 100, left: 100 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging.current && modalRef.current) {
        const deltaX = event.clientX - dragStart.current.x;
        const deltaY = event.clientY - dragStart.current.y;
        setPosition((prev) => ({
          top: prev.top + deltaY,
          left: prev.left + deltaX,
        }));
        dragStart.current = { x: event.clientX, y: event.clientY };
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  const handleMouseDown = (event: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = { x: event.clientX, y: event.clientY };
  };

  return (
    <div
      ref={modalRef}
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
