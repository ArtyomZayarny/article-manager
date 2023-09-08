'use client';
import { AddArticleButton } from '@/app/components/AddArticleButton';
import { AddArticleModal } from '@/app/components/AddArticleModal';
import { ArticleBoard } from '@/app/components/ArticleBoard';
import { Header } from '@/app/components/Header';
import { ArticlesContextProvider } from '@/app/context/article-context';
import {
  ModalContext,
  ModalContextProvider,
} from '@/app/context/modal-context';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

export default function AdminBoard() {
  const router = useRouter();
  const { open, handleOpen, handleClose } = useContext(ModalContext);

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
      <ModalContextProvider>
        <ArticlesContextProvider>
          <ArticleBoard />
          <AddArticleButton />
          <AddArticleModal />
        </ArticlesContextProvider>
      </ModalContextProvider>
    </div>
  );
}
