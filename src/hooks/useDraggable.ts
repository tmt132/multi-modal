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
      if (!isDragging.current || !elementRef.current) return;

      const deltaX = event.pageX - dragStart.current.x;
      const deltaY = event.pageY - dragStart.current.y;

      const modalRect = elementRef.current.getBoundingClientRect();
      const parentRect =
        elementRef.current.parentElement?.getBoundingClientRect() || {
          width: window.innerWidth,
          height: window.innerHeight,
        };

      setPosition((prev) => {
        const newLeft = prev.left + deltaX;
        const newTop = prev.top + deltaY;

        const maxLeft = parentRect.width - modalRect.width;
        const maxTop = parentRect.height - modalRect.height;

        return {
          top: Math.max(0, Math.min(newTop, maxTop)),
          left: Math.max(0, Math.min(newLeft, maxLeft)),
        };
      });

      dragStart.current = { x: event.pageX, y: event.pageY };
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
  }, [elementRef]);

  const handleMouseDown = (event: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = { x: event.pageX, y: event.pageY };
  };

  return { position, handleMouseDown };
}
