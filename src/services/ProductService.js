import axios from "axios";

const APPLICATION_BASE_URL = 'http://localhost:9002/product/';

class ProductService {

    getAllProducts() {
        return axios.get(APPLICATION_BASE_URL);
    }

    getProductById(productId) {
        return axios.get(APPLICATION_BASE_URL + "get/" + productId);
    }

    createProduct(product, file) {
        const formData = new FormData();
        formData.append("product", JSON.stringify(product));
        formData.append("file", file);
        return axios.post(APPLICATION_BASE_URL + "save/", formData);
    }

    updateProduct(productId, product, file) {
        const formData = new FormData();
        formData.append("product", JSON.stringify(product));
        formData.append("file", file)
        return axios.put(APPLICATION_BASE_URL + "update/" + productId, formData);
    }

    deleteProduct(productId) {
        return axios.delete(APPLICATION_BASE_URL + "delete/" + productId)
    }

    decreaseProductQuantity(productId, productSelectedQuantity) {
        return axios.patch(APPLICATION_BASE_URL + "decrease-product-quantity/" + productId + '/' + productSelectedQuantity)
    }

    filterProductbySubCatName(subCategoryName) {
        return axios.get(APPLICATION_BASE_URL + 'filter-product-by-sub-category-name/' + subCategoryName)
    }

    getByProductName(productName) {
        return axios.get(APPLICATION_BASE_URL + 'get-by-name/' + productName)
    }

    filterProductByPrice(minPrice, maxPrice) {
        return axios.get(APPLICATION_BASE_URL + 'filter-product-by-price/' + minPrice + '/' + maxPrice)
    }

    sortProductByNameAscending() {
        return axios.get(APPLICATION_BASE_URL + 'sort-product-by-name')
    }

    sortProductByNameDescending() {
        return axios.get(APPLICATION_BASE_URL + 'sort-product-by-name-descending')
    }

    filterProductBelowPrice(price) {
        return axios.get(APPLICATION_BASE_URL + 'filter-product-by-below-price/' + price)
    }

    filterProductAbovePrice(price) {
        return axios.get(APPLICATION_BASE_URL + 'filter-product-by-above-price/' + price)
    }

    sortProductByPriceAs() {
        return axios.get(APPLICATION_BASE_URL + 'sort-by-price-ascending/')
    }

    sortProductByPriceDes() {
        return axios.get(APPLICATION_BASE_URL + 'sort-by-price-descending/')
    }

    filterProductByProductName(productName) {
        return axios.get(APPLICATION_BASE_URL + 'filter-product-by-name/' + productName)
    }
}

export default new ProductService();