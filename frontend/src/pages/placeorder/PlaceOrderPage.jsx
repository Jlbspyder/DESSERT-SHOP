import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';
import { FaCcDiscover } from 'react-icons/fa';
import { FaCcVisa } from 'react-icons/fa6';
import { FaCcMastercard } from 'react-icons/fa6';
import CheckoutSteps from '../../components/checkout/CheckoutSteps';
import { savePaymentMethod } from '../../slices/cartSlice';
import { useCreateOrderMutation } from '../../slices/ordersApiSlice';
import { clearCartItems, clearShippingAddress } from '../../slices/cartSlice';
import Timer from '../../components/Timer';
import PaymentPage from '../payment/PaymentPage';
import './placeorder.css';

const PlaceOrderPage = () => {
  const cart = useSelector((state) => state.cart);
  const {
    shippingAddress,
    paymentMethod,
    cardDetails,
    cartItems,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = cart;

  const [payment, setPayment] = useState(paymentMethod || '');
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    } else if (!payment) {
      navigate('/placeorder');
    }
    dispatch(savePaymentMethod(payment));
  }, [shippingAddress.address, navigate, payment]);

  const subTotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const arrival = new Date().getHours() + 1;

  const freeShipping = shippingPrice == 0 && 'FREE';

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(payment));
  };

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      }).unwrap();
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
    const timer = setTimeout(() => {
      dispatch(clearShippingAddress());
    }, 3000)
    return () => {
      clearTimeout(timer);
    };
  };
  return (
    <div className='order'>
      <h2>CHECKOUT</h2>
      <CheckoutSteps step1 step2 step3 />
      <div className='place-order'>
        <div className='place-order-info1'>
          <h3 id='arrival'>ESTIMATED ARRIVAL:&nbsp; &nbsp;&nbsp; &nbsp; {<Timer duration={60 * 60 * 1000} />}&nbsp; &nbsp;<span>if you place the order now</span></h3>
          <>
            
            </>
          <div className='order-summary'>
            {cartItems.map((item, index) => (
              <div key={index} className='order-dets'>
                <img src={item.thumbnail} alt={item.name} />
                <div className='place-order-description'>
                  <div className='description-wrapper'>
                    <h5>{item.name}</h5>
                    <p>{item.category}</p>
                    <br />
                    <p id='qty'>Quantity: {item.quantity}</p>
                  </div>
                  <br />
                  <div className='price-wrapper'>
                    <strong>
                      <p>${(item.price * item.quantity).toFixed(2)}</p>
                    </strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='order-pricing'>
            <div className='bill'>
              <h3>SUBTOTAL</h3>
              <h4>${subTotal.toFixed(2)}</h4>
            </div>
            <div className='bill'>
              <h3>SHIPPING COST</h3>
              {freeShipping === 'FREE' ? <h4>{freeShipping}</h4> : <h4>${shippingPrice}</h4>}
            </div>
            <div className='bill'>
              <h3>SALES TAX</h3>
              <h4>${taxPrice}</h4>
            </div>
          </div>
          <div className='bill bill-sum'>
            <h3>TOTAL</h3>
            <h4>${totalPrice}</h4>
          </div>
        </div>
        <div className='place-order-info2'>
          <div id='info'>
            <h3>1. SHIPPING & BILLING</h3>
            <Link to={'/shipping'}>
              <p>EDIT</p>
            </Link>
          </div>
          <div className='order-details'>
            <span>{shippingAddress.name},</span> {shippingAddress.address},{' '}
            {shippingAddress.city}, {shippingAddress.state}
            {shippingAddress.postCode}, {shippingAddress.country}.
          </div>
          <h3 id='info'>2. PAYMENT METHOD</h3>
          <div>
            <div className='payment-cards'>
              <div id='payment-form'>
                <div className='cards'>
                  <FaCcDiscover />
                  <FaCcVisa />
                  <FaCcMastercard />
                </div>
                <div className='form-cntrl'>
                  <label htmlFor='paymentMethod'>PayPal</label>
                  <input
                    type='radio'
                    name='payment'
                    value='PayPal'
                    id='paymentMethod'
                    checked={payment === 'PayPal'}
                    onChange={(e) => setPayment(e.target.value)}
                  />
                </div>
                <div className='form-cntrl'>
                  <label htmlFor='paymentMethod'>Credit Card</label>
                  <input
                    type='radio'
                    name='payment'
                    value='CreditCard'
                    id='paymentMethod'
                    checked={payment === 'CreditCard'}
                    onChange={(e) => setPayment(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {payment === 'CreditCard' && (
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
                </form>
              </div>
            )}
            <button
              type='button'
              onClick={placeOrderHandler}
              disabled={cartItems.length === 0}
              className='confirm-order btn-straight'
            >
              CONTINUE TO PAYMENT
            </button>
            <small>
              By continuing, I confirm that I have read and accepted the &nbsp;
              <Link to={'/terms'}>Terms and Conditions</Link> and the &nbsp;
              <Link to={'/privacy'}>Privacy Policy</Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
