import { Modal } from '@mui/material';
import { useContext } from 'react';
import { ModalContext } from '../context/modal-context';
import { AddArticleForm } from './AddArticleForm';

export const AddArticleModal = () => {
  const { open, handleClose } = useContext(ModalContext);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AddArticleForm handleClose={handleClose} />
    </Modal>
  );
};
