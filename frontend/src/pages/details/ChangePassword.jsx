import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMyOrdersQuery } from '../../slices/ordersApiSlice';
import { toast } from 'react-toastify';
import { IoIosArrowBack } from 'react-icons/io';
import {
  useLogoutMutation,
  useProfileMutation,
} from '../../slices/usersApiSlice';
import { logout, setCredentials } from '../../slices/authSlice';
import './changepassword.css';
import Spinner from "../../components/Spinner";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: orders, isLoading } = useGetMyOrdersQuery();


  const { userInfo } = useSelector((state) => state.auth);

  const [signout] = useLogoutMutation();


  const [updateProfile, { isLoading: loadingProfileUpdate, error }] =
    useProfileMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ 
        ...prevFormData, [name]: value
    }));
  };

  useEffect(() => {
    if (userInfo) {
      setFormData((prevFormData) => ({
          ...prevFormData,
          firstname: userInfo.firstname,
          lastname: userInfo.lastname,
          email: userInfo.email,
      }));
    }
  }, [userInfo, userInfo.name, userInfo.email]);


  const submitHandler = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          password: formData.password,
          _id: userInfo._id,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };


  return (
  <>
        <div className="password">
          <Link to='/profile'>
            <IoIosArrowBack className='pw-back' />
          </Link>
          <h2>CHANGE PASSWORD</h2>
        </div>
    <form onSubmit={submitHandler} className='update-acct'>
      <div className='form-control'>
        <label>First Name</label>
        <input
          type='text'
          name='firstname'
          placeholder='Enter First Name'
          value={formData.firstname}
          required
          onChange={handleChange}
        />
      </div>
      <div className='form-control'>
        <label>Last Name</label>
        <input
          type='text'
          name='lastname'
          placeholder='Enter Last Name'
          value={formData.lastname}
          required
          onChange={handleChange}
        />
      </div>
      <div className='form-control'>
        <label>Email</label>
        <input
          type='text'
          name='email'
          value={formData.email}
          placeholder='Enter email'
          required
          onChange={handleChange}
        />
      </div>
      <div className='form-control'>
        <label>Password*</label>
        <input
          type='password'
          name='password'
          required
          placeholder='Enter password'
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
          placeholder='Confirm password'
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <button className='career-btn' type='submit'>
        UPDATE
      </button>
            {loadingProfileUpdate && <Spinner />}
    </form>
  </>
  );
};

export default ChangePassword;
