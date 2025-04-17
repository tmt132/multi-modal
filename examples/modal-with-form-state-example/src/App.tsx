import { useState, ReactNode } from "react";
import { ModalProvider, ModalContainer, useModal } from "multi-modal";
import { SettingsModal } from "./SettingsModal";

const AppContent = () => {
  const { openModal } = useModal();
  const [settingsComponent, setSettingsComponent] = useState<ReactNode | null>(
    null
  );

  const openSettings = () => {
    const content = (
      <SettingsModal onClose={() => setSettingsComponent(null)} />
    );
    setSettingsComponent(content);
    openModal({
      title: "설정",
      content: settingsComponent,
    });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Modal 상태 동기화 예제</h1>
      <button onClick={openSettings}>설정 열기</button>
      <div
        style={{ margin: "20px", border: "1px solid black", height: "500px" }}
      >
        <ModalContainer />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ModalProvider>
      <AppContent />
    </ModalProvider>
  );
};

export default App;
