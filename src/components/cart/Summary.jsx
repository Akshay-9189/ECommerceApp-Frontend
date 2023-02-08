import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteCouponFromCart } from '../../redux/slice/cartSlice'
import { createOrder } from '../../redux/slice/orderSlice'
import { reduceTotalQuantity } from '../../redux/slice/categorySlice'
import { TbCurrencyRupee } from 'react-icons/tb'
import { RiSecurePaymentLine } from 'react-icons/ri'
import { MdDeleteForever, MdKeyboardBackspace } from 'react-icons/md'

function Summary() {
    const cart = useSelector(state => state.cartData.shoppingCart.cartItems)
    const shopCart = useSelector(state => state.cartData.shoppingCart)
    const dispatch = useDispatch()

    const acceptOrder = () => {
        dispatch(createOrder({ userId: shopCart.userId }))
        cart.map(cart => ({ productId: cart.productId, productSelectedQuantity: cart.productSelectedQuantity }))
            .forEach(prod => {
                dispatch(reduceTotalQuantity({ productId: prod.productId, productSelectedQuantity: prod.productSelectedQuantity }))
            });
    }

    return (
        <div className="p-3 shadow-lg " style={{ backgroundColor: "lavender" }}>
            <h2 className="mb-4">Summary</h2>
            <hr />
            <div className="d-flex justify-content-between">
                <p>Total Items</p>
                <p><span >{cart.map(item => item.productSelectedQuantity).reduce((a, b) => a + b)}</span></p>
            </div>
            <div className="d-flex justify-content-between">
                <p>Total Amount</p>
                <p><span >{shopCart.grandTotalBeforeDiscount}</span></p>
            </div>
            {
                shopCart.coupon !== null ? (
                    <>
                        <div className="d-flex justify-content-between">
                            <p>Coupon</p>
                            <p>{shopCart.coupon !== null ? shopCart.coupon.couponName : null}</p>
                        </div>
                        <div className='d-flex justify-content-center mb-2'>
                            <button className='btn btn-sm btn-outline-danger py-0' onClick={() => dispatch(deleteCouponFromCart({ shoppingCartId: shopCart.shoppingCartId }))}>
                                <MdDeleteForever /> Remove Coupon
                            </button>
                        </div>
                    </>
                ) : (<></>)
            }
            <div className="d-flex justify-content-between">
                <p>Shipping Charge</p>
                <p><span >Free</span></p>
            </div>
            <hr />
            <div className="d-flex justify-content-between font-weight-bold pb-2">
                <p className='col-8'>The total amount</p>
                <div>
                    {
                        shopCart.savedAmount === 0 ? (
                            <span>
                                <strong style={{ fontSize: "1.2rem" }}><TbCurrencyRupee />{shopCart.grandTotalBeforeDiscount}</strong>
                            </span>
                        ) : (
                            <span>
                                <strong style={{ fontSize: "1.2rem" }}>
                                    <p className='list-group '>
                                        <span className='pb-1'><s><TbCurrencyRupee />{shopCart.grandTotalBeforeDiscount}</s></span>
                                        <span ><TbCurrencyRupee />{shopCart.grandTotalAfterDiscount}</span>
                                    </p>
                                </strong>
                            </span>
                        )
                    }
                </div>
            </div>
            <br />
            {
                shopCart.savedAmount !== 0 ? (
                    <div className="d-flex justify-content-between  border border-start-0 border-end-0  pt-2 border-success align-self-center">
                        <p>You Saves</p>
                        <p><span><TbCurrencyRupee />{shopCart.savedAmount}</span></p>
                    </div>
                ) : (
                    <></>
                )
            }
            <div className='d-flex flex-wrap  justify-content-between align-items-center mt-4 justify-content-lg-center gap-lg-2 mx-lg-auto'>
                <Link to={"/"} className="btn  btn-default md-btn-flat col-lg-12" style={{ backgroundColor: "lightgrey" }}><MdKeyboardBackspace />  Back to shopping</Link>
                <Link to={`/cart/${shopCart.shoppingCartId}/checkout`} onClick={() => acceptOrder()} className="btn  btn-primary col-lg-12 text-uppercase"><RiSecurePaymentLine />  CheckOut</Link>
            </div>
        </div>
    )
}
export default Summary