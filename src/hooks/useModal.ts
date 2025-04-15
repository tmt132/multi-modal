import { useModalContext } from "../context/ModalContext";
import { ModalOptions } from "../types/ModalTypes";

export const useModal = () => {
  const { openModal, closeModal } = useModalContext();

  return {
    openModal: (modal: ModalOptions) => openModal(modal),
    closeModal: (id: string) => closeModal(id),
  };
};
