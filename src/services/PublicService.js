import axios from "axios";

const PUBLIC_URL = "http://localhost:9001/public/";

class PublicService {

    signUp(userInfo) {
        return axios.post(PUBLIC_URL + "signup/", userInfo)
    }

    signIn(jwtRequest) {
        return axios.post(PUBLIC_URL + "signin/", jwtRequest);
    }
}
export default new PublicService()