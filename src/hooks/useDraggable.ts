import { useRef, useState, useEffect } from "react";

export function useDraggable(initial = { top: 100, left: 100 }) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(initial);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging.current && elementRef.current) {
        const deltaX = event.clientX - dragStart.current.x;
        const deltaY = event.clientY - dragStart.current.y;

        const rect = elementRef.current.getBoundingClientRect();
        const newLeft = position.left + deltaX;
        const newTop = position.top + deltaY;

        const maxLeft = window.innerWidth - rect.width;
        const maxTop = window.innerHeight - rect.height;

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
  }, [position]);

  const handleMouseDown = (event: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = { x: event.clientX, y: event.clientY };
  };

  return { ref: elementRef, position, handleMouseDown };
}
