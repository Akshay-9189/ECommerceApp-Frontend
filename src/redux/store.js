import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slice/cartSlice'
import categorySlice from './slice/categorySlice'
import orderSlice from './slice/orderSlice'
import publicSlice from './slice/publicSlice'
import userSlice from "./slice/userSlice"
import wishlistSlice from './slice/wishlistSlice'

const globleStore = configureStore({
    preloadedState: {},
    reducer: {
        publicData: publicSlice,
        cartData: cartSlice,
        wishlistData: wishlistSlice,
        userData: userSlice,
        orderData: orderSlice,
        categoryData: categorySlice
    }
})
export default globleStore