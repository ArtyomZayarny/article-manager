'use client';
import { ArticleBoard } from '@/app/components/ArticleBoard';
import {
  ArticlesContext,
  ArticlesContextProvider,
} from '@/app/context/article-context';
import { useContext } from 'react';

export default function AdminBoard() {
  const { loading, articles } = useContext(ArticlesContext);

  return (
    <div>
      <h2>Admin article board!</h2>
      {loading && <h1>Loading</h1>}
      <ArticlesContextProvider>
        <ArticleBoard />
      </ArticlesContextProvider>
    </div>
  );
}
