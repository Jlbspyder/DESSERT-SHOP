import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, deleteCart } from '../../slices/cartSlice';
import { BiPlusCircle } from 'react-icons/bi';
import { BiMinusCircle } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import './cartitem.css';

const CartItem = ({item, quan, thumbnail, name, price, _id }) => {
 
  const dispatch = useDispatch()


  const cart = useSelector((state) => state.cart)

  const [quantity, setQuantity] = useState(quan)

  const increment = () => {
    setQuantity((prev) => (prev + 1))
  }

  const decrement = () => {
    setQuantity((prev) => (prev - 1))
  }

  const addToCartHandler = (item) => { 
    increment()
    dispatch(addToCart(item))
  }

  const removeFromCartHandler = async (item) => { 
    decrement()
    dispatch(removeFromCart(item))
  }
  
  const deleteCartHandler = async (item) => { 
    dispatch(deleteCart(item))
  }


  return (
    <div className='cart-section'>
    <div className='cart-item'>
      <div className='cart-flex'>
        <div className='cart-image'>
          <div className='cart-pix'>
            <img src={thumbnail} alt={name} />
          </div>
          <div className='cart-info'>
            <p>${price.toFixed(2)}</p>
            <Link to={`/menu/${_id}`}><h4>{name}</h4></Link>
          </div>
        </div>
        <div className='button quantity'>
          <div>
            <BiMinusCircle
              className='sign decrement-btn'
              onClick={() => removeFromCartHandler(item)}
            />
          </div>
          <h5>{item.quantity}</h5>
          <div>
            <BiPlusCircle
              className='sign increment-btn'
              onClick={() => addToCartHandler(item)}
            />
          </div>
        </div>
        <RiDeleteBin6Line
          className='delete-cart'
          onClick={() => deleteCartHandler (item)}
        />
      </div>
      <div className='cart-total'>
        <h3>${Number.parseFloat(price * item.quantity).toFixed(2)}</h3>
      </div>
    </div>
  </div>
  )
}

export default CartItem
