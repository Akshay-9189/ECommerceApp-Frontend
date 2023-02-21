import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increaseProductQuantityInCart, reduceProductQuantity, removeAll, removeCartItem } from '../../redux/slice/cartSlice'
import Coupon from './Coupon'
import Summary from './Summary'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { BiErrorAlt } from 'react-icons/bi'
import { VscClearAll } from 'react-icons/vsc'
import { TbCurrencyRupee } from 'react-icons/tb'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

function ShoppingCart() {

    const cart = useSelector(state => state.cartData.shoppingCart.cartItems)
    const shopCart = useSelector(state => state.cartData.shoppingCart)
    const { products } = useSelector(state => state.categoryData)
    const dispatch = useDispatch()

    const clearAllProducts = () => {
        const ids = cart.map(id => id.cartItemsId)
        dispatch(removeAll({ shoppingCartId: shopCart.shoppingCartId, cartIds: ids }))
            .then(unwrapResult)
            .then(() => toast.success('All Items Are Removed From Cart'))
            .catch(error => toast.error(error.message))
    }

    // Product Info
    const getProductInfo = (productId, name) => {
        const product = products.find(prod => prod.productId === productId)

        switch (name) {
            case 'url':
                return product.imageURL

            case 'name':
                return product.productName

            case 'description':
                return product.productDescription

            case 'weight':
                return product.productWeight

            case 'price':
                return product.productPrice

            default:
                return null
        }
    }

    const removeProductFromCart = (cartItemsId) => {
        dispatch(removeCartItem({ shoppingCartId: shopCart.shoppingCartId, cartItemsId: cartItemsId }))
            .then(unwrapResult)
            .then(() => toast.success('Product Remove From Cart Successfully'))
            .catch(error => toast.error(error.message))
    }

    const increaseProductQuantityinCart = (productId) => {
        dispatch(increaseProductQuantityInCart({ shoppingCartId: shopCart.shoppingCartId, productId: productId }))
            .then(unwrapResult)
            .catch(error => toast.error(error.message))
    }

    const decreaseProductQuantityinCart = (cartItemsId) => {
        dispatch(reduceProductQuantity({ shoppingCartId: shopCart.shoppingCartId, cartItemsId: cartItemsId }))
            .then(unwrapResult)
            .catch(error => toast.error(error.message))
    }

    // style = {{maxWidth: "200px", maxHeight: "200px" }}
    //col-lg-9
    return (
        <div className="container-fluid">
            {/* <div className="row"> */}
            {
                shopCart.cartItems.length === 0 ? (
                    <div className='container'>
                        <div className="card col-10 mx-auto" style={{ height: "300px" }}>
                            <div className="card-body" style={{ backgroundColor: "lightskyblue" }}>
                                <div className='d-flex justify-content-center'>
                                    <span className='display-4'><BiErrorAlt />  Cart is Empty !!</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    // <div className="col-md-10 col-12 mx-auto ">
                    <div className="row mt-2 gx-3 ">
                        <div className="col-md-12 col-lg-8 col-12 mb-lg-0  mb-sm-4 shadow-lg card p-4" style={{ backgroundColor: "rgb(241, 168, 229)" }}>
                            <div className='d-flex flex-wrap  justify-content-between align-items-center py-2'>
                                <h2 className=" font-weight-bold">Cart ({cart.length} Products)</h2>
                                <button className='btn btn-sm btn-danger ' onClick={() => clearAllProducts()}><VscClearAll />  Clear Cart</button>
                            </div>
                            <hr />
                            {
                                cart && cart.map(crt => (
                                    <div key={crt.productId}>
                                        <div className="row">
                                            <div className="col-md-5 col-12 bg-light d-flex justify-content-center shadow ">
                                                <img src={getProductInfo(crt.productId, 'url')} className="img-fluid" alt="product" style={{ minWidth: "260px", maxHeight: "200px" }} />
                                            </div>
                                            <div className="col-md-7 col-12 mx-auto px-4 mt-2">
                                                <div className="row">
                                                    <div className="col-6 ">
                                                        <h1 className="mb-4" style={{ color: "black", fontSize: "1.4rem", textTransform: "capitalize", fontWeight: "500" }}>
                                                            {getProductInfo(crt.productId, 'name')}
                                                        </h1>
                                                        <small>
                                                            <p className="text-muted mb-2">{getProductInfo(crt.productId, 'description')}</p>
                                                            <p className="text-muted mb-2 mb-2">{getProductInfo(crt.productId, 'weight')} Kg</p>
                                                        </small>
                                                    </div>
                                                    <div className="col-6 gx-1">
                                                        <ul className="pagination justify-content-end " style={{ position: "relative" }}>
                                                            <li className="page-item">
                                                                <button className="btn btn-success page-link  btn-sm "
                                                                    onClick={() => increaseProductQuantityinCart(crt.productId)}>
                                                                    <AiOutlinePlus />
                                                                </button>
                                                            </li>
                                                            <li className="page-item">
                                                                <input type="text" className='page-link' name="productSelectedQuantity"
                                                                    value={crt.productSelectedQuantity} onChange={() => crt.productSelectedQuantity} disabled
                                                                />
                                                            </li>
                                                            <li className="page-item">
                                                                <button className="btn btn-danger page-link  btn-sm "
                                                                    onClick={() => decreaseProductQuantityinCart(crt.cartItemsId)}>
                                                                    <AiOutlineMinus />
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-7 d-flex justify-content-start gap-4">
                                                        <p>
                                                            <button className="btn btn-danger btn-sm "
                                                                onClick={() => removeProductFromCart(crt.cartItemsId)} >
                                                                <RiDeleteBin6Line />
                                                            </button>
                                                        </p>
                                                        <p>Price- <TbCurrencyRupee />{getProductInfo(crt.productId, 'price')}</p>
                                                    </div>
                                                    <div className="col-5 d-flex justify-content-end" style={{ fontSize: "1rem", fontWeight: 600 }}>
                                                        <h3><TbCurrencyRupee />{crt.totalPrice}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                    </div>
                                ))
                            }
                        </div>
                        <div className="col-md-12 col-lg-4 col-12 mx-auto mt-lg-0 mt-3 mt-md-2">
                            <Summary />
                            <Coupon shopCartId={shopCart.shoppingCartId} />
                        </div>
                    </div>
                    // </div>
                )
            }
            {/* </div> */}
        </div>
    )
}
export default ShoppingCart