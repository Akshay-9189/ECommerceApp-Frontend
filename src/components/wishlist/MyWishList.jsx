import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TbCurrencyRupee } from 'react-icons/tb'
import { Link, useNavigate } from 'react-router-dom'
import { addToCart, removeCartItem } from '../../redux/slice/cartSlice'
import { clearWishList, removeProductFromWishList } from '../../redux/slice/wishlistSlice'
import { toast } from 'react-toastify'
import { BsCartPlus, BsCartX } from 'react-icons/bs'
import { RiDeleteBinLine } from 'react-icons/ri'
import { VscClearAll } from 'react-icons/vsc'
import { IoArrowBack } from 'react-icons/io5'
import { unwrapResult } from '@reduxjs/toolkit'

function MyWishList() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cartData.shoppingCart)
    const user = useSelector(state => state.publicData.login)
    const { wishlist } = useSelector(state => state.wishlistData)

    const addProductToCart = (productId) => {
        if (user === true) {
            dispatch(addToCart({ shoppingCartId: cart.shoppingCartId, productId: productId }))
                .then(unwrapResult)
                .then(() => toast.success(` Product Added To Cart Successfully`))
                .catch(error => toast.error(error.message))
        } else {
            toast.warning("Please Log In !!!!!")
            navigate('/signin')
        }
    }

    const removeProductFromCart = (productId) => {
        const obj = cart.cartItems.find(c => c.productId === productId)
        dispatch(removeCartItem({ shoppingCartId: cart.shoppingCartId, cartItemsId: obj.cartItemsId }))
            .then(unwrapResult)
            .catch(error => toast.error(error.message))
    }

    const removeFromWishList = (productId) => {
        const addorRemoveProductDTO = { wishListId: wishlist.wishListId, productId }
        dispatch(removeProductFromWishList({ addorRemoveProductDTO }))
            .then(unwrapResult)
            .then(() => toast.success('Product Removed From Wishlist'))
            .catch(error => toast.error(error.message))
    }

    const removeAllProductsFromWishlist = () => {
        const ids = wishlist.productList.map(obj => obj.productId)
        dispatch(clearWishList({ wishListId: wishlist.wishListId, productIds: ids }))
            .then(unwrapResult)
            .then(() => toast.success("All Products Removed From Wishlist"))
            .catch(error => toast.error(error.message))
    }

    return (
        <div class="card shadow-lg" style={{ backgroundColor: '#fce3a7' }}>
            <div className='d-flex mt-3'>
                <h4 class="card-title mx-auto mb-0 mt-1">Wishlist ({wishlist.productList.length} Products)</h4>
                {
                    wishlist.productList.length !== 0 ? (
                        <button className='btn btn-danger me-3' onClick={() => removeAllProductsFromWishlist()}><VscClearAll /> Remove All</button>
                    ) : (<></>)
                }
            </div>
            <hr />
            <div class="card-body">
                <div className="row row-cols-1 row-cols-md-2  row-cols-lg-3 row-cols-xl-4 g-4">
                    {
                        wishlist.productList.length !== 0 ? (
                            wishlist.productList && wishlist.productList.map(prod => (
                                <div key={prod.productId}>
                                    <div className="col">
                                        <div className="card shadow h-100">
                                            <img className="card-img-top p-2 " src={prod.imageURL} alt={prod.imageURL} height={'240'} width={'140'} />
                                            <div className="card-body">
                                                <div className="card-body p-2 " >
                                                    <h5 className="card-title">{prod.productName}</h5>
                                                    <p className="card-text"><TbCurrencyRupee /> {prod.productPrice}</p>
                                                    <div className='d-grid gap-2 d-md-flex  justify-content-center col-md-10 col-sm-12  mx-auto'>
                                                        {
                                                            cart.cartItems.find(pro => pro.productId === prod.productId) ? (
                                                                <button className='btn btn-danger col-md-9 col-12'
                                                                    onClick={() => removeProductFromCart(prod.productId)}><BsCartX />
                                                                </button>
                                                            ) : (
                                                                <button disabled={prod.productTotalQuantityAvailable === 0} className='btn btn-success col-md-9 col-12'
                                                                    onClick={() => addProductToCart(prod.productId)}><BsCartPlus />
                                                                </button>
                                                            )
                                                        }
                                                        {
                                                            wishlist.productList.find(({ productId }) => productId === prod.productId) ? (
                                                                <button className='btn col-md-3 col-12 btn-danger'
                                                                    onClick={() => removeFromWishList(prod.productId)} ><RiDeleteBinLine />
                                                                </button>
                                                            ) : (<></>)
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))) : (
                            <div className='mx-auto'>
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Wish List Is Empty</h4>
                                        <p>Add Some Products</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <br />
            <Link to={'/'} className='btn btn-danger col-2 mx-auto'><IoArrowBack /> Back</Link>
            <br />
        </div>
    )
}
export default MyWishList