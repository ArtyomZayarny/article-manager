'use client';
import { FormEvent, useContext } from 'react';
import { ArticlesContext } from '../context/article-context';

export const SearchBar = () => {
  const { setSearchString,articles, setStoredArticles} = useContext(ArticlesContext);

  const handleChange = (str: string) => {
    if (str.length >= 3) {
      setSearchString(str);
    }
    if(!str) {
      setStoredArticles(articles)
    }
  };


const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  console.log('submit')
}
  return (
    <form
     onSubmit={handleSubmit}
      className='grid w-full max-w-4xl  bg-white rounded-md p-2 shadow-md 
    flex-1 md:flex-initial'
    >
      <input
        placeholder='Search'
        className=' outline-none p-2 w-full'
        type='text'
        onChange={(e)=>handleChange(e.target.value)}
      />

    </form>
  );
};
