import { useModal, ModalContainer } from "multi-modal";

function App() {
  const { openModal } = useModal();

  return (
    <div>
      <h1>Example For Dynamic Modals</h1>
      <button
        onClick={() => {
          openModal({
            title: "Hello World",
            content: "This is a modal",
            showCloseButton: true,
          });
        }}
      >
        Open Modal
      </button>
      <div
        style={{ margin: "20px", border: "1px solid black", height: "500px" }}
      >
        <ModalContainer />
      </div>
    </div>
  );
}

export default App;
