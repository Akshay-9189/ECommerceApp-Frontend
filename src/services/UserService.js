import axios from "axios";
import AuthHeader from "./AuthHeader";

const USER_SERVICE = "http://localhost:9001/user/";

class UserService {

    getAllUsers() {
        return axios.get(USER_SERVICE, { headers: AuthHeader() })
    }

    deleteUser(userId) {
        return axios.delete(USER_SERVICE + "delete/" + userId, { headers: AuthHeader() })
    }

    getUser(userId) {
        return axios.get(USER_SERVICE + "get/" + userId, { headers: AuthHeader() })
    }

    updateUser(userId, userInfo) {
        return axios.put(USER_SERVICE + "update/" + userId, userInfo, { headers: AuthHeader() })
    }

    changeUserRole(userId) {
        return axios.patch(USER_SERVICE + "change-role/" + userId, { headers: AuthHeader() })
    }
}

export default new UserService()