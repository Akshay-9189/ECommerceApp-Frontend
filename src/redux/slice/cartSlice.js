import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import CouponService from "../../services/CouponService"
import CartService from "../../services/CartService"

const initialStatee = {
    shoppingCart: {
        shoppingCartId: '',
        userId: '',
        cartItems: [{}],
        grandTotalBeforeDiscount: '',
        coupon: {},
        grandTotalAfterDiscount: '',
        savedAmount: ''
    },
    coupons: [{
        couponId: '',
        couponName: '',
        discount: '',
        description: ''
    }]
}


//***************************************************************************** SHOPPING CART ACTIONS ***********************************************************************

export const createCart = createAsyncThunk("Cart/CreateNewCart", async ({ userId }) => {
    const resp = await CartService.createShoppingCart(userId)
    return resp.data
})

export const addToCart = createAsyncThunk("Cart/AddToCart", async ({ shoppingCartId, productId }) => {
    const resp = await CartService.addProductToCart(shoppingCartId, productId)
    return { productId, cart: resp.data }
})

export const increaseProductQuantityInCart = createAsyncThunk("Cart/IncreaseProductQuantity", async ({ shoppingCartId, productId }) => {
    const resp = await CartService.increaseProductQuantityInCart(shoppingCartId, productId)
    return { productId, cart: resp.data }
})

export const removeCartItem = createAsyncThunk("Cart/RemoveCartItems", async ({ shoppingCartId, cartItemsId }) => {
    const resp = await CartService.removeCartItemFromCart(shoppingCartId, cartItemsId)
    return { cartItemsId, cart: resp.data }
})

export const reduceProductQuantity = createAsyncThunk("Cart/RemoveFromCart", async ({ shoppingCartId, cartItemsId }) => {
    const resp = await CartService.decreaseProductQuantity(shoppingCartId, cartItemsId)
    return { cartItemsId, cart: resp.data }
})

export const removeAll = createAsyncThunk("Cart/RemoveAll", async ({ shoppingCartId, cartIds }) => {
    const resp = await CartService.clearCart(shoppingCartId, cartIds)
    return resp.data
})

export const addCouponToCart = createAsyncThunk("Cart/AddCoupon", async ({ shoppingCartId, couponName }) => {
    const resp = await CartService.addCoupon(shoppingCartId, couponName)
    return resp.data
})

export const deleteCouponFromCart = createAsyncThunk("Cart/DeleteCoupon", async ({ shoppingCartId }) => {
    const resp = await CartService.deleteCoupon(shoppingCartId)
    return resp.data
})

//********************************************************************************* COUPON ACTIONS **************************************************************************

export const createCoupon = createAsyncThunk("Coupon/Create", async (coupon) => {
    const resp = await CouponService.createCoupon(coupon)
    return resp.data
})

export const getCoupon = createAsyncThunk("Coupon/Get", async ({ couponId }) => {
    const resp = await CouponService.getCoupon(couponId)
    return resp.data
})

export const updateCoupon = createAsyncThunk("Coupon/update", async ({ couponId, coupon }) => {
    const resp = await CouponService.updateCoupon(couponId, coupon)
    return resp.data
})

export const deleteCoupon = createAsyncThunk("Coupon/Delete", async ({ couponId }) => {
    await CouponService.deleteCoupon(couponId)
    return { couponId }
})

export const getAllCoupons = createAsyncThunk("Coupon/GetAll", async () => {
    const resp = await CouponService.getAllCoupons()
    return resp.data
})



//================================================================================= SLICE =================================================================================

