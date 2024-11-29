import React from 'react'
import { useSelector } from 'react-redux';

const CartProductConfirm = ({id, quantity}) => {

    
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  

  const getItemData = (id) => {
    let itemData = cartItems.find(item => item._id === id);
    if (itemData === undefined) {
       return 
    }
    return itemData
  }
  const itemQuantity = getItemData(id);



  return (
    <>
    <div className='basket-item'>
      {
        <img
          src={itemQuantity?.thumbnail}
          className='thumb-pix'
          alt='order-img'
        />
      }
      <div className='basket-confirm-set'>
        <div id="abbrv-name">
          {<p>{itemQuantity?.name}...</p>}
        </div>
        <div id="fullname">
          <p>{itemQuantity?.name}</p>
        </div>
        <h5>
          {quantity}x
          <span>
            &nbsp; &nbsp;@${itemQuantity?.price.toFixed(2)}
          </span>
        </h5>
      </div>
    </div>
    <>
      <div className='item-price'>
        ${Number.parseFloat(itemQuantity?.price * quantity).toFixed(2)}
      </div>
    </>
  </>
  )
}

export default CartProductConfirm
