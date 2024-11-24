import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import './registerpage.css'

const RegisterPage = () => {
    const [nameEffect, setNameEffect] = useState(false);
    const [emailEffect, setEmailEffect] = useState(false);
    const [passwordEffect, setPasswordEffect] = useState(false);
    const [confirmPasswordEffect, setConfirmPasswordEffect] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
  
    const handleChange = (e) => {
      if (formData.name) {
        setNameEffect(true)
      } else {
        setNameEffect(false)
      }
      if ( formData.email) {
        setEmailEffect(true)
      } else {
        setEmailEffect(false)
      }
      if ( formData.password) {
        setPasswordEffect(true)
      } else {
        setPasswordEffect(false)
      }
      if ( formData.confirmPassword) {
        setConfirmPasswordEffect(true)
      } else {
        setConfirmPasswordEffect(false)
      }
      const { name, value } = e.target
      setFormData((prevFormData) => ({...prevFormData, [name]: value}))
    }
  
    const navigate = useNavigate();
    const dispatch = useDispatch();

    
  const [register, {isLoading}] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);
  
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
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
    } else {
      try {
        const res = await register(formData).unwrap();
        dispatch(setCredentials({...res}))
        navigate(redirect)
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className='reg'>
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className='form-control'>
          <label className={nameEffect ? 'wave' : 'no-wave'} htmlFor='name'>
            Name
          </label>
          <input
            type='text'
            name='name'
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className='form-control'>
          <label className={emailEffect ? 'wave' : 'no-wave'} htmlFor='email'>
            Email Address
          </label>
          <input
            type='text'
            name='email'
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className='form-control'>
          <label className={passwordEffect ? 'wave' : 'no-wave'} htmlFor='password'>
            Password
          </label>
          <input
            type='password'
            name='password'
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className='form-control'>
          <label
            className={confirmPasswordEffect ? 'wave' : 'no-wave'}
            htmlFor='password'
          >
            Confirm Password
          </label>
          <input
            type='password'
            name='confirmPassword'
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button className='login-btn' type='submit'>
          Sign Up
        </button>
        <p>
          Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
        </p>
      </form>
    </div>
  )
}

export default RegisterPage
