import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { FaCheck } from "react-icons/fa6";
import AddAddressPage from '../../components/AddAddressPage';
import './addressbook.css';
import Meta from '../../components/Meta';

const AddressBook = () => {
    const [add, setAdd] = useState(false)
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart
  return (
    <div className='address-book contact__'>
      <Meta title='JLB24 | Address book' />
      <Link to='/profile'>
        <IoIosArrowBack className='back' />
      </Link>
      <h2>ADDRESS BOOK</h2>
      {add && <AddAddressPage />}
      {!add && <div className='button-bg'>
        <button onClick={() => setAdd(true)}  className='add-address'>add new address</button>
      </div>}
      {shippingAddress.address === '' && !add ? (<span>You haven't entered any address</span>) : <>
        <div className="addresses">
            <p>{shippingAddress.name}</p>
            <p>{shippingAddress.address}</p>
            <p>{shippingAddress.postCode}</p>
            <p>{shippingAddress.state}</p>
            <p>{shippingAddress.country}</p>
        </div>
      </>}
            {shippingAddress.address !== '' && <div className='address-flex'>
                <p id='default-address'>Default delivery address</p>
                <FaCheck className='default-address-check' />
            </div>}
            {shippingAddress.address !== '' && <p className='default-address'>Set as your default billing address</p>}
    </div>
  );
};

export default AddressBook;
