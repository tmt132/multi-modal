import { useModal, ModalContainer } from "multi-modal";
import { v4 as uuid } from "uuid";

function App() {
  const { openModal } = useModal();

  return (
    <div>
      <h1>Example 1</h1>
      <button
        onClick={() => {
          const id = uuid();

          openModal({
            id: id,
            title: "Hello World",
            content: "This is a modal",
            closable: false,
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
