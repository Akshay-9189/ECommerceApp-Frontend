import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import PublicService from "../../services/PublicService"
import UserService from "../../services/UserService"

const initialStatee = {
    userInfo: [{
        userId: '',
        userFirstName: '',
        userLastName: '',
        userContactNumber: '',
        userEmail: '',
        userPassword: '',
        roles: ''
    }]
}

export const getAllUsers = createAsyncThunk("User/getAllUser", async () => {
    const resp = await UserService.getAllUsers()
    return resp.data
})

export const getUserByID = createAsyncThunk("User/getUser", async ({ userId }) => {
    const resp = await UserService.getUser(userId)
    return resp.data
})

export const deleteUser = createAsyncThunk("User/deleteUser", async ({ userId }) => {
    await UserService.deleteUser(userId)
    // const resp = await UserService.deleteUser(userId)
    // console.log(resp.data);
    return { userId }
})

export const updateUser = createAsyncThunk("User/update", async ({ userId, userInfo }) => {
    const resp = await UserService.updateUser(userId, userInfo)
    return resp.data
})

export const signUp = createAsyncThunk("User/SignUp", async (userInfo) => {
    const resp = await PublicService.signUp(userInfo)
    return resp.data
})

export const changeUserRole = createAsyncThunk("User/ChangeRole", async ({ userId }) => {
    const resp = await UserService.changeUserRole(userId)
    return resp.data
})

const userSlice = createSlice({
    name: "User",
    initialState: initialStatee,

    reducers: {
        logOutUser: () => initialStatee
    },

    extraReducers: {

        // Success Request

        [getAllUsers.fulfilled]: (state, action) => {
            return { ...state, userInfo: action.payload }
        },

        [getUserByID.fulfilled]: (state, action) => {
            return { ...state, userInfo: [state.userInfo.find(({ userId }) => userId === action.payload.userId)] }
        },

        [deleteUser.fulfilled]: (state, action) => {
            toast.success(`${action.payload.userFirstName} is Deleted !!!!!!!`)
            return { userInfo: state.userInfo.filter(({ userId }) => userId !== action.payload.userId) }
        },

        [updateUser.fulfilled]: (state, action) => {
            toast.success(`${action.payload.userFirstName} is Updated !!!!!!`)
            return { ...state, userInfo: state.userInfo.map(user => user.userId === action.payload.userId ? action.payload : user) }
        },

        [signUp.fulfilled]: (state, action) => {
            toast.success('Sign Up Successfully')
            return { userInfo: [...state.userInfo, action.payload] }
        },

        [changeUserRole.fulfilled]: (state, action) => {
            return { ...state, userInfo: state.userInfo.map(user => user.userId === action.payload.userId ? action.payload : user) }
        },

        // Rejected Request

        [getAllUsers.rejected]: (state, action) => {
            return toast.error(action.error.message)
        },

        [getUserByID.rejected]: (state, action) => {
            return toast.error(action.error.message)
        },

        [deleteUser.rejected]: (state, action) => {
            return toast.error(action.error.message)
        },

        [updateUser.rejected]: (state, action) => {
            return toast.error(action.error.message)
        },

        [signUp.rejected]: (state, action) => {
            return toast.error(action.error.message)
        },

        [changeUserRole.rejected]: (state, action) => {
            return toast.error(action.error.message)
        }
    }
})
export const { logOutUser } = userSlice.actions
export default userSlice.reducer