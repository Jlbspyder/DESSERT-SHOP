import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import './registerpage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    // dob: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [redirect, userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register(formData).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
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
          <label>First Name*</label>
          <input
            type='text'
            name='firstname'
            required
            value={formData.firstname}
            onChange={handleChange}
          />
        </div>
        <div className='form-control'>
          <label>Last Name*</label>
          <input
            type='text'
            name='lastname'
            required
            value={formData.lastname}
            onChange={handleChange}
          />
        </div>
        <div className='form-control'>
          <label>Email Address*</label>
          <input
            type='text'
            name='email'
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className='form-control'>
          <label>Password*</label>
          <input
            type='password'
            name='password'
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className='form-control'>
          <label>Confirm Password*</label>
          <input
            type='password'
            name='confirmPassword'
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {/* <div className='form-control'>
          <label>Date of Birth*</label>
          <input
            type='date'
            name='dob'
            required
            value={formData.dob}
            onChange={handleChange}
          />
        </div> */}
        <button className='login-btn' type='submit'>
          Sign Up
        </button>
        <p>
          Already have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
