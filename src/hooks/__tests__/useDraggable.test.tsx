import { render, fireEvent, waitFor } from "@testing-library/react";
import { useRef } from "react";
import { useDraggable } from "../useDraggable";

function TestComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const { position, handleDragMouseDown } = useDraggable(ref);

  return (
    <div
      data-testid="parent"
      style={{ width: 300, height: 300, position: "relative" }}
    >
      <div
        ref={ref}
        data-testid="draggable"
        onMouseDown={handleDragMouseDown}
        style={{
          width: 100,
          height: 100,
          position: "absolute",
          top: position.top,
          left: position.left,
          backgroundColor: "blue",
        }}
      />
      <div data-testid="position">
        {position.top},{position.left}
      </div>
    </div>
  );
}

describe("useDraggable", () => {
  let draggable: HTMLElement;

  beforeEach(() => {
    // 모달, 부모의 위치/크기를 mocking
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
      function (this: HTMLElement) {
        if (this.dataset.testid === "draggable") {
          return new DOMRect(0, 0, 100, 100); // 드래그 가능한 영역
        } else if (this.dataset.testid === "parent") {
          return new DOMRect(0, 0, 300, 300); // 드래그 가능한 영역
        }
        return new DOMRect(0, 0, 0, 0); // 기본값
      }
    );
  });

  it("updates position on drag", async () => {
    const { getByTestId } = render(<TestComponent />);
    draggable = getByTestId("draggable");

    // 드래그 시작
    fireEvent.mouseDown(draggable, { clientX: 0, clientY: 0 });

    // 드래그 중
    fireEvent.mouseMove(window, { clientX: 50, clientY: 60 });
    fireEvent.mouseUp(window);

    // 위치가 바뀔 때까지 기다림
    await waitFor(() => {
      const positionText = getByTestId("position").textContent;
      expect(positionText).toBe("60,50"); // top, left
    });
  });

  it("does not move outside parent bounds", async () => {
    const { getByTestId } = render(<TestComponent />);
    draggable = getByTestId("draggable");

    fireEvent.mouseDown(draggable, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(window, { clientX: 9999, clientY: 9999 }); // 큰 값 줘보기
    fireEvent.mouseUp(window);

    // 위치가 부모 경계를 넘지 않도록 기다림
    await waitFor(() => {
      const positionText = getByTestId("position").textContent;
      expect(positionText).toBe("200,200"); // 300-100=200으로 클램핑됨
    });
  });
});
