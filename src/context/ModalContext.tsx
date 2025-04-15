import { createContext, useContext, useState, ReactNode } from "react";
import { ModalOptions } from "../types/ModalTypes";

interface ModalContextProps {
  modals: ModalOptions[];
  openModal: (modal: ModalOptions) => void;
  closeModal: (id: string) => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<ModalOptions[]>([]);

  const openModal = (modal: ModalOptions) => {
    setModals((prevModals) => [...prevModals, modal]);
  };

  const closeModal = (id: string) => {
    setModals((prevModals) => prevModals.filter((modal) => modal.id !== id));
  };

  return (
    <ModalContext.Provider value={{ modals, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};
