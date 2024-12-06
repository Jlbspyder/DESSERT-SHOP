import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { MdDiscount } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa6';
import { FaBowlFood } from 'react-icons/fa6';
import { BsQuestionCircle } from "react-icons/bs";
import './contactpage.css';

const ContactPage = () => {
  return (
    <div className='my-details contact__'>
      <Link to='/profile'>
        <IoIosArrowBack className='back__' />
      </Link>
      <h2>CONTACT PREFERENCES</h2>
      <p>
        We're making it easier to manage what you hear from us - so you might
        notice some changes. If you're already opted in, dont worry! You'll
        still be kept up to date on our latest discounts and offers.
      </p>
      <div className='contact-flex'>
        <p>Content Type</p>
        <button className='select-all'>select all</button>
      </div>
      <div className='contact-flex'>
        <MdDiscount className='discount' />
        <div>
          <h5>DISCOUNT AND NEW DELICACIES</h5>
          <p>
            Be the first in line to grab the menu you love for less, get
            exclusive offers, and all the best made desserts.
          </p>
        </div>
      </div>
      <div>
        <div className='contact-flex no-border'>
          <p>Email</p>
          <FaCheck className='default-address-check' />
        </div>
        <div className='contact-flex no-border'>
          <p>Text</p>
          <FaCheck className='default-address-check' />
        </div>
      </div>
      <div className='contact-flex'>
        <FaBowlFood className='discount' />
        <div>
          <h5>MENU ALERT</h5>
          <p>
            If that menu you're into comes back in the kitchen, get a heads-up
            so you can add order pronto.
          </p>
        </div>
      </div>
      <div className='contact-flex no-border'>
        <p>Text</p>
        <FaCheck className='default-address-check' />
      </div>
      <div className='preference'>
        <p>
          Changes to your preferences may take up to seven days to take effect.
        </p>
        <button className='add-address'>save preferences</button>
      </div>
      <div>
        <div className='contact-flex no-border'>
          <p>Privacy Policy</p>
          <BsQuestionCircle className='ques' />
        </div>
        <div className='contact-flex no-border'>
          <p>Terms & Conditions</p>
          <BsQuestionCircle className='ques' />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
