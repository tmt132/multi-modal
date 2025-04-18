import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import { ModalProvider } from "multi-modal"; // 컨텍스트 포함

describe("App Example", () => {
  function renderWithModalProvider() {
    return render(
      <ModalProvider>
        <App />
      </ModalProvider>
    );
  }

  it("opens modal with correct content when button is clicked", () => {
    renderWithModalProvider();

    const button = screen.getByText("Open Modal");
    fireEvent.click(button);

    expect(screen.getByText("Hello World")).toBeInTheDocument();
    expect(screen.getByText("This is a modal")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "X" })).toBeInTheDocument();
  });

  it("closes modal when close button is clicked", () => {
    renderWithModalProvider();

    fireEvent.click(screen.getByText("Open Modal"));

    const closeButton = screen.getByRole("button", { name: "X" });
    fireEvent.click(closeButton);

    expect(screen.queryByText("Hello World")).not.toBeInTheDocument();
    expect(screen.queryByText("This is a modal")).not.toBeInTheDocument();
  });
});
