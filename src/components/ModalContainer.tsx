import { useModalContext } from "../context/ModalContext";
import { Modal } from "./Modal";

export const ModalContainer = () => {
  const { modals, closeModal } = useModalContext();

  return (
    <>
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
    </>
  );
};
