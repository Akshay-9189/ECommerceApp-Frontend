import axios from "axios"
import { orderService } from "../constants"

class OrderService {

    createOrder(userId) {
        return axios.post(orderService.ORDER + `/create-order/${userId}`)
    }

    getAllOrder() {
        return axios.get(orderService.ORDER + '/')
    }

    getReverseOrder() {
        return axios.get(orderService.ORDER + "/reverse")
    }

    filterByProductName(productName) {
        return axios.get(orderService.ORDER + `/filter-by-product-name/${productName}`)
    }

    filterByUserId(userId) {
        return axios.get(orderService.ORDER + `/filter-by-user-id/${userId}`)
    }

    getOrderById(orderId) {
        return axios.get(orderService.ORDER + `/get-order/${orderId}`)
    }

    filterByCurrentDate() {
        return axios.get(orderService.ORDER + '/filter-by-current-date')
    }

}
export default new OrderService()