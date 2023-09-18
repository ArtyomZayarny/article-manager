'use client';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Header } from '../components/Header';
import { fetchData } from '../utils/fetchData';

type Inputs = {
  email: string;
  password: string;
};

export default function AdminPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const [error, setError] = useState('');

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await fetchData(
        'http://localhost:3001/authentication/sign-in',
        'POST',
        data
      );
      if (res?.error) {
        setError(res.message);
        return;
      }
      localStorage.setItem('accessToken', JSON.stringify(res?.accessToken));
      router.push('/admin/board');
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      redirect('/admin/board');
    }
  }, [watch]);

  const handleChange = () => {
    setError('');
  };

  return (
    <>
      <Header>
        <div className={'flex w-full justify-between'}>
          <Link href={'/'} className={'font-bold text-white'}>
            Article Manager
          </Link>
        </div>
      </Header>
      <div className={'flex justify-center w-full  mt-10'}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={'w-full max-w-md rounded-md bg-slate-300'}
        >
          <div className={'flex flex-col p-8'}>
            <label htmlFor='email' className={'mb-8 relative flex flex-col'}>
              <input
                {...register('email', { required: true })}
                onChange={handleChange}
                placeholder='Please enter your email'
                className={'rounded-md w-full p-2'}
              />
              {errors.email && (
                <span className={'text-red-700 text-xs absolute top-12'}>
                  This email field is required
                </span>
              )}
            </label>

            <label htmlFor='password' className={'mb-8 relative flex flex-col'}>
              <input
                type='password'
                placeholder='Please enter your password'
                {...register('password', { required: true })}
                onChange={handleChange}
                className={'rounded-md w-full p-2 mb-2'}
              />

              {errors.password && (
                <span className={'text-red-700 text-xs absolute top-12'}>
                  This password field is required
                </span>
              )}
              {error && <p className='text-red-700 text-xs'>{error}</p>}
            </label>

            <input
              type='submit'
              value='Login'
              className={
                'w-full bg-blue-700 p-2 rounded-md text-white hover:cursor-pointer hover:bg-blue-500'
              }
            />
          </div>
        </form>
      </div>
    </>
  );
}
