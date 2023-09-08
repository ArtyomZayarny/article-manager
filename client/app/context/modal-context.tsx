import { createContext, useState } from 'react';

type ModalContextType = {
  open: boolean;
  setOpen: (t: boolean) => void;
  handleOpen: () => void;
  handleClose: () => void;
};

export const ModalContext = createContext({} as unknown as ModalContextType);

type Props = {
  children: React.ReactNode;
};

export const ModalContextProvider = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const values = {
    open,
    setOpen,
    handleOpen,
    handleClose,
  } as unknown as ModalContextType;
  return (
    <ModalContext.Provider value={values}>{children}</ModalContext.Provider>
  );
};
