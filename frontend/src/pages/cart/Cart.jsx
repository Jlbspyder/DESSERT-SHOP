import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetMenuQuery } from '../../slices/menuApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import CartItem from '../../components/cartItem/CartItem';
import './cart.css';

const Cart = () => {
  const { keyword } = useParams();
  const { data, isLoading, error } = useGetMenuQuery({keyword});
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingPrice, totalPrice, taxPrice } = cart;

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping')
  }

  const subTotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)

  return (
    <div className='your-cart'>
      {cartItems.length !== 0 ? (
        <div className='cart-header products'>
          <h2>DESSERTS</h2>
          <h2 id='lead'>QUANTITY</h2>
          <h2>TOTAL</h2>
        </div>
      ) : (
        <div className='basket-empty'>
          <FaShoppingCart className='shop-cart' />
          <h1>Your Shopping Cart is Empty</h1>
        </div>
      )}
      <div className='cart-content products'>
        {cartItems.map((item) => (
          <CartItem key={item._id} id={item._id} {...item} item={item} />
        ))}
      </div>
      {cartItems.length !== 0 && (
        <div className='checkout'>
          <div className='promo coupon'>
            <div className='promocode'>
              <input type='text' placeholder='Enter a promo code' />
              <button>APPLY</button>
            </div>
          </div>
          <div className="bill bill-info">
            <h3>SUBTOTAL</h3>
            <h4>
              ${subTotal}
            </h4>
          </div>
          <div className="bill bill-info">
            <h3>ESTIMATED SHIPPING COSTS</h3>
            <h4>
            $0.00
            </h4>
          </div>
          <div className="bill bill-info">
            <h3>ESTIMATED TAXES</h3>
            <h4>
              $0.00
            </h4>
          </div>
          <div className="bill bill-info">
            <h3>ESTIMATED TOTAL</h3>
            <h4>
              ${(totalPrice - shippingPrice).toFixed(2)}
            </h4>
          </div>
          <p id='tax'>Taxes and shipping calculated at checkout</p>
        </div>
      )}
       {cartItems.length !== 0 ?<button className='confirm-order check-out' onClick={checkoutHandler}>CHECKOUT</button> : ''}
      {cartItems.length === 0 && <h2 id='featured'>Featured Desserts</h2>}
      {cartItems.length === 0 && <div className='feature'>
        {data?.menu.map((item) => (
           <Link key={item._id} to={`/menu/${item._id}`}>
           <div className='featured-menu'>
             <img src={item.img} alt='dessert' className='dessert-img' />
             <p>
               <span>{item.name}</span>
             </p>
             <p>${item.price.toFixed(2)}</p>
           </div>
         </Link>
        ))}
      </div>}
    </div>
  );
};

export default Cart;
