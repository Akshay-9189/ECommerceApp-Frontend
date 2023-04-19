import axios from "axios"
import { productService } from "../constants"

class SubCategoryService {
    saveSubCategory(saveSubCategoryDTO) {
        return axios.post(productService.SUBCATEGORY + '/save', saveSubCategoryDTO)
    }

    updateSubCategory(saveSubCategoryDTO, subCategoryId) {
        return axios.put(productService.SUBCATEGORY + `/update/${subCategoryId}`, saveSubCategoryDTO)
    }

    getSubCategryByName(subCategoryName) {
        return axios.get(productService.SUBCATEGORY + `/get-sub-category-by-name/${subCategoryName}`)
    }

    getAllSubCategory() {
        return axios.get(productService.SUBCATEGORY + '/')
    }

    deleteSubCategory(subCategoryId) {
        return axios.delete(productService.SUBCATEGORY + `/delete-sub-category/${subCategoryId}`)
    }
}
export default new SubCategoryService()