import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import OrderService from "../../services/OrderService"

const initialState = {
    orderDetails: [{
        orderId: '',
        userId: '',
        productId: '',
        productQuantity: '',
        totalPrice: '',
        orderCreatedAt: ''
    }]
}


export const createOrder = createAsyncThunk('Order/Create', async ({ userId }) => {
    const resp = await OrderService.createOrder(userId)
    return resp.data
})

export const getAllOrders = createAsyncThunk('Order/GetAll', async () => {
    const resp = await OrderService.getAllOrder()
    return resp.data
})

export const getReverseOrder = createAsyncThunk("Order/Reverse", async () => {
    const resp = await OrderService.getReverseOrder()
    return resp.data
})

export const filterOrderByCurrentDate = createAsyncThunk("Order/FilterCurrentDate", async () => {
    const resp = await OrderService.filterByCurrentDate()
    return resp.data
})

export const filterOrderByProductName = createAsyncThunk("Order/FilterByProductName", async ({ productName }) => {
    const resp = await OrderService.filterByProductName(productName)
    return resp.data
})

export const filterOrderByUserId = createAsyncThunk("Order/FilterByUserId", async ({ userId }) => {
    const resp = await OrderService.filterByUserId(userId)
    return resp.data
})

export const getOrderById = createAsyncThunk("Order/GetById", async ({ orderId }) => {
    const resp = await OrderService.getOrderById(orderId)
    return resp.data
})

const orderSlice = createSlice({
    name: "Orders",

    initialState,

    reducers: {
        logOutOrder: () => initialState
    },

    extraReducers: {

        // Success Request

        [createOrder.fulfilled]: (state, action) => {
            toast.success("Order Accepted Successfully")
            return { orderDetails: [...state.orderDetails, ...action.payload.map(ord => ord.orderDetails)] }
        },

        [getAllOrders.fulfilled]: (state, action) => {
            return { ...state, orderDetails: action.payload }
        },

        [getReverseOrder.fulfilled]: (state, action) => {
            return { ...state, orderDetails: action.payload }
        },

        [filterOrderByCurrentDate.fulfilled]: (state, action) => {
            // state.orderDetails.filter(({ orderCreatedAt: id1 }) => action.payload.some(({ orderCreatedAt: id2 }) => id2 === id1))
            return { ...state, orderDetails: action.payload }
        },

        [filterOrderByProductName.fulfilled]: (state, action) => {
            // state.orderDetails.filter(({ orderId: id1 }) => action.payload.some(({ orderId: id2 }) => id2 === id1))
            return { ...state, orderDetails: action.payload }
        },

        [filterOrderByUserId.fulfilled]: (state, action) => {
            // state.orderDetails.filter(({ userId: id1 }) => action.payload.some(({ userId: id2 }) => id2 === id1))
            return { ...state, orderDetails: action.payload }
        },

        [getOrderById.fulfilled]: (state, action) => {
            return { ...state, orderDetails: [state.orderDetails.find(({ orderId }) => orderId === action.payload.orderId)] }
        },

        // Rejected Request

        [createOrder.rejected]: (state, action) => {
            return toast.error(action.error.message)
        },

        [getAllOrders.rejected]: (state, action) => {
            return toast.error(action.error.message)
        },

        [getReverseOrder.rejected]: (state, action) => {
            return toast.error(action.error.message)
        },

        [filterOrderByCurrentDate.rejected]: (state, action) => {
            return toast.error(action.error.message)
        },

        [filterOrderByProductName.rejected]: (state, action) => {
            return toast.error(action.error.message)
        },

        [filterOrderByUserId.rejected]: (state, action) => {
            return toast.error(action.error.message)
        },

        [getOrderById.rejected]: (state, action) => {
            return toast.error(action.error.message)
        }
    }
})

export const { logOutOrder } = orderSlice.actions
export default orderSlice.reducer