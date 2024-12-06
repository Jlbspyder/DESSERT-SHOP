import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { FaCheck } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { deleteAddress } from '../../slices/addressBookSlice';
import { useGetAddressBookDetailsQuery } from '../../slices/addressBookApiSlice';
import Meta from '../../components/Meta';
import './singleaddress.css';

const SingleAddressPage = () => {
    const [add, setAdd] = useState(false);
    const [currentDeliveryIdx, setCurrentDeliveryIdx] = useState(null);
    const [currentBillingIdx, setCurrentBillingIdx] = useState(0);
    const [defaultDelivery, setDefaultDelivery] = useState(false);
    const [defaultBilling, setDefaultBilling] = useState(false);
    const address  = useSelector((state) => state.address);

    const {id: addressId} = useParams()


    const { data: addy, isLoading: loadingAddy } = useGetAddressBookDetailsQuery(addressId);

    const dispatch = useDispatch();

    const deleteAddressHandler = async (id) => { 
        dispatch(deleteAddress(id))
        toast.success('Address deleted!')
      }

      const handleDefaultDelivery = (id) => {
        const active = address.map((item) => item._id === id);
        if (active) {
          setDefaultDelivery(true);
        }
      };
    
      const handleDefaultBilling = (id) => {
        const active = address.map((item) => item._id === id);
        if (active) {
          setDefaultBilling(true);
        }
      };
    
  return (
    <>
      <div className='address-header'>
        <Link to='/address'>
          <IoIosArrowBack className='bac' />
        </Link>
        <h3>EDIT ADDRESS</h3>
      </div>
      <div className='single-address'>
        <Meta title='JLB24 | Address book' />
        <div>
            <div className='address-sub-header'>
              <h4>CONTACT DETAILS</h4>
            </div>
            <div className='address-info'>
              <h5>NAME</h5>
              <p>{addy?.name}</p>
            </div>
        </div>
        <div>
          <div className='address-sub-header'>
            <h4>ADDRESS DETAILS</h4>
          </div>
          <div className='address-info'>
            <h5>COUNTRY</h5>
            <p>{addy?.country}</p>
          </div>
          <div className='address-info'>
            <h5>ADDRESS</h5>
            <p>{addy?.address}</p>
          </div>
          <div className='address-info'>
            <h5>TOWN / CITY</h5>
            <p>{addy?.city}</p>
          </div>
          <div className='address-info'>
            <h5>POST CODE</h5>
            <p>{addy?.postalCode}</p>
          </div>
        </div>
        <div onClick={() => handleDefaultDelivery(addy._id)}  className='address-flex address-default'>
          <p id='default-address'>Set as your default delivery address</p>
          {defaultDelivery && <FaCheck className='default-address-check' />}
        </div>
        <div onClick={() => handleDefaultBilling(addy._id)} className='address-flex address-default'>
          <p className='default-address'>Set as your default billing address</p>
          {defaultBilling && <FaCheck className='default-address-check' />}
        </div>
        <div>
        <div className='address-bg'>
          <button onClick={() => deleteAddressHandler(addy._id)} className='add-address bottom'>
            delete address
          </button>
        </div>
        </div>
      </div>
    </>
  );
};

export default SingleAddressPage;
