import { render, fireEvent } from "@testing-library/react";
import { Modal } from "../Modal";
import { ModalProvider } from "../../context/ModalContext";

describe("Modal", () => {
  it("renders with title and content", () => {
    const { getByText } = render(
      <ModalProvider>
        <Modal id="test-modal" title="Test Title" onClose={() => {}}>
          <p>Test content</p>
        </Modal>
      </ModalProvider>
    );

    expect(getByText("Test Title")).toBeInTheDocument();
    expect(getByText("Test content")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = vi.fn();
    const { getByText } = render(
      <ModalProvider>
        <Modal id="test-modal" title="Test Title" onClose={onClose}>
          <p>Test content</p>
        </Modal>
      </ModalProvider>
    );

    fireEvent.click(getByText("X"));
    expect(onClose).toHaveBeenCalled();
  });

  it("does not show close button when showCloseButton is false", () => {
    const { queryByText } = render(
      <ModalProvider>
        <Modal
          id="test-modal"
          title="Test Title"
          onClose={() => {}}
          showCloseButton={false}
        >
          <p>Test content</p>
        </Modal>
      </ModalProvider>
    );

    expect(queryByText("X")).toBeNull();
  });
});
