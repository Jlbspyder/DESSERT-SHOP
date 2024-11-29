import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../components/Spinner';
import { toast } from 'react-toastify';
import { clearCartItems } from '../../slices/cartSlice';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import CheckoutSteps from '../../components/checkout/CheckoutSteps';
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} from '../../slices/ordersApiSlice';
import { useDeliveredOrderMutation } from '../../slices/ordersApiSlice';
import './ordersummary.css';

const OrderSummary = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliveredOrderMutation();

  const dispatch = useDispatch();

  const totalItem = order?.orderItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const itemPrice = order?.orderItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const [payForOrder, { isLoading: loadingPayment }] = usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);


  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      if (order && !order.paid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success('Order Delivered');
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        await payForOrder({ orderId, details }).unwrap();
        refetch();
        toast.success('Payment successful');
        dispatch(clearCartItems());
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  };

  // const onApproveTest = async () => {
  //   await payForOrder({ orderId, details: { payer: {} } });
  //   refetch();
  //   dispatch(clearCartItems());
  //   toast.success('Payment successful');
  // };

  const onError = (error) => {
    toast.error(error.message);
  };

  const createOrder = (data, actions) => {

    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className='your-cart summary_'>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className='confirm-page'>
        <div id='info'>
          {!order.paid ? <h3>ORDER SUMMARY</h3> : <h3>ORDER COMPLETE</h3>}
        </div>
        {order.paid && !order.delivered && !userInfo.isAdmin && (
          <p>
            Thank you <strong>{userInfo?.firstname}</strong> for your
            order! We are preparing your desserts. We hope you enjoy your meal.
            An email has been sent to <strong>{order?.user.email}</strong> with
            details of your order.
          </p>
        )}
        {order.paid && order.delivered && !userInfo.isAdmin &&  <p>
        Thank you <strong>{userInfo?.firstname.toUpperCase()}</strong> for your
        order! We hope you enjoyed your meal.
      </p>}
        {order.paid && (
          <div className='order-detail'>
            <div className='bill'>
              <p>ORDER DATE</p>
              <p>{order.createdAt}</p>
            </div>
            <div className='bill'>
              <p>ORDER NUMBER</p>
              <p>{order._id}</p>
            </div>
            <div className='bill'>
              <p>ORDER TOTAL</p>
              <p>
                ${order.totalPrice.toFixed(2)} ({totalItem}{' '}
                {totalItem > 1 ? 'items' : 'item'})
              </p>
            </div>
          </div>
        )}
        <div className='order-detail'>
          <h4>Payment Method</h4>
          <p>{order.paymentMethod}</p>
        </div>
        <div className='sumary'>
          {order.paid ? (
            <p id='paid'>Paid on {order.paidAt.substring(0, 10)}</p>
          ) : (
            <p id='not-paid'>Not Paid</p>
          )}
          {totalItem > 1 ? (
            <h5 className='items'>Order Items</h5>
          ) : (
            <h5 className='items'>Order Item</h5>
          )}
          {order.orderItems.map((item) => (
            <div key={item._id} className='confirm-page-summary'>
              <img src={item.thumbnail} alt='menu-img' className='menu-img' />
              <div className='sumary-info'>
                <div>
                  <h4>{item.name}</h4>
                  <p id='qty'>Quantity: {item.quantity}</p>
                  @{' '}<small>${item.price.toFixed(2)}</small>
                </div>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <br />
        {order.delivered ? (
          <p id='delivered'>
            Delivered at {order.deliveredAt.substring(11, 19)} GMT
          </p>
        ) : (
          <p id='not-delivered'>Not Delivered</p>
        )}
        <div id='info'>
          <h3>DELIVERY ADDRESS</h3>
        </div>
        <div className='order-details'>
          <span>{order.shippingAddress.name},</span>{' '}
          {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
          {order.shippingAddress.state},{' '}
          {order.shippingAddress.postalCode}, {order.shippingAddress.country}.
        </div>
        <div className='confirm-page'>
          {order.paid && <h3>ORDER SUMMARY</h3>}
          <div className='order-sumary'>
            <div>ITEMS</div>
            <div>${itemPrice.toFixed(2)}</div>
          </div>
          <div className='order-sumary'>
            <div>SHIPPING COST</div>
            <div>${order.shippingPrice.toFixed(2)}</div>
          </div>
          <div className='order-sumary'>
            <div>TOTAL BEFORE TAX</div>
            <div>${(order.totalPrice - order.taxPrice).toFixed(2)}</div>
          </div>
          <div className='order-sumary'>
            <div>ESTIMATED TAX COLLECTED</div>
            <div>${order.taxPrice.toFixed(2)}</div>
          </div>
          <br />
          <hr />
          <div className='order-sumary'>
            <h3>ORDER TOTAL</h3>
            <h3>${order.totalPrice.toFixed(2)}</h3>
          </div>
        </div>
        <div className='order-pay'>
          {!order.paid && (
            <div>
              {loadingPayment && <Spinner />}
              {isPending ? (
                <Spinner />
              ) : (
                <div>
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  ></PayPalButtons>
                </div>
              )}
            </div>
          )}
          {loadingDeliver && <Spinner />}
          {userInfo && userInfo.isAdmin && order.paid && !order.delivered && (
            <button
              type='button'
              className='confirm-order btn-straight'
              onClick={deliverOrderHandler}
            >
              MARK AS DELIVERED
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
