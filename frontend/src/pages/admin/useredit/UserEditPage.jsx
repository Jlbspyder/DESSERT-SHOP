import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useUpdateUserMutation,
  useGetUserDetailsQuery,
} from '../../../slices/usersApiSlice';
import Spinner from '../../../components/Spinner';
import './useredit.css'

const UserEditPage = () => {
  const { id: userId } = useParams();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    isAdmin: false,
  });


  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();


  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      });
    }
  }, [user]);

  
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: type === 'checkbox' ? checked : value }));
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, ...userData});
      refetch();
      toast.success('User updated');
      refetch();
      navigate('/admin/userlist');
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  };


  return (
    <div className='admin'>
      <Link to='/admin/userlist' className='edit-btn'>
        &larr; Go Back
      </Link>
      <div className='menu-edit'>
        <>
          <h1>Edit User</h1>
          {loadingUpdate && <Spinner />}

          {isLoading ? (
            <Spinner />
          ) : (
            <form onSubmit={submitHandler}>
              <div className='form-control'>
                <label>Name</label>
                <input
                  type='text'
                  placeholder='Enter name'
                  name='name'
                  value={userData.name}
                  onChange={handleChange}
                />
              </div>
              <div className='form-control'>
                <label>Email</label>
                <input
                  type='email'
                  placeholder='Enter email'
                  name='email'
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>
              <div className='admin-checkbox'>
                <label>Is Admin</label>
                <input
                  type='checkbox'
                  name='isAdmin'
                  id='admin-check'
                  checked={userData.isAdmin}
                  onChange={handleChange}
                />
              </div>
              <button type='submit' className='login-btn'>
                UPDATE
              </button>
            </form>
          )}
        </>
      </div>
    </div>
  )
}

export default UserEditPage
