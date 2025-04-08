import { useModalContext } from "../context/ModalContext";
import { Modal } from "./Modal";

export const ModalContainer = () => {
  const { modals, closeModal } = useModalContext();

  return (
    <>
      {modals.map((modal) => (
        <Modal
          key={modal.id}
          id={modal.id}
          title={modal.title}
          onClose={() => closeModal(modal.id)}
        >
          {modal.content}
        </Modal>
      ))}
    </>
  );
};
