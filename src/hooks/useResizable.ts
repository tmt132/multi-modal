import { useRef, useEffect, useState } from "react";

export function useResizable(
  elementRef: React.RefObject<HTMLDivElement | null>,
  minSize: { width: number; height: number } = { width: 200, height: 150 }
) {
  const [size, setSize] = useState(minSize);
  const isResizing = useRef(false);
  const resizeStart = useRef({
    x: 0,
    y: 0,
    width: minSize.width,
    height: minSize.height,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isResizing.current || !elementRef.current) return;

      const deltaX = event.pageX - resizeStart.current.x;
      const deltaY = event.pageY - resizeStart.current.y;

      const modal = elementRef.current;
      const parent = modal.parentElement;

      if (!parent) return;

      const modalRect = modal.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();

      const maxWidth = parentRect.right - modalRect.left;
      const maxHeight = parentRect.bottom - modalRect.top;

      const newWidth = Math.min(maxWidth, resizeStart.current.width + deltaX);
      const newHeight = Math.min(
        maxHeight,
        resizeStart.current.height + deltaY
      );

      setSize({
        width: Math.max(newWidth, minSize.width),
        height: Math.max(newHeight, minSize.height),
      });
    };

    const handleMouseUp = () => {
      isResizing.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [elementRef, minSize]);

  const handleResizeMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (!elementRef.current) return;

    isResizing.current = true;
    resizeStart.current = {
      x: event.pageX,
      y: event.pageY,
      width: elementRef.current.offsetWidth,
      height: elementRef.current.offsetHeight,
    };
  };

  return { size, handleResizeMouseDown };
}
