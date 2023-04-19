import axios from "axios";
import { userService } from "../constants";

class UserService {

    getAllUsers() {
        return axios.get(userService.USER + '/')
    }

    deleteUser(userId) {
        return axios.delete(userService.USER + `/delete/${userId}`)
    }

    getUser(userId) {
        return axios.get(userService.USER + `/get/${userId}`)
    }

    updateUser(userId, userInfo) {
        return axios.put(userService.USER + `/update/${userId}`, userInfo)
    }

    changeUserRole(userId) {
        return axios.patch(userService.USER + `/change-role/${userId}`)
    }
}

export default new UserService()