const cartSlice = createSlice({
    name: "Cart",

    initialState: initialStatee,

    reducers: {
        logOutCart: () => initialStatee
    },

    extraReducers: {

        //------------------------------------------------------------------ SHOPPING CART SUCESS REQUEST ------------------------------------------------------------------

        [createCart.fulfilled]: (state, action) => {
            return { ...state, shoppingCart: action.payload }
        },

        [addToCart.fulfilled]: (state, action) => {
            const payload = action.payload
            const getProd = payload.cart.cartItems.find(({ productId }) => productId === payload.productId)
            return {
                ...state, shoppingCart: {
                    ...state.shoppingCart, grandTotalBeforeDiscount: payload.cart.grandTotalBeforeDiscount, grandTotalAfterDiscount: payload.cart.grandTotalAfterDiscount,
                    savedAmount: payload.cart.savedAmount, cartItems: [...state.shoppingCart.cartItems, getProd]
                }
            }
        },

        [increaseProductQuantityInCart.fulfilled]: (state, action) => {
            const payload = action.payload
            const getProd = payload.cart.cartItems.find(({ productId }) => productId === payload.productId)
            return {
                ...state, shoppingCart: {
                    ...state.shoppingCart, grandTotalBeforeDiscount: payload.cart.grandTotalBeforeDiscount, grandTotalAfterDiscount: payload.cart.grandTotalAfterDiscount,
                    savedAmount: payload.cart.savedAmount, cartItems: state.shoppingCart.cartItems.map(prod => prod.productId === payload.productId ?
                        { ...prod, productSelectedQuantity: getProd.productSelectedQuantity, totalPrice: getProd.totalPrice } : prod)
                }
            }
        },

        [removeCartItem.fulfilled]: (state, action) => {
            const payload = action.payload
            return {
                ...state, shoppingCart: {
                    ...state.shoppingCart, grandTotalBeforeDiscount: payload.cart.grandTotalBeforeDiscount, grandTotalAfterDiscount: payload.cart.grandTotalAfterDiscount,
                    savedAmount: payload.cart.savedAmount, cartItems: state.shoppingCart.cartItems.filter(({ cartItemsId }) => cartItemsId !== payload.cartItemsId)
                }
            }
        },

        [reduceProductQuantity.fulfilled]: (state, action) => {
            const payload = action.payload
            const getProd = payload.cart.cartItems.find(({ cartItemsId }) => cartItemsId === payload.cartItemsId)
            const check = payload.cart.cartItems.some(crt => crt.cartItemsId === payload.cartItemsId)
            return {
                ...state, shoppingCart: {
                    ...state.shoppingCart, grandTotalBeforeDiscount: payload.cart.grandTotalBeforeDiscount, grandTotalAfterDiscount: payload.cart.grandTotalAfterDiscount,
                    savedAmount: payload.cart.savedAmount, coupon: payload.cart.coupon,
                    cartItems: check ?
                        state.shoppingCart.cartItems.map(prod => prod.cartItemsId === payload.cartItemsId ?
                            { ...prod, productSelectedQuantity: getProd.productSelectedQuantity, totalPrice: getProd.totalPrice } : prod) :
                        state.shoppingCart.cartItems.filter(({ cartItemsId }) => cartItemsId !== payload.cartItemsId)
                }
            }
        },

        [removeAll.fulfilled]: (state, action) => {
            const payload = action.payload
            return {
                ...state, shoppingCart: {
                    ...state.shoppingCart, cartItems: payload.cartItems, grandTotalBeforeDiscount: payload.grandTotalBeforeDiscount, coupon: payload.coupon,
                    grandTotalAfterDiscount: payload.grandTotalAfterDiscount, savedAmount: payload.savedAmount
                }
            }
        },

        [addCouponToCart.fulfilled]: (state, action) => {
            const payload = action.payload
            return {
                ...state, shoppingCart: {
                    ...state.shoppingCart, coupon: payload.coupon, grandTotalAfterDiscount: payload.grandTotalAfterDiscount, savedAmount: payload.savedAmount
                }
            }
        },

        [deleteCouponFromCart.fulfilled]: (state, action) => {
            const payload = action.payload
            return {
                ...state, shoppingCart: {
                    ...state.shoppingCart, coupon: payload.coupon, grandTotalAfterDiscount: payload.grandTotalAfterDiscount, savedAmount: payload.savedAmount
                }
            }
        },

        //---------------------------------------------------------------------- COUPON SUCESS REQUEST ----------------------------------------------------------------------

        [createCoupon.fulfilled]: (state, action) => {
            return { ...state, coupons: [...state.coupons, action.payload] }
        },

        [getCoupon.fulfilled]: (state, action) => {
            return { ...state, coupons: [state.coupons.find(({ couponId }) => couponId === action.payload.couponId)] }
        },

        [updateCoupon.fulfilled]: (state, action) => {
            return { ...state, coupons: state.coupons.map(coupon => coupon.couponId === action.payload.couponId ? action.payload : coupon) }
        },

        [deleteCoupon.fulfilled]: (state, action) => {
            return { ...state, coupons: state.coupons.filter(({ couponId }) => couponId !== action.payload.couponId) }
        },

        [getAllCoupons.fulfilled]: (state, action) => {
            return { ...state, coupons: action.payload }
        }
    }
})

export const { logOutCart } = cartSlice.actions
export default cartSlice.reducer