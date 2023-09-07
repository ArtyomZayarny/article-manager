import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ArticlesContext } from '../context/article-context';
import { fetchData } from '../utils/fetchData';

type Props = {
  handleClose: () => void;
};

type Inputs = {
  title: string;
  description: string;
};

export const AddArticleForm = ({ handleClose }: Props) => {
  const router = useRouter()
  const { addArticle } = useContext(ArticlesContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  ;
  const handleCreateArticle:SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await fetchData('http://localhost:3001/articles', 'POST', {
      ...data
      });
      
    if(res?.statusCode === 401) {
      localStorage.removeItem('accessToken')
      router.push('/admin')
      return;
    }
      if (res?.error) {
        // setError(res.error);
        return;
      }
      //update articles list in context
      addArticle(res);
      handleClose();
    } catch (error) {
      console.warn(error);
    }
  };
  return (
    <form
    onSubmit={handleSubmit(handleCreateArticle)}
    className={'w-full max-w-md rounded-md bg-slate-300'}
  >
    
    <div className={'flex flex-col p-8'}>
    <div className='flex justify-center'>
    <h2 className={'font-bold center mb-4'}>Add new article</h2>
      </div>
      <label htmlFor='title' className={'mb-8 relative flex flex-col'}>
        <input
          {...register('title', { required: true })}
          placeholder='Please enter title'
          className={'rounded-md w-full p-2'}
        />
        {errors.title && (
          <span className={'text-red-700 text-xs absolute top-12'}>
            This title field is required
          </span>
        )}
      </label>

      <label htmlFor='description' className={'mb-8 relative flex flex-col'}>
        <textarea
          placeholder='Please enter description'
          {...register('description', { required: true })}
          className={'rounded-md w-full p-2 mb-2'}
        />

        {errors.description&& (
          <span className={'text-red-700 text-xs absolute -bottom-6'}>
            This description field is required
          </span>
        )}
      </label>

      <input
        type='submit'
        value='Publish'
        className={
          'w-full bg-blue-700 p-2 rounded-md text-white hover:cursor-pointer hover:bg-blue-500'
        }
      />
    </div>
  </form>
  );
};
