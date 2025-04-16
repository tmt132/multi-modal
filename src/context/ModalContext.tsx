import { createContext, useContext, useState, ReactNode } from "react";
import { ModalOptions } from "../types/ModalTypes";
import { v4 as uuid } from "uuid";

interface ModalItem {
  id: string;
  options: ModalOptions;
  zIndex: number;
}

interface ModalContextProps {
  modals: ModalItem[];
  openModal: (modal: ModalOptions) => string;
  closeModal: (id: string) => void;
  bringToFront: (id: string) => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<ModalItem[]>([]);
  const [zIndexCounter, setZIndexCounter] = useState(1000);

  const openModal = (modal: ModalOptions) => {
    const id = uuid();
    setZIndexCounter((prev) => prev + 1);

    const newModal = { id, options: modal, zIndex: zIndexCounter };
    setModals((prevModals) => [...prevModals, newModal]);

    return id;
  };

  const closeModal = (id: string) => {
    setModals((prevModals) => prevModals.filter((modal) => modal.id !== id));
  };

  const bringToFront = (id: string) => {
    setZIndexCounter((prev) => prev + 1);

    setModals((prevModals) => {
      const modalToBringToFront = prevModals.find((modal) => modal.id === id);
      if (!modalToBringToFront) return prevModals;

      const updatedModals = prevModals.filter((modal) => modal.id !== id);
      return [
        ...updatedModals,
        { ...modalToBringToFront, zIndex: zIndexCounter },
      ];
    });
  };

  return (
    <ModalContext.Provider
      value={{
        modals,
        openModal,
        closeModal,
        bringToFront,
      }}
    >
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
