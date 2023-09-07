'use client';
import { IArticle } from '@/types';
import { createContext, useCallback } from 'react';
import { useArticles } from '../hooks/useArticles';

type ArticleContextType = {
  articles: IArticle[] | [];
  loading: boolean;
  deleteArticle: (id: string) => void;
  addArticle: (article: IArticle) => void;
};

export const ArticlesContext = createContext(
  {} as unknown as ArticleContextType
);

type Props = {
  children: React.ReactNode;
};

export const ArticlesContextProvider = ({ children }: Props) => {
  //Manage articles from DB
  const { articles, loading, setArticles } = useArticles();

  const deleteArticle = useCallback(
    (id: string) => {
      const updatedArticles = articles.filter(
        (article: IArticle) => article.id !== id
      );
      setArticles(updatedArticles);
    },
    [articles, setArticles]
  );

  const addArticle = useCallback(
    (article: IArticle) => {
      setArticles<IArticle[]>((prevArticles) => [...prevArticles, article]);
    },
    [setArticles]
  );

  const value = {
    articles,
    loading,
    deleteArticle,
    addArticle,
  } as unknown as ArticleContextType;

  return (
    <ArticlesContext.Provider value={value}>
      {children}
    </ArticlesContext.Provider>
  );
};
