import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './careers.css';

const Careers = () => {
  const location = useLocation();

  return (
      <div className='career'>
        <div className='career-menu'>
          <Link to='/'>
            <h3>Home</h3>
          </Link>
          <Link>
            <h3>/</h3>
          </Link>
          <Link
            className={location.pathname === '/careers' ? 'career-page' : ''}
          >
            <h3>Careers</h3>
          </Link>
        </div>
        <div className='your-way'>
          <h1>
            Your Career, <br />
            <br /> Your Way
          </h1>
        </div>
        <div className='career-image-container'>
          <img
            src='/images/dessert-staff.jpg'
            alt='staff-pix'
            className='career-image'
          />
          <img
            src='/images/dessert-chips.jpg'
            alt='chips'
            className='career-image'
          />
          <img
            src='/images/dessert-man.jpg'
            alt='man'
            className='career-image'
          />
          <img
            src='/images/cake-meal.jpg'
            alt='cake'
            className='career-image'
          />
        </div>
        <div className='career-info'>
          <h1>
            We may be the Desserts King, but around here, my friend, YOU rule
            your career.
          </h1>
          <p>
            You get to do things your way, and be, well, just you. The team's a
            proper team. We have a laugh, and we've got your back. And because
            we are shaking up fast food and opening restaurants like nobody's
            business, you get to be a part of something (royally) huge. It is
            only what "one" deserves.
          </p>
          <Link to='/apply'>
            <button className='career-btn'>Find the Desserts Vacancy</button>
          </Link>
        </div>
      </div>
  );
};

export default Careers;
