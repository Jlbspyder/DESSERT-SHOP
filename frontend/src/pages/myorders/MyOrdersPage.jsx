import React from 'react'
import './myorders.css'
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMyOrdersQuery } from '../../slices/ordersApiSlice';
import Spinner from "../../components/Spinner";

const MyOrdersPage = () => {
  const dispatch = useDispatch();

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();


  return (
    <div className='my-details'>
      { isLoading ? (<Spinner />) : (
        <>
         <Link to='/profile'>
          <IoIosArrowBack className='back' />
        </Link>
        <h2>MY ORDERS</h2>
        {orders?.length === 0 ? (<span>You haven't placed any order</span>) : (<>
          <table id='crt'>
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
            <tbody>
              {orders?.map((order) => (
                <tr key={order._id}>
                  <td>
                   <span className='cell-header'>ID:</span> {order._id}
                  </td>
                  <td>
                    <span className='cell-header'>DATE:</span> {order.createdAt.substring(0, 10)}
                  </td>
                  <td>
                  <span className='cell-header'>TOTAL:</span> {order.totalPrice}
                  </td>
                  <td>
                  <span className='cell-header'>PAID:</span> {order.paid ? (order.paidAt.substring(0, 10)) : (<FaTimes style={{color: 'red'}} />)}
                  </td>
                  <td>
                  <span className='cell-header'>DELIVERED:</span> {order.delivered ? (order.deliveredAt.substring(0, 10)) : (<FaTimes style={{color: 'red'}} />)}
                  </td>
                  <td>
                    <div className="menu-buttons">
                      <Link to={`/order/${order._id}`}>
                        <button className='confirm-order btn-straight check-details'>DETAILS</button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>)}

         
        </>
      )}
    </div>
  )
}

export default MyOrdersPage;
