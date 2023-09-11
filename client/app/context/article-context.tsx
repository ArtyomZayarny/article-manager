'use client';
import { IArticle } from '@/types';
import { createContext, useCallback, useEffect, useState } from 'react';
import { useArticles } from '../hooks/useArticles';

type ArticleContextType = {
  articles: IArticle[] | [];
  initialArticles: IArticle[] | [];
  loading: boolean;
  deleteArticle: (id: string) => void;
  addArticle: (article: IArticle) => void;
  updateArticle: (id: string, data: IArticle) => void;
  searchArticle: (s: string) => void;
  searchString: string;
  setSearchString: (s: string) => void;
  storedArticles:IArticle[] | [];
  setStoredArticles: (arg:IArticle[]) => void;
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
  const [storedArticles, setStoredArticles] = useState([])
  const [searchString, setSearchString] = useState('');

 useEffect( ()=> {
    if(articles.length >0) {
      setStoredArticles(articles)
    }
 },[articles])

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

  const searchArticle = useCallback(
    (searchString: string) => {
      setStoredArticles([
        ...articles.filter((article) =>
          article.title.toLowerCase().includes(searchString.toLowerCase())
        ),
      ]);
    },
    [articles, setArticles]
  );


  const value = {
    articles,
    loading,
    deleteArticle,
    addArticle,
    updateArticle,
    searchArticle,
    searchString,
    setSearchString,
    storedArticles,
    setStoredArticles
  } as unknown as ArticleContextType;

  return (
    <ArticlesContext.Provider value={value}>
      {children}
    </ArticlesContext.Provider>
  );
};
