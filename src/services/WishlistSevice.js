import axios from "axios"

const WISHLIST_SERVICE = 'http://localhost:9005/wishlist/'

class WishlistService {

    createNewWishList(newWishlistDTO) {
        return axios.post(WISHLIST_SERVICE + 'save', newWishlistDTO)
    }

    addProductToWishList(addorRemoveProductDTO) {
        return axios.post(WISHLIST_SERVICE + 'add-product', addorRemoveProductDTO)
    }

    removeProductFromWishList(addorRemoveProductDTO) {
        return axios.post(WISHLIST_SERVICE + 'remove-product', addorRemoveProductDTO)
    }

    getWishList(wishListId) {
        return axios.get(WISHLIST_SERVICE + 'get/' + wishListId)
    }

    clearWishList(wishListId, productIds) {
        return axios.delete(WISHLIST_SERVICE + 'remove-all/' + wishListId + '/' + productIds)
    }
}
export default new WishlistService()