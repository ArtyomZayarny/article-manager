'use client';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function AdminPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
      });

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
 // We don't want the page to refresh
 event.preventDefault()

 const data  = {
    email:formData.email,
    password:formData.password
 }
 // POST the data to the URL of the form
 fetch('http://localhost:3001/authentication/sign-in', {
   method: "POST",
   body: JSON.stringify(data),
   headers: {
    'Content-Type': 'application/json',
   },
 }).then((data) => {
    console.log('res', data)
 })
      }

      const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        setFormData((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue
  }));
      }
    return (
        <div>
            <form onSubmit={onSubmit} method='POST'>
                <input  type="text" placeholder='Enter your email' value={formData.email} name="email" onChange={handleChange}/>
                <input  type='password' placeholder='Enter your password' value={formData.password} name='password' onChange={handleChange}/>
                <button type='submit'>Enter</button>
            </form>
        </div>
    )
}