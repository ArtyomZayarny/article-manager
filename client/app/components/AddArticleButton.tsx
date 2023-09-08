import { useContext } from 'react';
import { ModalContext } from '../context/modal-context';

export const AddArticleButton = () => {
  const { handleOpen } = useContext(ModalContext);
  return (
    <div
      onClick={handleOpen}
      className={
        'bg-blue-700 hover:bg-blue-500 w-12 h-12 rounded-full flex justify-center items-center hover:cursor-pointer absolute right-10 bottom-10'
      }
    >
      <p className={'font-bold text-white'}>+</p>
    </div>
  );
};
