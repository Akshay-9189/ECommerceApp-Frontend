import axios from "axios";
import { productService } from "../constants";

class ProductService {

    getAllProducts() {
        return axios.get(productService.PRODUCT + '/');
    }

    getProductById(productId) {
        return axios.get(productService.PRODUCT + `/get/${productId}`);
    }

    createProduct(product, file) {
        const formData = new FormData();
        formData.append("product", JSON.stringify(product));
        formData.append("file", file);
        return axios.post(productService.PRODUCT + "/save", formData);
    }

    updateProduct(productId, product, file) {
        const formData = new FormData();
        formData.append("product", JSON.stringify(product));
        formData.append("file", file)
        return axios.put(productService.PRODUCT + `/update/${productId}`, formData);
    }

    deleteProduct(productId) {
        return axios.delete(productService.PRODUCT + `/delete/${productId}`)
    }

    decreaseProductQuantity(productId, productSelectedQuantity) {
        return axios.patch(productService.PRODUCT + `/decrease-product-quantity/${productId}/${productSelectedQuantity}`)
    }

    filterProductbySubCatName(subCategoryName) {
        return axios.get(productService.PRODUCT + `/filter-product-by-sub-category-name/${subCategoryName}`)
    }

    getByProductName(productName) {
        return axios.get(productService.PRODUCT + `/get-by-name/${productName}`)
    }

    filterProductByPrice(minPrice, maxPrice) {
        return axios.get(productService.PRODUCT + `/filter-product-by-price/${minPrice}/${maxPrice}`)
    }

    sortProductByNameAscending() {
        return axios.get(productService.PRODUCT + '/sort-product-by-name')
    }

    sortProductByNameDescending() {
        return axios.get(productService.PRODUCT + '/sort-product-by-name-descending')
    }

    filterProductBelowPrice(price) {
        return axios.get(productService.PRODUCT + `/filter-product-by-below-price/${price}`)
    }

    filterProductAbovePrice(price) {
        return axios.get(productService.PRODUCT + `/filter-product-by-above-price/${price}`)
    }

    sortProductByPriceAs() {
        return axios.get(productService.PRODUCT + '/sort-by-price-ascending/')
    }

    sortProductByPriceDes() {
        return axios.get(productService.PRODUCT + '/sort-by-price-descending/')
    }

    filterProductByProductName(productName) {
        return axios.get(productService.PRODUCT + `/filter-product-by-name/${productName}`)
    }
}

export default new ProductService();