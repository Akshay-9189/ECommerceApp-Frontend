import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slice/cartSlice'
import categorySlice from './slice/categorySlice'
import orderSlice from './slice/orderSlice'
//import productSlice from "./slice/productSlice"
import publicSlice from './slice/publicSlice'
import userSlice from "./slice/userSlice"
import wishlistSlice from './slice/wishlistSlice'

const globleStore = configureStore({
    preloadedState: {},
    reducer: {
        // productData: productSlice,
        publicData: publicSlice,
        cartData: cartSlice,
        wishlistData: wishlistSlice,
        userData: userSlice,
        orderData: orderSlice,
        categoryData: categorySlice
    }
})
export default globleStore