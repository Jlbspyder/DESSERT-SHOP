import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FaCcDiscover } from 'react-icons/fa';
import { FaCcVisa } from 'react-icons/fa6';
import { FaCcMastercard } from 'react-icons/fa6';
import { savePaymentMethod } from '../../slices/cartSlice';
import CheckoutSteps from '../../components/checkout/CheckoutSteps';
import './payment.css';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <div className='order'>
        <div>
          <div className='payment-cards'>
            <form onSubmit={submitHandler} id='payment-form'>
              <div className='cards'>
                <FaCcDiscover />
                <FaCcVisa />
                <FaCcMastercard />
              </div>
              <div className='form-cntrl'>
                <label htmlFor='paymentMethod'>PayPal</label>
                <input
                  type='radio'
                  name='paymentMethod'
                  value='PayPal'
                  id='paymentMethod'
                  checked={paymentMethod === 'PayPal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </div>
              <div className='form-cntrl'>
                <label htmlFor='paymentMethod'>Credit Card</label>
                <input
                  type='radio'
                  name='paymentMethod'
                  value='CreditCard'
                  id='paymentMethod'
                  checked={paymentMethod === 'CreditCard'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </div>
              {paymentMethod === '' && (
                <button type='submit' className='confirm-order btn-straight'>
                  CONTINUE
                </button>
              )}
            </form>
          </div>
          {paymentMethod === 'CreditCard' && (
            <div className='payment-infor'>
              <form onSubmit={submitHandler} id='payment'>
                <div className='form-control ctrl'>
                  <label htmlFor=''>NAME ON CARD</label>
                  <input
                    type='text'
                    name='name'
                    placeholder='Name on card'
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <small>Exactly as shown on card</small>
                </div>
                <div className='form-control ctrl'>
                  <label htmlFor=''>CARD NUMBER</label>
                  <input
                    type='text'
                    name='number'
                    placeholder='Card number'
                    required
                    value={formData.number
                      .replace(/\s/g, '')
                      .replace(/(\d{4})/g, '$1 ')
                      .trim()}
                    maxLength={19}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-control ctrl'>
                  <label htmlFor=''>EXPIRY DATE MM/YY*</label>
                  <input
                    type='date'
                    name='expiry'
                    placeholder='Expiry date MM/YY'
                    required
                    value={formData.expiry}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-control ctrl'>
                  <label htmlFor=''>CVV</label>
                  <input
                    type='number'
                    name='cvv'
                    placeholder='CVV'
                    required
                    value={formData.cvv}
                    onChange={handleChange}
                  />
                </div>
                <button type='submit' className='confirm-order btn-straight'>
                  PLACE ORDER
                </button>
              </form>
              <small>
                By continuing, I confirm that I have read and accepted the
                <Link to={'/terms'}>Terms and Conditions</Link> and the
                <Link to={'/privacy'}>Privacy Policy</Link>
              </small>
            </div>
          )}
        </div>
        {/* <h2>Payment Method</h2>
        <form onSubmit={submitHandler} id='payment-form'>
          <h4>Select Method</h4>
          <div className='form-cntrl'>
            <label htmlFor='paymentMethod'>PayPal or Credit Card</label>
            <input
              type='radio'
              name='paymentMethod'
              placeholder='Enter address'
              value='PayPal'
              id='paymentMethod'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <button className='login-btn' type='submit'>
            Continue
          </button>
        </form> */}
      </div>
    </>
  );
};

export default PaymentPage;
