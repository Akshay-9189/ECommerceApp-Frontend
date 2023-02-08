import axios from "axios"

const APPLICATION_BASE_URL = 'http://localhost:9003/coupon/'

class CouponService {

    createCoupon(coupon) {
        return axios.post(APPLICATION_BASE_URL + 'create/', coupon)
    }

    getCoupon(couponId) {
        return axios.get(APPLICATION_BASE_URL + 'get/' + couponId)
    }

    updateCoupon(couponId, coupon) {
        return axios.put(APPLICATION_BASE_URL + 'update/' + couponId, coupon)
    }

    deleteCoupon(couponId) {
        return axios.delete(APPLICATION_BASE_URL + 'delete/' + couponId)
    }

    getAllCoupons() {
        return axios.get(APPLICATION_BASE_URL)
    }

}
export default new CouponService()