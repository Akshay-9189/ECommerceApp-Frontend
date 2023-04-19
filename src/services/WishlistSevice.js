import axios from "axios"
import { wishListService } from "../constants"

class WishlistService {

    createNewWishList(newWishlistDTO) {
        return axios.post(wishListService.WISHLIST + '/save', newWishlistDTO)
    }

    addProductToWishList(addorRemoveProductDTO) {
        return axios.post(wishListService.WISHLIST + '/add-product', addorRemoveProductDTO)
    }

    removeProductFromWishList(addorRemoveProductDTO) {
        return axios.post(wishListService.WISHLIST + '/remove-product', addorRemoveProductDTO)
    }

    getWishList(wishListId) {
        return axios.get(wishListService.WISHLIST + `/get/${wishListId}`)
    }

    clearWishList(wishListId, productIds) {
        return axios.delete(wishListService.WISHLIST + `/remove-all/${wishListId}/${productIds}`)
    }
}
export default new WishlistService()