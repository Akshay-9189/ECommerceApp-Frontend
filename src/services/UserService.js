import axios from "axios";
import { userService } from "../constants";
import AuthHeader from './AuthHeader'

class UserService {

    getAllUsers() {
        return axios.get(userService.USER + '/', { headers: AuthHeader() })
    }

    deleteUser(userId) {
        return axios.delete(userService.USER + `/delete/${userId}`, { headers: AuthHeader() })
    }

    getUser(userId) {
        return axios.get(userService.USER + `/get/${userId}`, { headers: AuthHeader() })
    }

    updateUser(userId, userInfo) {
        return axios.put(userService.USER + `/update/${userId}`, userInfo, { headers: AuthHeader() })
    }

    changeUserRole(userId) {
        return axios.patch(userService.USER + `/change-role/${userId}`, { headers: AuthHeader() })
    }
}

export default new UserService()