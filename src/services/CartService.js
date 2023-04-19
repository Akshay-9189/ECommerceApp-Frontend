import axios from "axios"
import { cartService } from "../constants"

class CartService {

    createShoppingCart(userId) {
        return axios.post(cartService.CART + `/create-shopping-cart/${userId}`)
    }

    addProductToCart(shoppingCartId, productId) {
        return axios.post(cartService.CART + `/add-product-to-cart/${shoppingCartId}/${productId}`)
    }

    increaseProductQuantityInCart(shoppingCartId, productId) {
        return axios.post(cartService.CART + `/increase-product-quantity-in-cart/${shoppingCartId}/${productId}`)
    }

    removeCartItemFromCart(shoppingCartId, cartItemsId) {
        return axios.delete(cartService.CART + `/remove-cart-item-from-shopping-cart/${shoppingCartId}/${cartItemsId}`)
    }

    decreaseProductQuantity(shoppingCartId, cartItemsId) {
        return axios.post(cartService.CART + `/decrease-product-from-cart/${shoppingCartId}/${cartItemsId}`)
    }

    clearCart(shoppingCartId, cartIds) {
        return axios.delete(cartService.CART + `/clear-cart/${shoppingCartId}/${cartIds}`,)
    }

    addCoupon(shoppingCartId, couponName) {
        return axios.post(cartService.CART + `/add-coupon/${shoppingCartId}/${couponName}`)
    }

    deleteCoupon(shoppingCartId) {
        return axios.delete(cartService.CART + `/delete-coupon/${shoppingCartId}`)
    }
}

export default new CartService()