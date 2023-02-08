import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { createCart, logOutCart } from '../../redux/slice/cartSlice';
import { getAllUsers, logOutUser } from '../../redux/slice/userSlice';
import { checkUser, logOut } from '../../redux/slice/publicSlice';
import { getAllOrders, logOutOrder } from '../../redux/slice/orderSlice';
import { createNewWishList, logOutWishlist } from '../../redux/slice/wishlistSlice';
import { FaUserCircle, FaUserAlt } from "react-icons/fa";
import { GoSignIn, GoSignOut } from 'react-icons/go'
import { AiOutlineForm } from 'react-icons/ai'
import { FcShop } from 'react-icons/fc'
import { BsCart4 } from 'react-icons/bs'
import { RiDashboardLine } from 'react-icons/ri'

function Navbar() {

  const [logIn, setLogIn] = useState(false)
  const [user, setUser] = useState(false)
  const [admin, setAdmin] = useState(false)
  const navigate = useNavigate()
  const { login, jwtRequest } = useSelector(state => state.publicData)
  const cart = useSelector(state => state.cartData.shoppingCart)
  const { wishlist } = useSelector(state => state.wishlistData)
  const dispatch = useDispatch()

  useEffect(() => {
    if (login === true) {
      setLogIn(true)
      setUser(jwtRequest.userInfo.userFirstName)
      if (jwtRequest.userInfo.roles === "ADMIN") {
        setAdmin(true)
        dispatch(getAllUsers())
        dispatch(getAllOrders())
      }
    }
  }, [logIn, login, dispatch, jwtRequest.userInfo.roles, jwtRequest.userInfo.userFirstName])

  useEffect(() => {
    if (logIn && jwtRequest.userInfo.roles === "USER") {
      dispatch(createCart({ userId: jwtRequest.userInfo.userId }))
      dispatch(createNewWishList({ newWishlistDTO: { userId: jwtRequest.userInfo.userId } }))
    }
  }, [logIn, dispatch, jwtRequest.userInfo.userId, jwtRequest.userInfo.roles])

  useEffect(() => {
    dispatch(checkUser())
  }, [login, dispatch])

  const logout = () => {
    dispatch(logOut())
    setLogIn(false)
    setAdmin(false)
    setUser(false)
    dispatch(logOutUser())
    dispatch(logOutCart())
    dispatch(logOutOrder())
    dispatch(logOutWishlist())
    toast.success(`${jwtRequest.userInfo.userFirstName} logged out successfully`)
  }

  const getDefaultUrl = () => {
    jwtRequest.userInfo.roles === "ADMIN" ? navigate("/admin") : navigate("/")
  }

  return (
    <nav className="navbar navbar-expand-lg  sticky-top  px-5" style={{ backgroundColor: "#70ffc3", height: "60px" }}>
      <div className="container-fluid">
        <button onClick={() => getDefaultUrl()} className="btn navbar-brand"><FcShop />  Best Buy</button>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"
          aria-expanded="false" aria-label="Toggle navigation" >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* style={{ backgroundColor: "#70ffc3" }} */}
        <div className="offcanvas offcanvas-end " id='offcanvasNavbar' style={{ backgroundColor: "lightyellow" }}>
          <div className="offcanvas-header" >
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            {/* <hr className='mt-0' /> */}
            <ul className="navbar-nav me-auto  mb-lg-0">
              {
                logIn && admin ? (
                  <div className='d-md-flex flex-md-column flex-lg-row gap-2'>
                    <li className='nav-item'>
                      <Link to={"/admin/dashboard"} className="btn nav-link" style={{ color: "violet" }} ><RiDashboardLine />  Dashboard</Link>
                    </li>
                  </div>
                ) : (<></>)
              }
            </ul>
            <div className="d-flex">
              <ul className="navbar-nav  mb-lg-0">
                <div className='d-md-flex flex-md-column flex-lg-row gap-2 col-md-12'>
                  {
                    !logIn ? (
                      <li className='nav-item dropdown'>
                        <button className="btn  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <FaUserAlt />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end bg-light mt-2" >
                          <li> <Link to={"/signup"} className="dropdown-item" style={{ color: "red" }}><AiOutlineForm />  SigUp</Link></li>
                          <li><Link to={"/signin"} className="dropdown-item" style={{ color: "red" }}><GoSignIn />  SigIn</Link></li>
                        </ul>
                      </li>
                    ) : (
                      <>
                        <li className='nav-item dropdown'>
                          <button type="button" className="btn nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: "green" }}>
                            <FaUserCircle />  {user}
                          </button>
                          <ul className="dropdown-menu dropdown-menu-end">
                            <li><Link className="dropdown-item" to={`${jwtRequest.userInfo.userId}`}>View Profile</Link></li>
                            <li><Link className="dropdown-item" to={`update/${jwtRequest.userInfo.userId}`}>Update Profile</Link></li>
                          </ul>
                        </li>
                        {
                          !admin ? (
                            <>
                              <li className='nav-item '>
                                <Link className='btn nav-link position-relative' to={`cart/${cart.shoppingCartId}`} style={{ color: "black" }}><BsCart4 />  Cart
                                  {
                                    cart.cartItems.length !== 0 ? (
                                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">{cart.cartItems.length}</span>
                                    ) : (<></>)
                                  }
                                </Link>
                              </li>
                              <li className='nav-item'>
                                <Link className='btn nav-link position-relative' to={`wishlist/${wishlist.wishListId}`} style={{ color: '#f56ca5' }}>WishList
                                  {
                                    wishlist.productList.length !== 0 ? (
                                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" style={{ backgroundColor: '#f56ca5' }}>{wishlist.productList.length}</span>
                                    ) : (<></>)
                                  }
                                </Link>
                              </li>
                            </>
                          ) : (<></>)
                        }
                        <li className='nav-item'>
                          <Link onClick={() => logout()} className="btn nav-link" to={'/'} style={{ color: "red" }}><GoSignOut />  LogOut</Link>
                        </li>
                      </>
                    )
                  }
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div >
    </nav >
  )
}
export default Navbar