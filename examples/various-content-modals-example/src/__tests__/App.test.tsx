import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

// 모달 오픈 후 공통으로 닫기 버튼이 있는지 검사
const expectModalWithTitle = (title: string) => {
  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "X" })).toBeInTheDocument();
};

describe("App Modal Content Test", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("텍스트 모달이 열리고 내용이 보인다", () => {
    fireEvent.click(screen.getByText("텍스트 모달 열기"));

    expectModalWithTitle("📄 텍스트 콘텐츠");

    expect(
      screen.getByText(/이 모달은 단순한 텍스트 정보를 보여줍니다./)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /multi-modal은 다양한 콘텐츠를 유연하게 지원할 수 있어요./
      )
    ).toBeInTheDocument();
  });

  it("이미지 모달이 열리고 이미지 요소가 렌더링된다", () => {
    fireEvent.click(screen.getByText("이미지 모달 열기"));

    expectModalWithTitle("🖼️ 이미지 콘텐츠");

    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("example.jpg")
    );
  });

  it("비디오 모달이 열리고 iframe이 렌더링된다", () => {
    fireEvent.click(screen.getByText("비디오 모달 열기"));

    expectModalWithTitle("🎬 비디오 콘텐츠");

    const iframe = screen.getByTitle("YouTube Video");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      "src",
      expect.stringContaining("youtube.com/embed")
    );
  });
});
