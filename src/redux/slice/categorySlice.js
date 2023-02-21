import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductService from "../../services/ProductService"
import CategoryService from "../../services/CategoryService";
import SubCategoryService from "../../services/SubCategoryService";

// ----------------------------------------------------------------- Product Actions -------------------------------------------------------------------------

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

export const filterProductbySubCatName = createAsyncThunk("Product/FilterSubCat", async ({ subCategoryName }) => {
    const response = await ProductService.filterProductbySubCatName(subCategoryName)
    return response.data
})

export const getByProductName = createAsyncThunk("Product/ByName", async ({ productName }) => {
    const response = await ProductService.getByProductName(productName)
    return response.data
})

export const filterProductByPrice = createAsyncThunk('Product/ByPrice', async ({ minPrice, maxPrice }) => {
    const response = await ProductService.filterProductByPrice(minPrice, maxPrice)
    return response.data
})

export const sortProductByNameAscending = createAsyncThunk("Product/SortAsc", async () => {
    const response = await ProductService.sortProductByNameAscending()
    return response.data
})

export const sortProductByNameDescending = createAsyncThunk("Product/SortDes", async () => {
    const response = await ProductService.sortProductByNameDescending()
    return response.data
})

export const filterProductBelowPrice = createAsyncThunk("Product/SortBPr", async ({ price }) => {
    const response = await ProductService.filterProductBelowPrice(price)
    return response.data
})

export const filterProductAbovePrice = createAsyncThunk("Product/SortAPr", async ({ price }) => {
    const response = await ProductService.filterProductAbovePrice(price)
    return response.data
})

export const sortByProductPriceAscending = createAsyncThunk("Product/SortPriAs", async () => {
    const response = await ProductService.sortProductByPriceAs()
    return response.data
})

export const sortByProductPriceDescending = createAsyncThunk("Product/SortPriDe", async () => {
    const response = await ProductService.sortProductByPriceDes()
    return response.data
})

export const filterProductByProductName = createAsyncThunk("Product/FilterProdNa", async ({ productName }) => {
    const response = await ProductService.filterProductByProductName(productName)
    return response.data
})

// ----------------------------------------------------------------------- Category Actions --------------------------------------------------------------------------------

export const saveCategory = createAsyncThunk("Category/Create", async (category) => {
    const response = await CategoryService.saveCategory(category)
    return response.data
})

export const updateCategory = createAsyncThunk("Category/Update", async ({ categoryId, category }) => {
    const response = await CategoryService.updateCategory(categoryId, category)
    return response.data
})

export const getAllCategories = createAsyncThunk("Categories/GetAll", async () => {
    const response = await CategoryService.getAllCategories()
    return response.data
})

export const deleteCategory = createAsyncThunk("Category/Delete", async ({ categoryId }) => {
    await CategoryService.deleteCategory(categoryId)
    return categoryId
})


// -------------------------------------------------------------------------------- Sub Category Actions ----------------------------------------------------------------

export const saveSubCategory = createAsyncThunk("SubCategory/Create", async (saveSubCategoryDTO) => {
    const response = await SubCategoryService.saveSubCategory(saveSubCategoryDTO)
    return response.data
})

export const updateSubCategory = createAsyncThunk("SubCategory/Update", async ({ saveSubCategoryDTO, subCategoryId }) => {
    const response = await SubCategoryService.updateSubCategory(saveSubCategoryDTO, subCategoryId)
    return response.data
})

export const getSubCategorybyName = createAsyncThunk("SubCategory/ByName", async ({ subCategoryName }) => {
    const response = await SubCategoryService.getAllSubCategory(subCategoryName)
    return response.data
})

export const getAllSubCategory = createAsyncThunk("SubCategory/All", async () => {
    const response = await SubCategoryService.getAllSubCategory()
    return response.data
})

export const deleteSubCategory = createAsyncThunk("SubCategory/Delete", async ({ subCategoryId }) => {
    await SubCategoryService.deleteSubCategory(subCategoryId)
    return { subCategoryId }
})



