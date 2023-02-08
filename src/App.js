import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/public/Footer';
import Home from './components/public/Home';
import NotFound from './components/public/NotFound';
import Navbar from './components/public/Navbar';
import PrivateRoute from './components/public/PrivateRoute';
import ViewProduct from './components/product/ViewProduct';
import ListProduct from './components/product/ListProduct';
import SaveOrUpdateProduct from './components/product/SaveOrUpdateProduct';
import ListUser from './components/user/ListUser';
import SignUpOrUpdateUser from './components/user/SignUpOrUpdateUser';
import GetUser from './components/user/GetUser';
import SignIn from './components/user/SignIn';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import ShoppingCart from './components/cart/ShoppingCart';
import Success from './components/cart/Success';
import AddOrUpdateCoupon from './components/cart/AddOrUpdateCoupon'
import ListCoupon from './components/cart/ListCoupon'
import Dashboard from './components/admin/Dashboard';
import ListOrder from './components/order/ListOrder';
import ListCategory from './components/categories/ListCategory';
import ListSubCategory from './components/categories/ListSubCategory';
import MyWishList from './components/wishlist/MyWishList';
import UpdateUserProfile from './components/user/UpdateUserProfile';
import GetUserProfile from './components/user/GetUserProfile';

function App() {

  const [logIn, setLogIn] = useState(false)
  const { login } = useSelector(state => state.publicData)

  useEffect(() => {
    if (login !== false)
      setLogIn(true)
    else if (login === false)
      setLogIn(false)
  }, [login])

  return (
    <div style={{ backgroundColor: '#c9b9f0' }}>
      <ToastContainer
        position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored"
      />
      <Navbar />

      <div className='container my-5' >
        <Routes>

          {/* Public Route */}
          <Route exact path="/" element={<Home />} />
          <Route exact path='signup' element={<SignUpOrUpdateUser />} />
          <Route exact path='signin' element={<SignIn />} />

          {/* <Route exact path="/admin" element={<Home />} /> */}

          {/* Private Route */}
          <Route element={<PrivateRoute islogIn={logIn} />}>

            <Route exact path="/*" element={<NotFound />} />

            {/* Cart Route */}
            <Route path='cart/:shoppingCartId' element={<ShoppingCart />} />
            <Route path='cart/:shoppingCartId/checkout' element={<Success />} />

            {/* WishList Route */}
            <Route path='wishlist/:wishListId' element={<MyWishList />} />

            <Route path=':userId' element={< GetUserProfile />} />
            <Route path='update/:userId' element={<UpdateUserProfile />} />

            {/* Admin Route */}
            <Route exact path="/admin" element={<Home />} />

            {/* Dashboard */}
            <Route path='/admin/dashboard' element={<Dashboard />} />

            {/* Product Route */}
            <Route exact path="admin/dashboard/product" element={<ListProduct />} />
            <Route exact path="admin/dashboard/product/add" element={<SaveOrUpdateProduct />} />
            <Route exact path="admin/dashboard/product/update/:productId" element={<SaveOrUpdateProduct />} />
            <Route exact path="admin/dashboard/product/:productId" element={<ViewProduct />} />

            {/* User Route */}
            <Route path='admin/dashboard/user' element={<ListUser />} />
            <Route path='admin/dashboard/user/:userId' element={<GetUser />} />
            <Route path='admin/dashboard/user/updateUser/:userId' element={<SignUpOrUpdateUser />} />
            {/* <Route path='admin/dashboard/user/profile' element={<UserProfile />} /> */}

            {/* Coupon Route */}
            <Route path='admin/dashboard/coupon' element={<ListCoupon />} />
            <Route path='admin/dashboard/coupon/add' element={<AddOrUpdateCoupon />} />
            <Route path='admin/dashboard/coupon/:couponId' element={<AddOrUpdateCoupon />} />

            {/* Orders */}
            <Route path='/admin/dashboard/orders' element={<ListOrder />} />
            <Route path='admin/dashboard/orders/:userId' element={<GetUser />} />

            {/* Category */}
            <Route path='/admin/dashboard/category' element={<ListCategory />} />
            <Route path='/admin/dashboard/category/:categoryId' element={<ListCategory />} />

            {/* Sub Category */}
            <Route path='/admin/dashboard/subcategory' element={<ListSubCategory />} />
            <Route path='/admin/dashboard/subcategory/:subCategoryId' element={<ListSubCategory />} />

          </Route>

        </Routes>
      </div>

      <Footer />
    </div>
  );
}
export default App;
