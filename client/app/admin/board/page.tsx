'use client';
import { AddArticleForm } from '@/app/components/AddArticleForm';
import { ArticleBoard } from '@/app/components/ArticleBoard';
import { Header } from '@/app/components/Header';
import { ArticlesContextProvider } from '@/app/context/article-context';
import Modal from '@mui/material/Modal';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminBoard() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogOut = () => {
    localStorage.removeItem('accessToken');
    router.push('/');
  };

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      redirect('/');
    }
  }, []);

  return (
    <div>
      <Header>
        <div className={'flex w-full justify-between'}>
          <Link href={'/'} className={'font-bold text-white'}>
            Article Manager
          </Link>
          <h2 className={'text-white font-extrabold '}>
            Welcome to Admin article board
          </h2>
          <button
            onClick={handleLogOut}
            className={'text-white hover:text-blue-600'}
          >
            Log out
          </button>
        </div>
      </Header>
      <ArticlesContextProvider>
        <ArticleBoard />
        <div onClick={handleOpen} 
       className={'bg-blue-700 hover:bg-blue-500 w-12 h-12 rounded-full flex justify-center items-center hover:cursor-pointer absolute right-10 bottom-10'}>
            <p className={'font-bold text-white'}>+</p></div>
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
      </ArticlesContextProvider>
    </div>
  );
}
