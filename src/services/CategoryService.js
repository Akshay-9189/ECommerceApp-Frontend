import axios from "axios"
import { productService } from "../constants"

class CategoryService {

    saveCategory(category) {
        return axios.post(productService.CATEGORY + '/save', category)
    }

    updateCategory(categoryId, category) {
        return axios.put(productService.CATEGORY + `/update/${categoryId}`)
    }

    getAllCategories() {
        return axios.get(productService.CATEGORY + '/')
    }

    deleteCategory(categoryId) {
        return axios.delete(productService.CATEGORY + `/delete-category/${categoryId}`)
    }
}
export default new CategoryService()