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
  }, []);

  const handleMouseDown = (event: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = { x: event.clientX, y: event.clientY };
  };

  return { ref: elementRef, position, handleMouseDown };
}
