import { useRef, useState, useEffect } from "react";

export function useDraggable(
  elementRef: React.RefObject<HTMLDivElement | null>
) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!elementRef.current) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging.current && elementRef.current) {
        const deltaX = event.clientX - dragStart.current.x;
        const deltaY = event.clientY - dragStart.current.y;

        const modalRect = elementRef.current.getBoundingClientRect();
        const parentRect =
          elementRef.current.parentElement?.getBoundingClientRect() || {
            width: window.innerWidth,
            height: window.innerHeight,
          };

        const newLeft = position.left + deltaX;
        const newTop = position.top + deltaY;

        const maxLeft = parentRect.width - modalRect.width;
        const maxTop = parentRect.height - modalRect.height;

        const clampedLeft = Math.max(0, Math.min(newLeft, maxLeft));
        const clampedTop = Math.max(0, Math.min(newTop, maxTop));

        setPosition({
          top: clampedTop,
          left: clampedLeft,
        });

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

  const handleDragMouseDown = (event: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = { x: event.clientX, y: event.clientY };
  };

  return { position, handleDragMouseDown };
}
