import { useModalContext } from "../context/ModalContext";
import { Modal } from "./Modal";

export const ModalContainer = () => {
  const { modals, closeModal } = useModalContext();

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {modals.map(({ id, options }) => (
        <Modal
          key={id}
          id={id}
          title={options.title}
          onClose={() => closeModal(id)}
          showCloseButton={options.showCloseButton}
        >
          {options.content}
        </Modal>
      ))}
    </div>
  );
};
