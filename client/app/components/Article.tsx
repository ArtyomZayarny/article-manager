'use client';
import { useContext, useState } from 'react';
import { ArticlesContext } from '../context/article-context';
import { fetchData } from '../utils/fetchData';

type Props = {
  article: {
    id: string;
    title: string;
    description: string;
  };
};

export const Article = ({ article }: Props) => {
  const { deleteArticle, articles } = useContext(ArticlesContext);
  console.log('arc', article);
  const [values, setValues] = useState({
    title: '',
    description: '',
  });
  const handleEdit = (id, values) => {
    console.log('edit');
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetchData(
        `http://localhost:3001/articles/${id}`,
        'DELETE'
      );
      deleteArticle(id);
    } catch (error) {
      console.warn(error);
    }
  };
  return (
    <div className='bg-white rounded-md drop-shadow-md p-6 w-full max-w-sm '>
      <h3 className={'font-bold text-xl text-[#242424]'}>{article.title}</h3>
      <p className={'text-base text-[#6b6b6b]'}>{article.description}</p>
      <div className={'my-2 justify-between flex'}>
        <button onClick={() => handleEdit(article.id, values)}>edit</button>
        <button onClick={() => handleDelete(article.id)}>delete</button>
      </div>
    </div>
  );
};
