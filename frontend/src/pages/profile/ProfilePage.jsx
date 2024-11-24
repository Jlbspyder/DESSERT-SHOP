import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { RiShoppingBagFill } from 'react-icons/ri';
import { BsChatDots } from 'react-icons/bs';
import { FaInfoCircle } from 'react-icons/fa';
import { MdCardGiftcard } from 'react-icons/md';
import { MdOutlineSwitchAccount } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaHouseUser } from 'react-icons/fa';
import { BsFillCreditCard2BackFill } from 'react-icons/bs';
import { MdPeople } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMyOrdersQuery } from '../../slices/ordersApiSlice';
import { toast } from 'react-toastify';
import {
  useLogoutMutation,
  useProfileMutation,
} from '../../slices/usersApiSlice';
import { logout, setCredentials } from '../../slices/authSlice';
import './profile.css';

const Profile = () => {

  const [signout] = useLogoutMutation();

  const { userInfo } = useSelector((state) => state.auth);


  const handleSignout = async () => {
    try {
      await signout().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className='profile-page'>
        <div className='profile-page-flex'>
          <div className='profile-menu-list'>
            <Link  to={'/myorders'} className='profileMenu'>
              <div>
                <RiShoppingBagFill className='account-profile-icon' />
              </div>
              <div>
                <h3>My Orders</h3>
              </div>
            </Link>
            <Link className='profileMenu'>
              <div>
                <FaInfoCircle className='account-profile-icon' />
              </div>
              <div>
                <h3>Need help?</h3>
              </div>
            </Link>
            <Link className='profileMenu'>
              <div>
                <MdCardGiftcard className='account-profile-icon' />
              </div>
              <div>
                <h3>Gift cards and vouchers</h3>
              </div>
            </Link>
            <Link className='profileMenu'>
              <div>
                <MdOutlineSwitchAccount className='account-profile-icon' />
              </div>
              <div>
                <h3>My details</h3>
              </div>
            </Link>
            <Link to={'/password'} className='profileMenu'>
              <div>
                <RiLockPasswordFill className='account-profile-icon' />
              </div>
              <div>
                <h3>Change password</h3>
              </div>
            </Link>
            <Link className='profileMenu'>
              <div>
                <FaHouseUser className='account-profile-icon' />
              </div>
              <div>
                <h3>Address book</h3>
              </div>
            </Link>
            <Link className='profileMenu'>
              <div>
                <BsFillCreditCard2BackFill className='account-profile-icon' />
              </div>
              <div>
                <h3>Payment methods</h3>
              </div>
            </Link>
            <Link className='profileMenu'>
              <div>
                <BsChatDots className='account-profile-icon' />
              </div>
              <div>
                <h3>Contact preferences</h3>
              </div>
            </Link>
            <Link className='profileMenu'>
              <div>
                <MdPeople className='account-profile-icon' />
              </div>
              <div>
                <h3>Social accounts</h3>
              </div>
            </Link>
            <Link className='profileMenu' onClick={handleSignout}>
              <div>
                <FaSignOutAlt className='account-profile-icon' />
              </div>
              <div>
                <h3>Sign out</h3>
              </div>
            </Link>
          </div>
          <div className='profile-page-image'>
            <div className='welcome'>
              <div className='welcome-top'>
                <h1>WELCOME TO</h1>
              </div>
              <br />
              <div className='welcome-middle'>
                <h1>YOUR ACCOUNT</h1>
              </div>
              <br/>
              <div className='welcome-bottom'>
                <h1>{userInfo.name}</h1>
              </div>
            </div>
            <img
              src='/images/random-img.jpg'
              alt='image'
              className='random-img'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
