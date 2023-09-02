import { useContext } from 'react';
import { ArticlesContext } from '../context/article-context';
import { Article } from './Article';

export const ArticleBoard = () => {
  const { articles } = useContext(ArticlesContext);
  return (
    <div className='flex justify-center'>
      <div className='grid grid-cols-3 gap-4 w-full max-w-4xl'>
        {articles &&
          articles.map((article) => (
            <Article key={article.id} article={article} />
          ))}
      </div>
    </div>
  );
};
