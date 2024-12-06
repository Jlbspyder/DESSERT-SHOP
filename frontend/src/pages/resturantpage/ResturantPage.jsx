import React, { useState } from 'react';
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom';
import { FaLocationArrow } from 'react-icons/fa';
import { useGetAddressQuery } from '../../slices/addressApiSlice';
import PaginateAddress from '../../components/PaginateAddress';
import Spinner from '../../components/Spinner';
import Meta from '../../components/Meta';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import './resturantpage.css';

const ResturantPage = () => {
  const [open, setOpen] = useState(false);
  const [word, setWord] = useState('');

  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetAddressQuery({
    pageNumber,
    keyword,
  });

  const position = { lat: 6.52, lng: 3.37 };

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (word.trim()) {
      navigate(`/resturant/search/${word}`);
      setWord('');
    } else {
      navigate('/');
    }
  };


  return (
    <div className='resturant'>
      <div className='resturant-page'>
        <div className='career-menu'>
          <Link to='/'>
            <h3>Home</h3>
          </Link>
          <Link>
            <h3>/</h3>
          </Link>
          <Link
           to={'/resturant'}
            className={location.pathname === '/resturant' ? 'career-page' : '' }
          >
            <h3>Restaurants</h3>
          </Link>
        </div>
        <div className='main-resturant'>
        <Meta title='JLB24 | Restaurants' />
          <div className='resturant-sidebar'>
            <form onSubmit={submitHandler}>
              <div className='search'>
                <input
                  type='text'
                  name='q'
                  placeholder='Please, enter your location'
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                />
                <FaLocationArrow
                  onClick={submitHandler}
                  className='search-icon'
                />
              </div>
            </form>
            <h1>Restaurants</h1>
            {isLoading ? (
              <Spinner />
            ) : error ? (
              <h3>{error?.data.message || error.error}</h3>
            ) : (
              <div className='resturant-locations'>
                {data?.address.map((location) => (
                  <div key={location._id} className='addys'>
                    <h2>{location.name}</h2>
                    <p>{location.location}</p>
                    <span>
                      <p>Show on map</p>
                    </span>
                  </div>
                ))}
                <PaginateAddress
                  pages={data?.pages}
                  page={data?.page}
                  keyword={keyword ? keyword : ''}
                />
              </div>
            )}
          </div>
          <APIProvider apiKey={import.meta.env.REACT_APP_MAP_KEY}>
            <div className='map'>
              <Map zoom={9} center={position} mapId='b532c0b0dff4db16'>
                <AdvancedMarker
                  position={position}
                  onClick={() => setOpen(true)}
                ></AdvancedMarker>
                {open && (
                  <InfoWindow
                    position={position}
                    onCloseClick={() => setOpen(false)}
                  >
                    <p>This is it</p>
                  </InfoWindow>
                )}
              </Map>
            </div>
          </APIProvider>
        </div>
      </div>
    </div>
  );
};

export default ResturantPage;
