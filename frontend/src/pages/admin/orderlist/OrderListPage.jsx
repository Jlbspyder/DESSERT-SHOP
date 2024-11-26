import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaTimes, FaCheck } from 'react-icons/fa';
import Spinner from '../../../components/Spinner';
import PaginateOrder from '../../../components/PaginateOrder';
import { useGetOrdersQuery } from '../../../slices/ordersApiSlice';
import './orderlist.css';

const OrderListPage = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetOrdersQuery({ pageNumber });

  return (
    <div className='orderlist'>
      <h1>Orders</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody id='crt'>
            {data.orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <span className='cell-header'>ID:</span> {order._id}
                </td>
                <td>
                  <span className='cell-header'>DATE:</span>{' '}
                  {order.createdAt.substring(0, 10)}
                </td>
                <td>
                  <span className='cell-header'>TOTAL:</span>$
                  {order.totalPrice.toFixed(2)}
                </td>
                <td>
                  <span className='cell-header'>PAID:</span>
                  {order.paid ? (
                    <FaCheck style={{ color: 'hsl(159, 69%, 38%)' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <span className='cell-header'>DELIVERED:</span>
                  {order.delivered ? (
                    order.deliveredAt.substring(11, 16)
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <div className='menu-buttons'>
                    <Link to={`/order/${order._id}`}>
                      <button className='confirm-order btn-straight check-details'>
                        DETAILS
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <PaginateOrder pages={data?.pages} page={data?.page} isAdmin={true} />
    </div>
  );
};

export default OrderListPage;
