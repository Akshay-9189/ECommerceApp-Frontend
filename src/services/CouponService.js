import axios from "axios"
import { cartService } from "../constants"

class CouponService {

    createCoupon(coupon) {
        return axios.post(cartService.COUPON + '/create', coupon)
    }

    getCoupon(couponId) {
        return axios.get(cartService.COUPON + `/get/${couponId}`)
    }

    updateCoupon(couponId, coupon) {
        return axios.put(cartService.COUPON + `/update/${couponId}`, coupon)
    }

    deleteCoupon(couponId) {
        return axios.delete(cartService.COUPON + `/delete/${couponId}`)
    }

    getAllCoupons() {
        return axios.get(cartService.COUPON + '/')
    }

}
export default new CouponService()