'use client';
import { IArticle } from '@/types';
import { createContext, useCallback } from 'react';
import { useArticles } from '../hooks/useArticles';

type ArticleContextType = {
  articles: IArticle[] | [];
  loading: boolean;
  deleteArticle: (id: string) => void;
  addArticle: (article: IArticle) => void;
  updateArticle: (id: string, data: IArticle) => void;
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

  const updateArticle = useCallback(
    (id, data) => {
      const updatedArticles = articles.map((article) => {
        if (article.id === id) {
          article.title = data.title;
          article.description = data.description;
          return article;
        }
        return article;
      });

      setArticles(updatedArticles);
    },
    [setArticles, articles]
  );

  const value = {
    articles,
    loading,
    deleteArticle,
    addArticle,
    updateArticle,
  } as unknown as ArticleContextType;

  return (
    <ArticlesContext.Provider value={value}>
      {children}
    </ArticlesContext.Provider>
  );
};
