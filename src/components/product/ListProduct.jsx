import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteProduct, getAllProducts } from '../../redux/slice/categorySlice'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { IoArrowBack } from 'react-icons/io5'
import { GrDocumentUpdate, GrView } from 'react-icons/gr'
import { RiDeleteBinLine } from 'react-icons/ri'
import { TbCurrencyRupee } from 'react-icons/tb'
import { toast } from 'react-toastify'

function ListProduct() {

    const dispatch = useDispatch()
    const { products } = useSelector(state => state.categoryData)

    useEffect(() => {
        document.title = "Manage Products"
        dispatch(getAllProducts())
    }, [dispatch])

    return (
        <div className='container'>
            <div className='card shadow-lg' style={{ backgroundColor: "floralwhite" }}>
                <h4 className='card-title display-6 text-center'>Product List</h4>
                <hr />
                <div className='card-body' >
                    <div className='mx-3'>
                        <div className='d-grid gap-3 d-md-flex'>
                            <Link to={"add"} className='btn btn-info'><MdOutlineAddCircleOutline />  Add Product</Link>
                            <Link to={"/admin/dashboard"} className="btn btn-danger"><IoArrowBack />  Back</Link>
                        </div>
                        {
                            products.length !== 0 ? (
                                <div className='mt-5 table-responsive col-10 mx-auto' >
                                    <div className='overflow-auto' style={{ maxHeight: '800px', scrollbarWidth: 'none' }}>
                                        <table className="table table-bordered table-striped table-hover  border-dark" style={{ backgroundColor: "rgb(247, 229, 232)" }}>
                                            <thead className='table-dark align-middle'>
                                                <tr className='text-center'>
                                                    {/* <th className='col-1'>ID</th> */}
                                                    <th className='col-1'>Image</th>
                                                    <th className='col-1'>Name</th>
                                                    <th className='col-1'>Category</th>
                                                    <th className='col-1'>Sub Category</th>
                                                    <th className='col-1'>Price</th>
                                                    <th className='col-1'>Total Quantity Available</th>
                                                    <th className='col-2'>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className='text-center align-middle'>
                                                {products &&
                                                    products.map(prod => (
                                                        <tr key={prod.productId}>

                                                            {/* <td >{prod.productId}</td> */}
                                                            <td><img src={prod.imageURL} alt="imageURL" width="80px" height="80px" /></td>
                                                            <td>{prod.productName}</td>
                                                            <td>{prod.subCategory.category.categoryName}</td>
                                                            <td>{prod.subCategory.subCategoryName}</td>
                                                            <td><TbCurrencyRupee />{prod.productPrice}</td>
                                                            <td>{prod.productTotalQuantityAvailable}</td>
                                                            <td>
                                                                <div className='d-grid gap-2 d-xxl-flex justify-content-center'>
                                                                    <Link className='btn btn-secondary ' to={`${prod.productId}`}><GrView /> View</Link>
                                                                    <Link className='btn btn-warning' to={`update/${prod.productId}`}><GrDocumentUpdate />Update</Link>
                                                                    <button className='btn btn-danger' onClick={() => dispatch(deleteProduct({ productId: prod.productId }))
                                                                        .then(() => toast.success(`Product Deleted Successfully`))}><RiDeleteBinLine />Delete
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : (
                                <div className="card mt-4 col-8 mx-auto">
                                    <div className="card-body" style={{ minHeight: '300px' }}>
                                        <h4 className="card-title text-center">Products Not Available !!!!</h4>
                                        <p className="card-text text-center">Please Add Product</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ListProduct