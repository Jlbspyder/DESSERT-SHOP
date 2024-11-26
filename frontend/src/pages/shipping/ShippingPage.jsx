import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../../slices/cartSlice';
import CheckoutSteps from '../../components/checkout/CheckoutSteps';
import './shipping.css'

const ShippingPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [shipData, setShipData] = useState({
    name: shippingAddress.name || '',
    address: shippingAddress.address || '',
    city: shippingAddress.city || '',
    state: shippingAddress.state || '',
    postCode: shippingAddress.postCode || '',
    country: shippingAddress.country || ''
  });


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipData((prevShipData) => ({ ...prevShipData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ ...shipData }));
    navigate('/placeorder');
  };

  return (
    <>
      <div className='reg'>
        <form onSubmit={handleSubmit}>
          <CheckoutSteps step1 step2 />
          <br/>
          <h1>Shipping</h1>
          <div className='form-control'>
            <label>Name</label>
            <input
              type='text'
              name='name'
              required
              placeholder='Enter name'
              value={shipData.name}
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            <label>Address</label>
            <input
              type='text'
              name='address'
              required
              placeholder='Enter address'
              value={shipData.address}
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            <label>City</label>
            <input
              type='text'
              name='city'
              required
              placeholder='Enter city'
              value={shipData.city}
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            <label>
              Post Code
            </label>
            <input
              type='text'
              name='postCode'
              required
              placeholder='Enter postal code'
              value={shipData.postCode}
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            <label>
              State
            </label>
            <input
              type='text'
              name='state'
              required
              placeholder='State'
              value={shipData.state}
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            <label>
              Country
            </label>
            <input
              type='text'
              name='country'
              required
              placeholder='Enter country'
              value={shipData.country}
              onChange={handleChange}
            />
          </div>
          <button className='login-btn' type='submit'>
            Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default ShippingPage;
