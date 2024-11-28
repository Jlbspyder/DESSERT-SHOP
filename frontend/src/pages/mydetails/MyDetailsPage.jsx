import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoIosArrowBack } from 'react-icons/io';
import './mydetails.css';

const MyDetailsPage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className='my-details'>
        <Link to='/profile'>
          <IoIosArrowBack className='back' />
        </Link>
        <h2>MY DETAILS</h2>
      <div className='dets'>
        <h3>FIRST NAME</h3>
        <div>{userInfo.firstname}</div>
      </div>
      <div className='dets'>
        <h3>LAST NAME</h3>
        <div>{userInfo.lastname}</div>
      </div>
      <div className='dets'>
        <h3>EMAIL ADDRESS</h3>
        <div>{userInfo.email}</div>
      </div>
      {/* <div className='dets'>
        <div>DATE OF BIRTH</div>
        <div>24 August 1985</div>
      </div> */}
    </div>
  );
};

export default MyDetailsPage;
