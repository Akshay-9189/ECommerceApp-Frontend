import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import ProductService from "../../services/ProductService"

const initialStatee = {
    product: [{
        productId: '',
        productName: '',
        productWeight: '',
        productDescription: '',
        productCode: '',
        productPrice: '',
        productTotalQuantityAvailable: '',
        imageURL: ''
    }]
}

export const getAllProducts = createAsyncThunk("Product/getAllProducts", async () => {
    const resp = await ProductService.getAllProducts()
    return resp.data
})

export const getProductByID = createAsyncThunk("Product/getProduct", async ({ productId }) => {
    const resp = await ProductService.getProductById(productId)
    return resp.data
})

export const deleteProduct = createAsyncThunk("Product/deleteProduct", async ({ productId }) => {
    await ProductService.deleteProduct(productId)
    return { productId }
})

export const updateProduct = createAsyncThunk("Product/updateProduct", async ({ productId, product, file }) => {
    const resp = await ProductService.updateProduct(productId, product, file)
    return resp.data
})

export const addProduct = createAsyncThunk("Product/addProduct", async ({ product, file }) => {
    const resp = await ProductService.createProduct(product, file)
    return resp.data
})

export const reduceTotalQuantity = createAsyncThunk("Product/reduceTotalQuantity", async ({ productId, productSelectedQuantity }) => {
    const resp = await ProductService.decreaseProductQuantity(productId, productSelectedQuantity)
    return { productId, prod: resp.data }
})

const productSlice = createSlice({
    name: "Product",
    initialState: initialStatee,
    reducers: {},
    extraReducers: {

        // Success Request:

        [getAllProducts.fulfilled]: (state, action) => {
            return { ...state, product: action.payload }
        },

        [getProductByID.fulfilled]: (state, action) => {
            return { product: [state.product.find(({ productId }) => productId === action.payload.productId)] }
        },

        [deleteProduct.fulfilled]: (state, action) => {
            toast.success(`Product Deleted Successfully`)
            return { product: state.product.filter(({ productId }) => productId !== action.payload.productId) }
        },

        [updateProduct.fulfilled]: (state, action) => {
            toast.success(`Product Updated Successfuly`)
            return { ...state, product: state.product.map(prod => prod.productId === action.payload.productId ? action.payload : prod) }
        },

        [addProduct.fulfilled]: (state, action) => {
            toast.success(`Product Added Successfully`)
            return { product: [...state.product, action.payload] }
        },

        [reduceTotalQuantity.fulfilled]: (state, action) => {
            const payload = action.payload
            return {
                ...state, product: state.product.map(p => p.productId === payload.productId ?
                    { ...p, productTotalQuantityAvailable: payload.prod.productTotalQuantityAvailable } : p)
            }
        },

        // Rejected Request:

        [getAllProducts.rejected]: (action) => {
            console.log(action.error);
            return toast.error(`Products Not Found !!!!`)
        },

        [getProductByID.rejected]: (action) => {
            console.log(action.error);
            return toast.error(`Product Not Found !!!!`)
        },

        [deleteProduct.rejected]: (action) => {
            console.log(action.error);
            toast.error(`Something Went Wrong !!!!!`)
        },

        [updateProduct.rejected]: (action) => {
            console.log(action.error);
            toast.error(`Product is Not Updated !!!!!`)
        },

        [addProduct.rejected]: (action) => {
            console.log(action.error);
            return toast.error(`Product Not Added !!!!`)
        },

        [reduceTotalQuantity.rejected]: (action) => {
            console.log(action.error);
            return toast.error("Purchase Failed !!!!!!")
        }
    }
})
export default productSlice.reducer
