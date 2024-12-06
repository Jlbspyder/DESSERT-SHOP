import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { saveAddresses } from '../slices/addressBookSlice';
import { useCreateAddressMutation, useGetAddressBookDetailsQuery } from '../slices/addressBookApiSlice';
import { createAddressBook } from '../../../backend/controllers/addressBook';


const AddAddressPage = ({setAdd}) => {
  const cart = useSelector((state) => state.cart);
  const { addressBook } = cart;
  const address = useSelector((state) => state.address);

  const { addresses } = address;

  const [shipData, setShipData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  
  const { id: addressId } = useParams();

  const {
    data: addy,
    isLoading,
    error,
    refetch,
  } = useGetAddressBookDetailsQuery(addressId);


  const [createAddress, {isLoading: loadingAddressBook} ] = useCreateAddressMutation()

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipData((prevShipData) => ({ ...prevShipData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch(saveAddresses({...shipData}))
    // toast.success('Address created!');
    try {
      const res = await createAddress(shipData).unwrap();
      dispatch(saveAddresses({ ...res }));
      toast.success('Address created!');
      setAdd(false)
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
    navigate('/address');
  };

  return (
    <>
      <div className='reg add'>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <label>Name*</label>
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
            <label>Address*</label>
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
            <label>Post Code</label>
            <input
              type='text'
              name='postalCode'
              required
              placeholder='Enter postal code'
              value={shipData.postalCode}
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            <label>State</label>
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
            <label>Country</label>
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
            add
          </button>
        </form>
      </div>
    </>
  );
};

export default AddAddressPage;
