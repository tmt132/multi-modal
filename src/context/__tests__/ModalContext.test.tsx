import { renderHook, act } from "@testing-library/react";
import { ModalProvider, useModalContext } from "../ModalContext";
import { ReactNode } from "react";

const wrapper = ({ children }: { children: ReactNode }) => (
  <ModalProvider>{children}</ModalProvider>
);

describe("ModalContext", () => {
  it("should open and close modals correctly", () => {
    const { result } = renderHook(() => useModalContext(), { wrapper });

    const modalOptions = { title: "Test Modal", content: <div>Content</div> };

    let id = "";
    act(() => {
      id = result.current.openModal(modalOptions);
    });

    expect(result.current.modals.length).toBe(1);
    expect(result.current.modals[0].id).toBe(id);

    act(() => {
      result.current.closeModal(id);
    });

    expect(result.current.modals.length).toBe(0);
  });
});
