import React, { useState, useEffect } from 'react'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Login = () => {

  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [state, setState] = useState('Sign Up');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, password, email });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center justify-center bg-gradient-to-br px-4'>
      <div className='flex flex-col gap-6 m-auto items-start p-10 min-w-[340px] sm:min-w-96 bg-white border border-gray-200 rounded-2xl text-zinc-600 text-sm shadow-2xl backdrop-blur-sm'>
        <div className='w-full text-center'>
          <p className='text-3xl font-bold text-gray-800 mb-2'>{state === 'Sign Up' ? t('Create Account') : t('Welcome Back')}</p>
          <p className='text-gray-500 capitalize'>{t('please')} {state === 'Sign Up' ? t('sign up') : t('log in')} {t('to book an appointment')}</p>
        </div>
        {
          state === 'Sign Up' && <div className='w-full'>
            <p className='text-gray-700 font-medium mb-2'>{t('Full Name')}</p>
            <input
              className='border border-gray-300 rounded-lg w-full p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 placeholder-gray-400'
              type="text"
              placeholder={t('Enter your full name')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        }

        <div className='w-full'>
          <p className='text-gray-700 font-medium mb-2'>{t('Email')}</p>
          <input
            className='border border-gray-300 rounded-lg w-full p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 placeholder-gray-400'
            type="email"
            placeholder={t('Enter your email address')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='w-full'>
          <p className='text-gray-700 font-medium mb-2'>{t('Password')}</p>
          <input
            className='border border-gray-300 rounded-lg w-full p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 placeholder-gray-400'
            type="password"
            placeholder={t('Enter your password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit' className='bg-primary hover:bg-primary/90 text-white w-full py-3 rounded-lg text-base font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 mt-2'>
          {state === 'Sign Up' ? t('Create Account') : t('Login')}
        </button>

        <div className='w-full text-center'>
          {
            state === 'Sign Up'
              ? <p className='text-gray-600'>{t('Already have an account?')} <span onClick={() => setState('Login')} className='text-primary font-semibold hover:text-primary/80 cursor-pointer transition-colors duration-200'>{t('Login here')}</span></p>
              : <p className='text-gray-600'>{t('Create an account?')} <span onClick={() => setState('Sign Up')} className='text-primary font-semibold hover:text-primary/80 cursor-pointer transition-colors duration-200'>{t('Sign up here')}</span></p>
          }
        </div>
      </div>
    </form>
  )
}

export default Login