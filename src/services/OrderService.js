import axios from "axios"

const APPLICATION_BASE_URL = 'http://localhost:9004/order/'

class OrderService {

    createOrder(userId) {
        return axios.post(APPLICATION_BASE_URL + 'create-order/' + userId)
    }

    getAllOrder() {
        return axios.get(APPLICATION_BASE_URL)
    }

    getReverseOrder() {
        return axios.get(APPLICATION_BASE_URL + "reverse")
    }

    filterByProductName(productName) {
        return axios.get(APPLICATION_BASE_URL + 'filter-by-product-name/' + productName)
    }

    filterByUserId(userId) {
        return axios.get(APPLICATION_BASE_URL + 'filter-by-user-id/' + userId)
    }

    getOrderById(orderId) {
        return axios.get(APPLICATION_BASE_URL + 'get-order/' + orderId)
    }

    filterByCurrentDate() {
        return axios.get(APPLICATION_BASE_URL + 'filter-by-current-date')
    }

}
export default new OrderService()