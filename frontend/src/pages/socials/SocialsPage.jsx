import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { BsApple } from 'react-icons/bs';
import { BsTwitterX } from 'react-icons/bs';
import { FaInstagram } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa';
import { FaFacebookF } from 'react-icons/fa';
import Meta from '../../components/Meta';
import './socialspage.css';

const SocialsPage = () => {
  return (
    <div className='my-details contact__'>
      <Meta title='JLB24 | Social accounts' />
      <Link to='/profile'>
        <IoIosArrowBack className='back' />
      </Link>
      <h2>SOCIAL ACCOUNTS</h2>
      <div className='social-accts'>
        <div className='accts'>
          <div className='acct-logo'>
            <div className='social-icon'>
              <BsApple id='icon' />
            </div>
            <span>Apple</span>
          </div>
          <p>Not connected</p>
        </div>
        <div className='accts'>
          <div className='acct-logo'>
            <div className='social-icon'>
              <FaGoogle id='icon' />
            </div>
            <span>Google</span>
          </div>
          <p>Not connected</p>
        </div>
        <div className='accts'>
          <div className='acct-logo'>
            <div className='social-icon'>
              <BsTwitterX id='icon' />
            </div>
            <span>X</span>
          </div>
          <p>Not connected</p>
        </div>
        <div className='accts'>
          <div className='acct-logo'>
            <div className='social-icon'>
              <FaInstagram id='icon' />
            </div>
            <span>Instagram</span>
          </div>
          <p>Not connected</p>
        </div>
        <div className='accts'>
          <div className='acct-logo'>
            <div className='social-icon'>
              <FaFacebookF id='icon' />
            </div>
            <span>Facebook</span>
          </div>
          <p>Not connected</p>
        </div>
      </div>
    </div>
  );
};

export default SocialsPage;
