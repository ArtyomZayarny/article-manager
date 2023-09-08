'use client';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { usePathname } from 'next/navigation';
import { useContext, useMemo, useState } from 'react';
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
  const pathname = usePathname();
  const isAdminPage = useMemo(() => pathname.includes('admin'), [pathname]);

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

      {isAdminPage && (
        <div className={'my-2 justify-between flex'}>
          <ModeEditIcon onClick={() => handleEdit(article.id, values)} className={'hover:cursor-pointer'}/>
          <DeleteIcon onClick={() => handleDelete(article.id)} className={'hover:cursor-pointer'}/>
        </div>
      )}
    </div>
  );
};