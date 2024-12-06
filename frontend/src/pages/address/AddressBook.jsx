import React, { Fragment, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { MdNavigateNext } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa6';
import { useGetAddressBookQuery, useGetAddressBookDetailsQuery } from '../../slices/addressBookApiSlice';
import { createAddressBook } from '../../../../backend/controllers/addressBook';
import PaginateAddress from '../../components/PaginateAddress';
import AddAddressPage from '../../components/AddAddressPage';
import './addressbook.css';
import Meta from '../../components/Meta';

const AddressBook = () => {
  const [add, setAdd] = useState(false);
  const [currentDeliveryIdx, setCurrentDeliveryIdx] = useState(null);
  const [currentBillingIdx, setCurrentBillingIdx] = useState(null);
  const [defaultDelivery, setDefaultDelivery] = useState(false);
  const [defaultBilling, setDefaultBilling] = useState(false);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const address = useSelector((state) => state.address);


  // const { id: addressId } = useParams();

  // const { pageNumber, keyword } = useParams();
  // const { data, isLoading, error } = useGetAddressBookQuery({
  //   pageNumber,
  //   keyword,
  // });
  // const { data: addy, isLoading: loadingAddy } = useGetAddressBookDetailsQuery(addressId);

  const handleDefaultDelivery = (id, idx) => {
    const active = address.map((item) => item._id === id);
    if (active) {
      setDefaultDelivery(true);
      setCurrentDeliveryIdx(idx);
    }
  };

  const handleDefaultBilling = (id, idx) => {
    const active = address.map((item) => item._id === id);
    if (active) {
      setDefaultBilling(true);
      setCurrentBillingIdx(idx);
    }
  };

  return (
    <div className='address-book contact__'>
      <Meta title='JLB24 | Address book' />
      <Link to='/profile'>
        <IoIosArrowBack className='back' />
      </Link>
      <h2>ADDRESS BOOK</h2>
      {add && <AddAddressPage setAdd={setAdd} />}
      {!add && (
        <div className='button-bg'>
          <button onClick={() => setAdd(true)} className='add-address'>
            add new address
          </button>
        </div>
      )}
      {address?.addresses?.length === 0 && !add ? (
        <span>You haven't entered any address</span>
      ) : (
        <>
          {!add && (
            <div className='addresses'>
              {address?.map((addy, index) => (
              <Fragment key={addy._id}>
                <Link to={`addressbook/${addy._id}`}>
                  <div className='contact-flex'>
                    <div className='contact-info'>
                      <p>{addy.name}</p>
                      <p>{addy.address}</p>
                      <p>{addy.postalCode}</p>
                      <p>{addy.state}</p>
                      <p>{addy.country}</p>
                    </div>
                    <MdNavigateNext className='address-check' />
                  </div>
                </Link>
                 <div
                 onClick={() => handleDefaultDelivery(addy._id, index)}
                 className='address-flex'
               >
                 <p id='default-address'>
                   Set as your default delivery address
                 </p>
                 {index === currentDeliveryIdx && (
                   <FaCheck className='default-address-check' />
                 )}
               </div>
               <div id='line'></div>
               <div
                 onClick={() => handleDefaultBilling(addy._id, index)}
                 className='address-flex'
               >
                 <p className='default-address'>
                   Set as your default billing address
                 </p>
                 {index === currentBillingIdx && (
                   <FaCheck className='default-address-check' />
                 )}
               </div>
               </Fragment>
              ))}
            </div>
          )}
        </>
      )}
      {/* <PaginateAddress
        pages={data?.pages}
        page={data?.page}
        keyword={keyword ? keyword : ''}
      /> */}
    </div>
  );
};

export default AddressBook;
