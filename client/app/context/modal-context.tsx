import { IArticle } from "@/types";
import { createContext, useState } from "react";

type ModalContextType = {
  open: boolean;
  modalType: string;
  setModalType: (t: string) => void;
  setOpen: (t: boolean) => void;
  handleOpen: () => void;
  handleClose: () => void;
  inputs: {
    id: string;
    values: {
      title: string;
      description: string;
    };
  };
  setInputs: (data: { id: string; values: Partial<IArticle> }) => void;
};

export const ModalContext = createContext({} as unknown as ModalContextType);

type Props = {
  children: React.ReactNode;
};

export const ModalContextProvider = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [inputs, setInputs] = useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const values = {
    open,
    setOpen,
    handleOpen,
    handleClose,
    modalType,
    setModalType,
    inputs,
    setInputs,
  } as unknown as ModalContextType;
  return (
    <ModalContext.Provider value={values}>{children}</ModalContext.Provider>
  );
};
