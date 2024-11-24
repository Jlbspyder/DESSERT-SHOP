import { IoCloseCircleOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart } from '../slices/cartSlice';

const CartSummary = ({item, quantity, name, price, thumbnail  }) => {
  
  const cart = useSelector((state) => state.cart)

  const dispatch = useDispatch()

  const deleteCartHandler = async (item) => { 
    dispatch(deleteCart(item))
  }

  return (
    <>
      <div className='basket-item'>
        <img
          src={thumbnail}
          className='thumb-pix'
          alt='order-img'
        />
        <div className='basket-confirm-set'>
          <p>{name}</p>
          <h5>
            {quantity}x
            <span>
              &nbsp; &nbsp;@${price} &nbsp; &nbsp; $
              {Number.parseFloat(price * quantity).toFixed(2)}
            </span>
          </h5>
        </div>
      </div>
      <>
        <div className='item-price'>
          ${Number.parseFloat(price * quantity)}
        </div>
        <IoCloseCircleOutline
          className='delete-item'
          onClick={() => deleteCartHandler(item)}
        />
      </>
    </>
  );
};

export default CartSummary;