const categorySlice = createSlice({
    name: 'Category',

    initialState: {
        products: [{
            productId: '',
            productName: '',
            productWeight: '',
            productDescription: '',
            productCode: '',
            productPrice: '',
            productTotalQuantityAvailable: '',
            imageURL: '',
            subCategory: {
                subCategoryId: '',
                subCategoryName: '',
                category: {
                    categoryId: '',
                    categoryName: ''
                }
            }
        }],

        subCategory: [{
            subCategoryId: '',
            subCategoryName: '',
            category: {
                categoryId: '',
                categoryName: ''
            }
        }],

        category: [{
            categoryId: '',
            categoryName: ''
        }]
    },

    reducers: {},

    extraReducers: {

        // ======================================================================== Product Success Request =======================================================================

        [getAllProducts.fulfilled]: (state, action) => {
            return { ...state, products: action.payload }
        },

        [getProductByID.fulfilled]: (state, action) => {
            return { ...state, products: [state.products.find(({ productId }) => productId === action.payload.productId)] }
        },

        [deleteProduct.fulfilled]: (state, action) => {
            return { ...state, products: state.products.filter(({ productId }) => productId !== action.payload.productId) }
        },

        [updateProduct.fulfilled]: (state, action) => {
            return { ...state, products: state.products.map(prod => prod.productId === action.payload.productId ? action.payload : prod) }
        },

        [addProduct.fulfilled]: (state, action) => {
            return { ...state, products: [...state.products, action.payload] }
        },

        [reduceTotalQuantity.fulfilled]: (state, action) => {
            const payload = action.payload
            return {
                ...state, products: state.products.map(p => p.productId === payload.productId ?
                    { ...p, productTotalQuantityAvailable: payload.prod.productTotalQuantityAvailable } : p)
            }
        },

        [filterProductbySubCatName.fulfilled]: (state, action) => {
            // state.products.filter(({ productId: id1 }) => action.payload.some(({ productId: id2 }) => id2 === id1))
            return { ...state, products: action.payload }
        },

        [getByProductName.fulfilled]: (state, action) => {
            return { ...state, products: action.payload }
        },

        [filterProductByPrice.fulfilled]: (state, action) => {
            return { ...state, products: action.payload }
        },

        [sortProductByNameAscending.fulfilled]: (state, action) => {
            return { ...state, products: action.payload }
        },

        [sortProductByNameDescending.fulfilled]: (state, action) => {
            return { ...state, products: action.payload }
        },

        [filterProductBelowPrice.fulfilled]: (state, action) => {
            return { ...state, products: action.payload }
        },

        [filterProductAbovePrice.fulfilled]: (state, action) => {
            return { ...state, products: action.payload }
        },

        [sortByProductPriceAscending.fulfilled]: (state, action) => {
            return { ...state, products: action.payload }
        },

        [sortByProductPriceDescending.fulfilled]: (state, action) => {
            return { ...state, products: action.payload }
        },

        [filterProductByProductName.fulfilled]: (state, action) => {
            return { ...state, products: action.payload }
        },

        // ============================================================= Category Sucess Request ===================================================================================

        [saveCategory.fulfilled]: (state, action) => {
            return { ...state, category: [...state.category, action.payload] }
        },

        [updateCategory.fulfilled]: (state, action) => {
            return { ...state, category: state.category.map(cat => cat.categoryId === action.payload.categoryId ? action.payload : cat) }
        },

        [getAllCategories.fulfilled]: (state, action) => {
            return { ...state, category: action.payload }
        },

        [deleteCategory.fulfilled]: (state, action) => {
            return { ...state, category: state.category.filter(({ categoryId }) => categoryId !== action.payload) }
        },

        // =================================================================== Sub Category Sucess Request =============================================================================


        [saveSubCategory.fulfilled]: (state, action) => {
            return { ...state, subCategory: [...state.subCategory, action.payload] }
        },

        [updateSubCategory.fulfilled]: (state, action) => {
            return { ...state, subCategory: state.subCategory.map(subCat => subCat.subCategoryId === action.payload.subCategoryId ? action.payload : subCat) }
        },

        [getSubCategorybyName.fulfilled]: (state, action) => {
            return { ...state, subCategory: state.subCategory.find(({ subCategoryId }) => subCategoryId === action.payload.subCategoryId) }
        },

        [getAllSubCategory.fulfilled]: (state, action) => {
            return { ...state, subCategory: action.payload }
        },

        [deleteSubCategory.fulfilled]: (state, action) => {
            return { ...state, subCategory: state.subCategory.filter(({ subCategoryId }) => subCategoryId !== action.payload) }
        }
    }
})

export default categorySlice.reducer