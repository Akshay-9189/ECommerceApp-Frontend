import axios from "axios";
import { userService } from "../constants";

class PublicService {

    signUp(userInfo) {
        return axios.post(userService.PUBLIC + "/signup", userInfo)
    }

    signIn(jwtRequest) {
        return axios.post(userService.PUBLIC + "/signin", jwtRequest);
    }
}
export default new PublicService()