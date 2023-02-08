import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct } from '../../redux/slice/categorySlice';
import { GrDocumentUpdate } from 'react-icons/gr'
import { IoArrowBack } from 'react-icons/io5'
import { TbCurrencyRupee } from 'react-icons/tb'
import { GrPowerReset } from 'react-icons/gr'
import { BsSave2 } from 'react-icons/bs'
import { toast } from 'react-toastify';

function SaveOrUpdateProduct() {

    const navigate = useNavigate()
    const { productId } = useParams()
    const [productName, setProductName] = useState('')
    const [productDescription, setProductDescription] = useState('')
    const [productWeight, setproductWeight] = useState('')
    const [productCode, setProductCode] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productTotalQuantityAvailable, setProductTotalQuantityAvailable] = useState('')
    const [file, setFile] = useState('')
    const [subCat, setSubCat] = useState('')

    const dispatch = useDispatch()
    const { products, subCategory } = useSelector(state => state.categoryData)

    useEffect(() => {
        if (productId) {
            document.title = "Update Product"
            const getProduct = products.find(prod => prod.productId === productId)
            setProductName(getProduct.productName)
            setProductDescription(getProduct.productDescription)
            setproductWeight(getProduct.productWeight)
            setProductCode(getProduct.productCode)
            setProductPrice(getProduct.productPrice)
            setProductTotalQuantityAvailable(getProduct.productTotalQuantityAvailable)
            setFile(getProduct.file)
            setSubCat(getProduct.subCategory.subCategoryName)
        } else {
            document.title = "Add Product"
            setSubCat('')
        }
    }, [productId, products])


    const saveOrUpdateProduct = (e) => {
        e.preventDefault();
        const product = { productName, productDescription, productWeight, productCode, productPrice, productTotalQuantityAvailable, subCategoryName: subCat };
        if (productId)
            //Update
            dispatch(updateProduct({ productId: productId, product: product, file: file })).then(() => navigate("/admin/dashboard/product"), toast.success(`Product Updated Successfuly`))
        else
            dispatch(addProduct({ product: product, file: file })).then(() => navigate("/admin/dashboard/product"))

    }

    const clearForm = (e) => {
        e.preventDefault()
        setProductName('')
        setProductDescription('')
        setproductWeight('')
        setProductCode('')
        setProductPrice('')
        setProductTotalQuantityAvailable('')
        setFile('')
        setSubCat('')
    }

    //formEncType='multipart/form-data'  onChange={(e) => setFile(e.target.files[0])}
    return (
        <div className='container' >
            <div className='card col-md-6 col-md-9 col-lg-9  col-xl-8 col-xxl-8 mx-auto shadow-lg rounded' style={{ backgroundColor: "rgb(207, 236, 236)" }}>
                <div className='card-body '>
                    {
                        productId ? (
                            <h2 className='display-6 text-center'>Update Product</h2>
                        ) : (
                            <h2 className='display-6 text-center'>Add Product</h2>
                        )
                    }
                    <hr />
                    <form onSubmit={(e) => saveOrUpdateProduct(e)} className="px-3 row d-flex gap-3">
                        <div className="form-group  form-floating ">
                            <input type="text" className="form-control" id="productName" placeholder="productName"
                                value={productName} onChange={(e) => setProductName(e.target.value)}
                            />
                            <label htmlFor='productName' className='ms-2'>Product Name :</label>
                        </div>
                        <div className="form-group form-floating">
                            <input type="text" className="form-control col-4 mt-2" id="productDescription" placeholder="productDescription"
                                value={productDescription} onChange={(e) => setProductDescription(e.target.value)}
                            />
                            <label htmlFor="productDescription" className='ms-2'>Description :</label>
                        </div>
                        <div className='d-lg-flex justify-content-between d-lg-grid'>
                            <div className="form-group form-floating col-lg-4 mb-sm-4 mb-lg-0">
                                <input type="number" className="form-control col-4 mt-2" id="productPrice" placeholder="productPrice"
                                    value={productPrice} onChange={(e) => setProductPrice(e.target.value)}
                                />
                                <label htmlFor="productPrice">Price (in <TbCurrencyRupee />) :</label>
                            </div>
                            <div className="form-group form-floating col-lg-4 mb-sm-4 mb-lg-0">
                                <input type="number" className="form-control col-4 mt-2" id="productWeight" placeholder="productWeight"
                                    value={productWeight} onChange={(e) => setproductWeight(e.target.value)}
                                />
                                <label htmlFor="productWeight">Weight (in Kg) :</label>
                            </div>
                            <div className="form-group form-floating col-lg-3 mb-sm-4 mb-lg-0">
                                <input type="number" className="form-control col-4 mt-2" id="productQuantity" placeholder="productQuantity"
                                    value={productTotalQuantityAvailable} onChange={(e) => setProductTotalQuantityAvailable(e.target.value)}
                                />
                                <label htmlFor="productQuantity" >Quantity :</label>
                            </div>
                        </div>
                        <div className='d-lg-flex justify-content-between d-lg-grid'>
                            <div className="form-group form-floating col-lg-6 mb-sm-4 mb-lg-0">
                                <input type="text" className="form-control col-4" id="productCode" placeholder="productCode"
                                    value={productCode} onChange={(e) => setProductCode(e.target.value)}
                                />
                                <label htmlFor='productCode' className='ms-2'>Code :</label>
                            </div>
                            <div className='form-group form-floating col-lg-4 mb-sm-4 mb-lg-0 '>
                                <select className="form-select " aria-label="Default select example" value={subCat} onChange={(e) => setSubCat(e.target.value)} id="subCat"  >
                                    <option defaultValue={() => setSubCat("")}>-- Select --</option>
                                    {
                                        subCategory.map(subCat => (
                                            <option value={subCat.subCategoryName} key={subCat.subCategoryId}>{subCat.subCategoryName}</option>
                                        ))
                                    }
                                </select>
                                <label htmlFor='subCat'>Choose Sub Category</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <input className="form-control col-4 mt-2" type="file" id="formFile" placeholder="productimg" onChange={(e) => setFile(e.target.files[0])} />
                        </div>
                        <div className='gap-3 d-flex justify-content-center mt-4'>
                            <Link className='btn btn-danger' to="/admin/dashboard/product"><IoArrowBack />  Back</Link>
                            <button className="btn btn-secondary" onClick={(e) => clearForm(e)}><GrPowerReset />  Reset</button>
                            {
                                productId ? (
                                    <button className="btn btn-success hover" type='submit'><GrDocumentUpdate />  Update</button>
                                ) : (
                                    <button className="btn btn-success" type='submit'><BsSave2 />  Save</button>
                                )
                            }
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}
export default SaveOrUpdateProduct