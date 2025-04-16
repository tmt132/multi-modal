import { createContext, useContext, useState, ReactNode } from "react";

interface ModalFocusContextProps {
  focusedModalId?: string;
  setFocusedModalId: (id: string) => void;
}

const ModalFocusContext = createContext<ModalFocusContextProps | undefined>(
  undefined
);

export const ModalFocusProvider = ({ children }: { children: ReactNode }) => {
  const [focusedModalId, setFocusedModalId] = useState<string | undefined>(
    undefined
  );

  return (
    <ModalFocusContext.Provider value={{ focusedModalId, setFocusedModalId }}>
      {children}
    </ModalFocusContext.Provider>
  );
};

export const useModalFocusContext = () => {
  const context = useContext(ModalFocusContext);
  if (!context) {
    throw new Error(
      "useModalFocusContext must be used within a ModalFocusProvider"
    );
  }
  return context;
};
