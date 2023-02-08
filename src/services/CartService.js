import axios from "axios"

const APPLICATION_BASE_URL = 'http://localhost:9003/cart/'

class CartService {

    createShoppingCart(userId) {
        return axios.post(APPLICATION_BASE_URL + "create-shopping-cart/" + userId)
    }

    //Not needed
    deleteShoppingCart(shoppingCartId) {
        return axios.delete(APPLICATION_BASE_URL + "delete-shopping-cart/" + shoppingCartId)
    }

    addProductToCart(shoppingCartId, productId) {
        return axios.post(APPLICATION_BASE_URL + "add-product-to-cart/" + shoppingCartId + "/" + productId)
    }

    increaseProductQuantityInCart(shoppingCartId, productId) {
        return axios.post(APPLICATION_BASE_URL + "increase-product-quantity-in-cart/" + shoppingCartId + "/" + productId)
    }

    removeCartItemFromCart(shoppingCartId, cartItemsId) {
        return axios.delete(APPLICATION_BASE_URL + "remove-cart-item-from-shopping-cart/" + shoppingCartId + "/" + cartItemsId)
    }

    decreaseProductQuantity(shoppingCartId, cartItemsId) {
        return axios.post(APPLICATION_BASE_URL + "decrease-product-from-cart/" + shoppingCartId + "/" + cartItemsId)
    }

    clearCart(shoppingCartId, cartIds) {
        return axios.delete(APPLICATION_BASE_URL + "clear-cart/" + shoppingCartId + "/" + cartIds)
    }

    addCoupon(shoppingCartId, couponName) {
        return axios.post(APPLICATION_BASE_URL + "add-coupon/" + shoppingCartId + "/" + couponName)
    }

    deleteCoupon(shoppingCartId) {
        return axios.delete(APPLICATION_BASE_URL + "delete-coupon/" + shoppingCartId)
    }
}

export default new CartService()