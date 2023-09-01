'use client';
import { redirect, useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { fetchData } from '../utils/fetchData';

export default function AdminPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      redirect('/admin/board');
    }
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const res = await fetchData(
        'http://localhost:3001/authentication/sign-in',
        data,
        'POST'
      );
      localStorage.setItem('accessToken', JSON.stringify(res?.accessToken));
      router.push('/admin/board');
    } catch (error) {
      console.warn(error);
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  return (
    <div>
      <form onSubmit={onSubmit} method='POST'>
        <input
          type='text'
          placeholder='Enter your email'
          value={formData.email}
          name='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Enter your password'
          value={formData.password}
          name='password'
          onChange={handleChange}
        />
        <button type='submit'>Enter</button>
      </form>
    </div>
  );
}
