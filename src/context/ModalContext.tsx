import { createContext, useContext, useState, ReactNode } from "react";
import { ModalOptions } from "../types/ModalTypes";
import { v4 as uuid } from "uuid";

interface ModalItem {
  id: string;
  options: ModalOptions;
}

interface ModalContextProps {
  modals: ModalItem[];
  openModal: (modal: ModalOptions) => string;
  closeModal: (id: string) => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<ModalItem[]>([]);

  const openModal = (modal: ModalOptions) => {
    const id = uuid();
    const newModal = { id, options: modal };

    setModals((prevModals) => [...prevModals, newModal]);

    return id;
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
