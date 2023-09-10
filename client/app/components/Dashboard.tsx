'use client';
import { ArticlesContextProvider } from '../context/article-context';
import { ArticleBoard } from './ArticleBoard';

export const Dashboard = () => {
  return (
    <section className={'p-6'}>
      <ArticlesContextProvider>
        <ArticleBoard />
      </ArticlesContextProvider>
    </section>
  );
};
