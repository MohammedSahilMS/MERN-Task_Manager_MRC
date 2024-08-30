import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const [formData,setFormData]= useState({email:"", password:""});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData , [e.target.name] : e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login" , formData)
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard")
        } catch (error) {
            console.error(error.response?.data?.msg || `An error occured duing login` );
            
        }
    }

  return (
    <>
    <form className='max-w-md mx-auto my-8 p-6 border rounded  shadow' >
        <h2 className='text-2xl mb-4' >Login</h2>

        <input type="email" name='email' placeholder='Email' value={formData.email} onChange={handleChange} className='w-full p-2 mb-4 border rounded' />


        <input type="password" name='password' placeholder='Password' value={formData.password} onChange={handleChange} className='w-full p-2 mb-4 border rounded' />


        <button type='submit' onClick={handleSubmit} className='w-full p-2 bg-blue-500 text-white rounded ' >Login</button>

    </form>
    </>
  )
}

export default Login