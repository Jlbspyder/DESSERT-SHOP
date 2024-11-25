import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { BiLogoPlayStore } from 'react-icons/bi';
import { FaApple } from 'react-icons/fa';
import { FaLocationArrow } from 'react-icons/fa';
import { IoIosArrowDropleft } from 'react-icons/io';
import { IoIosArrowDropright } from 'react-icons/io';
import { IoStorefrontSharp } from 'react-icons/io5';
import Spinner from '../../components/Spinner';
import { useGetTopMenuQuery } from '../../slices/menuApiSlice';
import './homepage.css'

const Hero = () => {
  const [desserts, setDesserts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchPosition, setTouchPosition] = useState(null);
  const [text, setText] = useState('');

  const { data: menu, isLoading } = useGetTopMenuQuery();

  useEffect(() => {
    const fetchDesserts = async () => {
      const { data } = await axios.get('/api/desserts');
      setDesserts(data)
    }
    fetchDesserts()
  }, [])

  const topMenuImg = menu?.map((el) => el.img )
  const length = topMenuImg?.length;



  const navigate = useNavigate();

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? length - 1 : currentIndex - 1);
  };
  const nextSlide = () => {
    setCurrentIndex(currentIndex === length - 1 ? 0 : currentIndex + 1);
  };

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };
  const handleTouchMove = (e) => {
    const touchDown = touchPosition;
    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      nextSlide();
    }

    if (diff < -5) {
      prevSlide();
    }

    setTouchPosition(null);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const slideShow = () => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  };

  useEffect(() => {
    slideShow();
  });

  const searchLocation = () => {
    if (text) {
      navigate('/resturant');
    }
  };

  return (
    <section className='hero'>
      {isLoading ? <Spinner /> : <section className='slide-show'>
        <div
          className='slider'
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <IoIosArrowDropleft className='left-arrow' onClick={prevSlide} />
          <IoIosArrowDropright className='right-arrow' onClick={nextSlide} />
          {menu.map((dessert, index) => (
            <Link
              to={`/menu/${dessert._id}`}
              key={dessert._id}
              className={index === currentIndex ? 'dessert active' : 'dessert'}
            >
              {index === currentIndex && (
                <img src={dessert.img} alt={dessert.name} className='slide-show' />
              )}
            </Link>
          ))}
          <div className='pointer'>
            {menu.map((dessert, index) => (
              <div
                key={dessert._id}
                className={`dot ${currentIndex === index ? 'alive' : ''}`}
                onClick={() => goToSlide(index)}
              ></div>
            ))}
          </div>
        </div>
      </section>}
      <section className='locator'>
        <div className='locator-container'>
          <div className='locator-info'>
            <h1>Store locator</h1>
            <p>Find a location nearby</p>
              <div className='search-location'>
                <input
                  type='text'
                  placeholder='Your location'
                  onChange={(e) => setText(e.target.value)}
                />
                  <FaLocationArrow
                    className='search-icon locate'
                    onClick={searchLocation}
                  />
              </div>
          </div>
          <IoStorefrontSharp className='location-img' />
        </div>
      </section>
      <section className='download'>
        <div className='download-image'>
          <img src='/images/order.jpg' alt='app' className='app-image' />
        </div>
        <div className='download-info'>
          <h1>
            Download our app and discover the incredible offers we have for you!
          </h1>
          <div className='appstore'>
            <Link to="https://play.google.com/store/apps" target="_blank" className='app'>
              <BiLogoPlayStore className='store' />
              <p>
                GET IT ON
                <br /> <span>Google Play</span>
              </p>
            </Link>
            <Link to="https://www.apple.com/store" target="_blank" className='app'>
              <FaApple className='store' />
              <p>
                Download on the
                <br /> <span>App Store</span>
              </p>
            </Link>
          </div>
          <h5 id='lg'>
            Apple and the Apple logo are trademarks of Apple Inc., registered in
            the US
            <br /> and other countries. App Store is a service mark of Apple
            Inc. Google Play is
            <br /> a trademark of Google Inc. Terms and Conditions apply.
          </h5>
          <h5 id='sm'>
            Apple and the Apple logo are trademarks of Apple Inc., registered in
            the US and other countries. App Store is a service mark of Apple
            Inc. Google Play is a trademark of Google Inc. Terms and Conditions
            apply.
          </h5>
        </div>
      </section>
    </section>
  );
};

export default Hero;
