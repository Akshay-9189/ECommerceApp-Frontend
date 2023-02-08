import axios from "axios"

const APPLICATION_BASE_URL = "http://localhost:9002/category/"

class CategoryService {

    saveCategory(category) {
        return axios.post(APPLICATION_BASE_URL + 'save', category)
    }

    updateCategory(categoryId, category) {
        return axios.put(APPLICATION_BASE_URL + 'update/' + categoryId, category)
    }

    getAllCategories() {
        return axios.get(APPLICATION_BASE_URL)
    }

    deleteCategory(categoryId) {
        return axios.delete(APPLICATION_BASE_URL + 'delete-category/' + categoryId)
    }
}
export default new CategoryService()