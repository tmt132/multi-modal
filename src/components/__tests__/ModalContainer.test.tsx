import { render } from "@testing-library/react";
import { ModalProvider } from "../../context/ModalContext";
import { ModalContainer } from "../ModalContainer";

describe("ModalContainer", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <ModalProvider>
        <ModalContainer />
      </ModalProvider>
    );
    expect(container).toBeDefined();
  });
});
