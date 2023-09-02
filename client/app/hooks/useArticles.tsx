import { useEffect, useState } from 'react';
import { fetchData } from '../utils/fetchData';

export const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    async function getArticles() {
      try {
        const articles = await fetchData(
          'http://localhost:3001/articles',
          'GET'
        );
        articles && setArticles(articles);
      } catch (error) {
        console.warn(error);
      }
      setLoading(false);
    }

    getArticles();
  }, []);

  return { articles, loading, setArticles };
};
