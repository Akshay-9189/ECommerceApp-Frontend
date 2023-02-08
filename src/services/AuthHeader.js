function AuthHeader() {
    const token = JSON.parse(localStorage.getItem("token"))
    if (token) {
        return { Authorization: 'Bearer ' + token }
    } else {
        return {}
    }
}
export default AuthHeader