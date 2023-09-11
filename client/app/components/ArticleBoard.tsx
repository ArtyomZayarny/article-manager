import { useContext, useEffect } from 'react';
import { ArticlesContext } from '../context/article-context';
import { Article } from './Article';
import { Panel } from './Panel';

export const ArticleBoard = () => {
  const { storedArticles, loading,searchString, searchArticle} = useContext(ArticlesContext);

  useEffect( () => {
    if(searchString) {
      searchArticle(searchString)
    }
  },[searchString])

  return (
    <div>
      <Panel />
      <div className='flex justify-center'>
        <div className='grid grid-cols-3 gap-4 w-full max-w-4xl py-6'>
          {loading && <h2>Loading.......</h2>}
          {storedArticles &&
            storedArticles.map((article) => (
              <Article key={article.id} article={article} />
            ))}
        </div>
      </div>
    </div>
  );
};
