import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import PublicService from "../../services/PublicService"

const initailStatee = {
    login: false,
    jwtRequest: {
        jwtToken: '', userInfo: {}
    }
}

export const signIn = createAsyncThunk("Public/SignIn", async (jwtRequest) => {
    const resp = await PublicService.signIn(jwtRequest)
    if (resp.data) {
        localStorage.setItem("token", JSON.stringify(resp.data.jwtToken))
        localStorage.setItem("user", JSON.stringify(resp.data.userInfo))
    }
    return resp.data
})

const loginSlice = createSlice({
    name: "SignIn",
    initialState: initailStatee,

    reducers: {

        logOut: state => {
            if (state.login && state.jwtRequest) {
                localStorage.removeItem("user")
                localStorage.removeItem("token")
            }
            return initailStatee
        },

        checkUser: () => {
            const userInfo = JSON.parse(localStorage.getItem("user"))
            const jwtToken = JSON.parse(localStorage.getItem("token"))
            if (userInfo && jwtToken)
                return { login: true, jwtRequest: { jwtToken, userInfo } }
            else
                return initailStatee
        }
    },

    extraReducers: {

        [signIn.fulfilled]: (state, action) => {
            return { login: true, jwtRequest: action.payload }
        }
    }
})
export const { logOut, checkUser } = loginSlice.actions
export default loginSlice.reducer