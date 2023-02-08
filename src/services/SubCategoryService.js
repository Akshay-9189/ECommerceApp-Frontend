import axios from "axios"

const APPLICATION_BASE_URL = 'http://localhost:9002/sub-category/'

class SubCategoryService {
    saveSubCategory(saveSubCategoryDTO) {
        return axios.post(APPLICATION_BASE_URL + 'save', saveSubCategoryDTO)
    }

    updateSubCategory(saveSubCategoryDTO, subCategoryId) {
        return axios.put(APPLICATION_BASE_URL + 'update/' + subCategoryId, saveSubCategoryDTO)
    }

    getSubCategryByName(subCategoryName) {
        return axios.get(APPLICATION_BASE_URL + 'get-sub-category-by-name/' + subCategoryName)
    }

    getAllSubCategory() {
        return axios.get(APPLICATION_BASE_URL)
    }

    // getAllSubCategory() {
    //     return axios.get(APPLICATION_BASE_URL + 'get-all-subcategories')
    // }

    deleteSubCategory(subCategoryId) {
        return axios.delete(APPLICATION_BASE_URL + 'delete-sub-category/' + subCategoryId)
    }
}
export default new SubCategoryService()