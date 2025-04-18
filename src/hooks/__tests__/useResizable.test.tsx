// src/hooks/__tests__/useResizable.test.tsx
import { render, fireEvent } from "@testing-library/react";
import { useRef } from "react";
import { useResizable } from "../useResizable";

function TestComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const { size, handleResizeMouseDown } = useResizable(ref, {
    width: 200,
    height: 150,
  });

  return (
    <div
      data-testid="parent"
      style={{
        width: 400,
        height: 400,
        position: "relative",
      }}
    >
      <div
        ref={ref}
        data-testid="resizable"
        onMouseDown={handleResizeMouseDown}
        style={{
          width: size.width,
          height: size.height,
          backgroundColor: "lightgray",
          position: "absolute",
        }}
      />
      <div data-testid="size">
        {size.width},{size.height}
      </div>
    </div>
  );
}

describe("useResizable", () => {
  beforeEach(() => {
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
      function (this: HTMLElement) {
        const el = this as HTMLElement;
        if (el.dataset.testid === "resizable") {
          return {
            width: 200,
            height: 150,
            top: 0,
            left: 0,
            right: 200,
            bottom: 150,
          } as DOMRect;
        }
        if (el.dataset.testid === "parent") {
          return {
            width: 400,
            height: 400,
            top: 0,
            left: 0,
            right: 400,
            bottom: 400,
          } as DOMRect;
        }
        return { width: 0, height: 0 } as DOMRect;
      }
    );

    vi.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockReturnValue(200);
    vi.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockReturnValue(150);
  });

  it("updates size on resize", () => {
    const { getByTestId } = render(<TestComponent />);
    const resizable = getByTestId("resizable");

    fireEvent.mouseDown(resizable, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(window, { clientX: 50, clientY: 30 });
    fireEvent.mouseUp(window);

    const sizeText = getByTestId("size").textContent;
    expect(sizeText).toBe("250,180"); // 200+50, 150+30
  });

  it("does not shrink below min size", () => {
    const { getByTestId } = render(<TestComponent />);
    const resizable = getByTestId("resizable");

    fireEvent.mouseDown(resizable, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(window, { clientX: -1000, clientY: -1000 });
    fireEvent.mouseUp(window);

    const sizeText = getByTestId("size").textContent;
    expect(sizeText).toBe("200,150"); // min size
  });

  it("does not exceed parent bounds", () => {
    const { getByTestId } = render(<TestComponent />);
    const resizable = getByTestId("resizable");

    fireEvent.mouseDown(resizable, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(window, { clientX: 1000, clientY: 1000 });
    fireEvent.mouseUp(window);

    const sizeText = getByTestId("size").textContent;
    expect(sizeText).toBe("400,400"); // parent boundary
  });
});
