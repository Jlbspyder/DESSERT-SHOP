import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { RiShoppingBagFill } from 'react-icons/ri';
import { BsChatDots } from 'react-icons/bs';
import { MdNavigateNext } from "react-icons/md";
import { FaInfoCircle } from 'react-icons/fa';
import { MdCardGiftcard } from 'react-icons/md';
import { MdOutlineSwitchAccount } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaHouseUser } from 'react-icons/fa';
import { BsFillCreditCard2BackFill } from 'react-icons/bs';
import { MdPeople } from 'react-icons/md';
import Meta from '../../components/Meta';
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      <div className="avatar">{userInfo?.firstname.slice(0, 1)}{userInfo?.lastname.slice(0, 1)}</div>
        <div className='profile-page-flex'>
        <Meta title={`JLB24 |  ${userInfo.firstname}'s profile`} />
          <div className='profile-menu-list'>
            <Link  to={'/myorders'} className='profileMenu'>
              <div className="profile-flex">
                <div>
                  <RiShoppingBagFill className='account-profile-icon symbol' />
                </div>
                <div>
                  <h3>My Orders</h3>
                </div>
              </div>
              <MdNavigateNext className='profile-btn' />
            </Link>
            <Link className='profileMenu'>
              <div className="profile-flex">
                <div>
                  <FaInfoCircle className='account-profile-icon symbol' />
                </div>
                <div>
                  <h3>Need help?</h3>
                </div>
              </div>
              <MdNavigateNext className='profile-btn' />
            </Link>
            <Link className='profileMenu'>
              <div className="profile-flex">
                <div>
                  <MdCardGiftcard className='account-profile-icon symbol' />
                </div>
                <div>
                  <h3>Gift cards and vouchers</h3>
                </div>
              </div>
              <MdNavigateNext className='profile-btn' />
            </Link>
            <Link to={'/mydetails'} className='profileMenu'>
              <div className="profile-flex">
                <div>
                  <MdOutlineSwitchAccount className='account-profile-icon symbol' />
                </div>
                <div>
                  <h3>My details</h3>
                </div>
              </div>
              <MdNavigateNext className='profile-btn' />
            </Link>
            <Link to={'/password'} className='profileMenu'>
              <div className="profile-flex">
                <div>
                  <RiLockPasswordFill className='account-profile-icon symbol' />
                </div>
                <div>
                  <h3>Change password</h3>
                </div>
              </div>
              <MdNavigateNext className='profile-btn' />
            </Link>
            <Link to={'/address'} className='profileMenu'>
              <div className="profile-flex">
                <div>
                  <FaHouseUser className='account-profile-icon symbol' />
                </div>
                <div>
                  <h3>Address book</h3>
                </div>
              </div>
              <MdNavigateNext className='profile-btn' />
            </Link>
            <Link className='profileMenu'>
              <div className="profile-flex">
                <div>
                  <BsFillCreditCard2BackFill className='account-profile-icon symbol symbol' />
                </div>
                <div>
                  <h3>Payment methods</h3>
                </div>
              </div>
              <MdNavigateNext className='profile-btn' />
            </Link>
            <Link to={'/contact'} className='profileMenu'>
              <div className="profile-flex">
                <div>
                  <BsChatDots className='account-profile-icon symbol' />
                </div>
                <div>
                  <h3>Contact Preferences</h3>
                </div>
              </div>
              <MdNavigateNext className='profile-btn' />
            </Link>
            <Link className='profileMenu'>
              <div className="profile-flex">
                <div>
                  <MdPeople className='account-profile-icon symbol' />
                </div>
                <div>
                  <h3>Social accounts</h3>
                </div>
              </div>
              <MdNavigateNext className='profile-btn' />
            </Link>
            <Link className='profileMenu' onClick={handleSignout}>
              <div className="profile-flex">
                <div>
                  <FaSignOutAlt className='account-profile-icon symbol' />
                </div>
                <div>
                  <h3>Sign out</h3>
                </div>
              </div>
              <MdNavigateNext className='profile-btn' />
            </Link>
          </div>
          <div className='profile-page-image'>
            <div className='welcome'>
              <br />
              <div className='welcome-middle'>
                <h1>Hi</h1>
              </div>
              <br/>
              <div className='welcome-bottom'>
                <h1>{userInfo?.firstname?.toUpperCase()}</h1>
              </div>
              <div className='welcome-bottom'>
                <h1>{userInfo?.lastname?.toUpperCase()}</h1>
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
