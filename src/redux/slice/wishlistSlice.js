import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import WishlistSevice from "../../services/WishlistSevice";

const initialState = {
    wishlist: {
        wishListId: '',
        userId: '',
        productList: [{}]
    }
}

export const createNewWishList = createAsyncThunk("Wishlist/New", async ({ newWishlistDTO }) => {
    const response = await WishlistSevice.createNewWishList(newWishlistDTO)
    return response.data;
})

export const addProductToWishList = createAsyncThunk("Wishlist/AddProduct", async ({ addorRemoveProductDTO }) => {
    const response = await WishlistSevice.addProductToWishList(addorRemoveProductDTO)
    return response.data
})

export const removeProductFromWishList = createAsyncThunk("Wishlist/RemoveProduct", async ({ addorRemoveProductDTO }) => {
    const response = await WishlistSevice.removeProductFromWishList(addorRemoveProductDTO)
    return response.data
})

export const getWishList = createAsyncThunk("Wishlist/Get", async ({ wishListId }) => {
    const response = await WishlistSevice.getWishList(wishListId)
    return response.data
})

export const clearWishList = createAsyncThunk("Wishlist", async ({ wishListId, productIds }) => {
    const response = await WishlistSevice.clearWishList(wishListId, productIds)
    return response.data
})

const wishlistSlice = createSlice({
    name: 'Wishlist',

    initialState,

    reducers: {
        logOutWishlist: () => initialState
    },

    extraReducers: {

        [createNewWishList.fulfilled]: (state, action) => {
            return { ...state, wishlist: action.payload }
        },

        [addProductToWishList.fulfilled]: (state, action) => {
            return { ...state, wishlist: { ...state.wishlist, productList: action.payload.productList } }
        },

        [removeProductFromWishList.fulfilled]: (state, action) => {
            return { ...state, wishlist: { ...state.wishlist, productList: action.payload.productList } }
        },

        [getWishList.fulfilled]: (state, action) => {
            return { ...state, wishlist: action.payload }
        },

        [clearWishList.fulfilled]: (state, action) => {
            return { ...state, wishlist: action.payload }
        }
    }
})
export const { logOutWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer