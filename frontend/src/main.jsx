import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Provider } from 'react-redux';
import store from './store.js';
import App from './App.jsx';
import './index.css';
import { HelmetProvider} from 'react-helmet-async'
import PrivateRoute from './components/PrivateRoute.jsx';
import HomePage from './pages/home/HomePage.jsx';
import MenuPage from './pages/menu/MenuPage.jsx';
import ResturantPage from './pages/resturantpage/ResturantPage.jsx';
import Offers from './pages/offer/Offers.jsx';
import Careers from './pages/careers/Careers.jsx';
import ItemPage from './pages/itempage/ItemPage.jsx';
import AboutPage from './pages/aboutpage/AboutPage.jsx';
import Allergens from './pages/allergens/Allergens.jsx';
import FoodQuality from './pages/foodquality/FoodQuality.jsx';
import ResponsibilityPage from './pages/responsibility/ResponsibilityPage.jsx';
import ReachOut from './pages/reachout/ReachOut.jsx';
import Terms from './pages/terms/Terms.jsx';
import PrivacyPage from './pages/privacy/Privacy.jsx';
import Cart from './pages/cart/Cart.jsx';
import RegisterPage from './pages/register/RegisterPage.jsx';
import LogIn from './pages/LoginPage.jsx';
import ProfilePage from './pages/profile/ProfilePage.jsx';
import ShippingPage from './pages/shipping/ShippingPage.jsx';
import PlaceOrderPage from './pages/placeorder/PlaceOrderPage.jsx';
import OrderSummary from './pages/summary/OrderSummary.jsx';
import ChangePassword from './pages/details/ChangePassword.jsx';
import MyOrdersPage from './pages/myorders/MyOrdersPage.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import OrderListPage from './pages/admin/orderlist/OrderListPage.jsx';
import MenuListPage from './pages/admin/menulist/MenuListPage.jsx';
import MenuEditPage from './pages/admin/menuedit/MenuEditPage.jsx';
import UserListPage from './pages/admin/userlist/UserListPage.jsx';
import UserEditPage from './pages/admin/useredit/UserEditPage.jsx';
import MyDetailsPage from './pages/mydetails/MyDetailsPage.jsx';
import AddressBook from './pages/address/AddressBook.jsx';
import ContactPage from './pages/contact/ContactPage.jsx';
import AddAddressPage from './components/AddAddressPage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomePage />} />
      <Route path='/menu' element={<MenuPage />} />
      <Route path='/menu/search/:keyword' element={<MenuPage />} />
      <Route path='/menu/page/:pageNumber' element={<MenuPage />} />
      <Route path='/menu/search/:keyword/page/:pageNumber' element={<MenuPage />} />
      <Route path='/menu/:id' element={<ItemPage />} />
      <Route path='/resturant' element={<ResturantPage />} />
      <Route path='/resturant/search/:keyword' element={<ResturantPage />} />
      <Route path='/resturant/page/:pageNumber' element={<ResturantPage />} />
      <Route path='/resturant/search/:keyword' element={<ResturantPage />} />
      <Route path='/resturant/search/:keyword/page/:pageNumber' element={<ResturantPage />} />
      <Route path='/info' element={<Allergens />} />
      <Route path='/quality' element={<FoodQuality />} />
      <Route path='/responsibility' element={<ResponsibilityPage />} />
      <Route path='/outreach' element={<ReachOut />} />
      <Route path='/offers' element={<Offers />} />
      <Route path='/careers' element={<Careers />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/terms' element={<Terms />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/login' element={<LogIn />} />
      <Route path='/privacy' element={<PrivacyPage />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippingPage />} />
        <Route path='/password' element={<ChangePassword />} />
        <Route path='/placeorder' element={<PlaceOrderPage />} />
        <Route path='/order/:id' element={<OrderSummary />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/myorders' element={<MyOrdersPage />} />
        <Route path='/mydetails' element={<MyDetailsPage />} />
        <Route path='/address' element={<AddressBook /> } />
        <Route path='/contact' element={<ContactPage /> } />
        <Route path='/addaddress' element={<AddAddressPage /> } />
      </Route>

      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/orderlist' element={<OrderListPage />} />
        <Route path='/admin/orderlist/:pageNumber' element={<OrderListPage />} />
        <Route path='/admin/menulist' element={<MenuListPage />} />
        <Route path='/admin/menulist/:pageNumber' element={<MenuListPage />} />
        <Route path='/admin/userlist' element={<UserListPage />} />
        <Route path='/admin/menu/:id/edit' element={<MenuEditPage />} />
        <Route path='/admin/user/:id/edit' element={<UserEditPage />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
    </HelmetProvider>
  </StrictMode>
);
