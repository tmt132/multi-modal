import { useModal, ModalContainer, ModalProvider } from "multi-modal";

function AppContent() {
  const { openModal } = useModal();

  const handleOpenTextModal = () => {
    openModal({
      title: "📄 텍스트 콘텐츠",
      content: (
        <div style={{ padding: "10px", lineHeight: "1.6" }}>
          이 모달은 단순한 텍스트 정보를 보여줍니다.
          <br />
          리액트 모달 시스템은 다양한 콘텐츠를 유연하게 지원할 수 있어요.
        </div>
      ),
      showCloseButton: true,
    });
  };

  const handleOpenImageModal = () => {
    openModal({
      title: "🖼️ 이미지 콘텐츠",
      content: (
        <div style={{ textAlign: "center" }}>
          <img
            src="https://via.placeholder.com/300x200"
            alt="placeholder"
            style={{ maxWidth: "100%", borderRadius: "8px" }}
          />
        </div>
      ),
      showCloseButton: true,
    });
  };

  const handleOpenVideoModal = () => {
    openModal({
      title: "🎬 비디오 콘텐츠",
      content: (
        <div
          style={{
            position: "relative",
            height: "0",
            overflow: "hidden",
            display: "flex",
            flex: 1,
            paddingBottom: "56.25%",
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube Video"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              objectFit: "contain",
              width: "100%",
              height: "100%",
              borderRadius: "8px",
            }}
          />
        </div>
      ),
      showCloseButton: true,
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <h3>🎉 다양한 콘텐츠 모달 예제</h3>
      <button onClick={handleOpenTextModal}>텍스트 모달 열기</button>
      <button onClick={handleOpenImageModal}>이미지 모달 열기</button>
      <button onClick={handleOpenVideoModal}>비디오 모달 열기</button>
      <div
        style={{ margin: "20px", border: "1px solid black", height: "500px" }}
      >
        <ModalContainer />
      </div>
    </div>
  );
}

function App() {
  return (
    <ModalProvider>
      <AppContent />
    </ModalProvider>
  );
}

export default App;
