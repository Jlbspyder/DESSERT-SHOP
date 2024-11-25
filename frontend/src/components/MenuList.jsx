import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BiPlusCircle } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { BiMinusCircle } from 'react-icons/bi';
import { useGetMenuDetailsQuery } from '../slices/menuApiSlice';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import Rating from '../components/Rating';

const MenuList = ({
  _id,
  name,
  category,
  price,
  rating,
  numReviews,
  tabletImg,
  mobileImg,
  desktopImg,
}) => {
  const [quan, setQuan] = useState(0);
  

  const dispatch = useDispatch();
  const pageNumber = useParams();

  const { data, refetch } = useGetMenuDetailsQuery(_id, {pageNumber});


  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;


  const getProductQuantity = (id) => {
    const quantity = cartItems.find((item) => item._id === id)?.quantity;
    if (quantity === undefined) {
      return 0;
    }
    return quantity;
  };
  const itemQuantity = getProductQuantity(_id);


  const increment = () => {
    setQuan((prev) => prev + 1);
  };

  const decrement = () => {
    setQuan((prev) => prev - 1);
  };

  const addToCartHandler = async (menu) => {
    increment();
    dispatch(addToCart(menu));
  };
  const removeFromCartHandler = async (menu) => {
    decrement();
    dispatch(removeFromCart(menu));
  };

  return (
    <div className='menu-card'>
      <Link to={`/menu/${_id}`}>
        <div className='pix-container'>
          <picture>
            <source media='(min-width: 800px)' srcSet={tabletImg} />
            <source media='(max-width: 800px)' srcSet={mobileImg} />
            <img
              src={desktopImg}
              alt='menu'
              className={itemQuantity >= 1 ? 'menu-image active' : 'menu-image'}
            />
          </picture>
        </div>
      </Link>
      {itemQuantity >= 1 ? (
        <div className='button active'>
          <div>
            <BiMinusCircle
              className='sign'
              onClick={() => removeFromCartHandler(data)}
            />
          </div>
          <h5>{itemQuantity}</h5>
          <div>
            <BiPlusCircle
              className='sign'
              onClick={() => addToCartHandler(data)}
            />
          </div>
        </div>
      ) : (
        <div className='button' onClick={() => addToCartHandler(data)}>
          <img
            src='/images/icon-add-to-cart.svg'
            alt=''
            className='cart-icon'
          />
          <h6>Add to Cart</h6>
        </div>
      )}
      <div className='description'>
        <p>{category}</p>
        <h6>{name}</h6>
        <Rating className='rate' value={rating} text={`${numReviews} reviews`} />
        <p>
          <span>${price.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};

export default MenuList;
