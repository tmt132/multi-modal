import { useModal, ModalContainer } from "multi-modal";

function App() {
  const { openModal } = useModal();

  return (
    <div>
      <h1>Example 1</h1>
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
      <ModalContainer />
    </div>
  );
}

export default App;
