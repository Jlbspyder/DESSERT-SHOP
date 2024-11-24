import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner'
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice'

const LogIn = () => {
  const [wavePasswordEffect, setWavePasswordEffect] = useState(false)
  const [waveEmailEffect, setWaveEmailEffect] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [login, {isLoading}] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);


 
  const handleChange = (e) => {
    if ( formData.email) {
      setWaveEmailEffect(true)
    } else {
      setWaveEmailEffect(false)
    }
    if ( formData.password) {
      setWavePasswordEffect(true)
    } else {
      setWavePasswordEffect(false)
    }
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const { search } = useLocation()
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    } 
  }, [redirect, userInfo, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData).unwrap();
      dispatch(setCredentials({...res}))
      navigate(redirect)
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };


  return (
    <div className='reg'>
      <form onSubmit={handleSubmit} className='form'>
        <h1>Sign In</h1>
        <div className='form-control'>
          <label className={waveEmailEffect ? 'wave' : "no-wave"}  htmlFor='email'>Email Address</label>
          <input
            type='text'
            name='email'
            value={formData.email}
            onChange={handleChange}
            // required
          />
        </div>
        { isLoading && <Spinner /> }
        <div className='form-control'>
          <label className={wavePasswordEffect ? 'wave' : ""}  htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            // required
          />
        </div>
        <button className='login-btn' type='submit' disabled={isLoading}>
          Sign In
        </button>
        <p>
          New Customer? <Link to={ redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>{' '}
        </p>
      </form>
    </div>
  );
};

export default LogIn;
