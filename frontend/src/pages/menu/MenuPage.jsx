import { useEffect, useState } from 'react';
import './menupage.css';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import MenuList from '../../components/MenuList';
import Meta from '../../components/Meta';
import { useSelector, useDispatch } from 'react-redux';
import PaginateMenu from '../../components/PaginateMenu';
import { useGetMenuQuery } from '../../slices/menuApiSlice';
import CartSummary from '../../components/CartSummary';
import { FaRegCheckCircle } from 'react-icons/fa';
import { clearCartItems } from '../../slices/cartSlice';
import CartProductConfirm from '../../components/CartProductConfirm';
import SearchBox from '../../components/SearchBox';

const MenuPage = () => {
  const { pageNumber, keyword } = useParams();
  const [confirmOrder, setConfirmOrder] = useState(false);

  const { data, isLoading, error } = useGetMenuQuery({ pageNumber, keyword});

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const totalItem = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const startNewOrder = () => {
    navigate('/menu')
    dispatch(clearCartItems())
    setConfirmOrder(false)
  }

  // useEffect(() => {
  //   setConfirmOrder(false)
  // },[confirmOrder])

  return (
    <div className='menu-list'>
      <Meta title='JLB24 | Desserts' />
      <div className="menu-flex">
        <h2>Desserts</h2>
        <div className='sm-search'><SearchBox /></div>
      </div>
      <div className='menu-wrapper'>
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <div>{error?.data?.message || error.error}</div>
        ) : (
          <div className='menu-image-container'>
            {data.menu.map((item) => (
              <MenuList key={item.name} menuItem={item} {...item} />
            ))}
          </div>
        )}
        <div className='cart'>
          <h2>Your Cart ({totalItem})</h2>
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <div key={item._id} className='basket'>
                  <CartSummary id={item._id} {...item} item={item} />
                </div>
              ))}
            </>
          ) : (
            <div className='empty'>
              <img
                src='/images/illustration-empty-cart.svg'
                alt='cart'
                className='empty-cart'
              />
              <p>Your added items will appear here</p>
            </div>
          )}
          {cartItems.length > 0 && (
            <div className='order-total'>
              <p>Order Total</p>
              <h1>${subTotal.toFixed(2)}</h1>
            </div>
          )}
          {cartItems.length > 0 && (
            <div className='carbon'>
              <img
                src='/images/icon-carbon-neutral.svg'
                alt=''
                className='carbon-img'
              />
              <p>
                This is a <span>carbon-neutral</span> delivery
              </p>
            </div>
          )}
          {confirmOrder && <div className='cart gig'>
          <div className='confirm'>
            <FaRegCheckCircle id='confirm' />
            <h1>Order Confirmed</h1>
            <p>We hope you enjoy your food!</p>
          </div>
          {cartItems.length >  0 ? (
            <div className='cart-container'>
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className={
                    !confirmOrder ? 'basket' : ' basket basket-notConfirm'
                  }
                >
                  <CartProductConfirm
                    id={item._id}
                    quantity={item.quantity}
                  />
                </div>
              ))}
              { (
                <div className='order-total total-confirm'>
                  <p>Order Total</p>
                  <h1>${subTotal}</h1>
                </div>
              )}
              <button onClick={startNewOrder} className='confirm-order'>
                Start New Order
              </button>
            </div>
          ) : (
          <>
            <div className='empty'>
              <img
                src='/images/illustration-empty-cart.svg'
                alt='cart'
                className='empty-cart'
              />
              <p>Your added items will appear here</p>
            </div>
          </>
          )}
        </div>}
          {cartItems.length > 0 && (
            <button onClick={() => navigate('/cart')} className='confirm-order'>
              Proceed to checkout
            </button>
          )}
        </div>
      </div>
      <PaginateMenu
        pages={data?.pages}
        page={data?.page}
        keyword={keyword ? keyword : ''}
      />
    </div>
  );
};

export default MenuPage;
