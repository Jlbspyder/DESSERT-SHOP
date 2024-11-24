import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaLocationArrow } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import './resturantpage.css';

const ResturantPage = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState(false);
  const [open, setOpen] = useState(false);

  const position = { lat: 6.52, lng: 3.37 };

  const navigate = useNavigate();

  const fetchLocations = async () => {
    const { data } = await axios.get('/api/address');
    setLocations(data);
    if (data.status === 404) {
      setLocations([]);
      return;
    }
    fetchLocations();
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const searchRef = useRef();

  const search = () => {
    const searchValue = searchRef.current.value;
    if (searchValue.trim()) {
      const fetchSearch = async () => {
        const { data } = await axios.get(`/api/address?name=${searchValue}`);
        setLocations(data);
        setAddress(true);
      };

      fetchSearch();
    } else {
      fetchLocations();
      setAddress(false);
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    search();
  };
  const closeSearch = () => {
    searchRef.current.value = '';
    setAddress(false);
  };

  useEffect(() => {
    const fetchLocations = async () => {
      const { data } = await axios.get('/api/address');
      setLocations(data);
    };
    fetchLocations();
  }, []);

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
            className={location.pathname === '/resturant' ? 'career-page' : ''}
          >
            <h3>Resturants</h3>
          </Link>
        </div>
        <div className='main-resturant'>
          <div className='resturant-sidebar'>
            <form>
              <div className='search'>
                <input
                  type='text'
                  placeholder='Please, enter your location'
                  ref={searchRef}
                  onChange={search}
                />
                {address ? (
                  <IoMdClose className='search-icon' onClick={closeSearch} />
                ) : (
                  <FaLocationArrow className='search-icon' />
                )}
              </div>
            </form>
            <h1>Resturants</h1>
            <div className='resturant-locations'>
              {locations.map((location) => (
                <div key={location.id} className='addresses'>
                  <h2>{location.title}</h2>
                  <p>{location.location}</p>
                  <span>
                    <p>Show on map</p>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <APIProvider apiKey={import.meta.env.REACT_APP_MAP_KEY}>
            <div className='map'>
              <Map zoom={9} center={position} mapId='b532c0b0dff4db16'>
                <AdvancedMarker position={position} onClick={() => setOpen(true)}></AdvancedMarker>
                {open && <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
                    <p>This is it</p>
                  </InfoWindow>}
              </Map>
            </div>
          </APIProvider>
        </div>
      </div>
    </div>
  );
};

export default ResturantPage;
