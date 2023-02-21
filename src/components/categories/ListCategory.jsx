import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { deleteCategory, getAllCategories, getAllProducts, getAllSubCategory, saveCategory, updateCategory } from '../../redux/slice/categorySlice'
import { IoArrowBack } from 'react-icons/io5'
import { RiDeleteBinLine } from 'react-icons/ri'
import { GrPowerReset, GrDocumentUpdate } from 'react-icons/gr'
import { BsSave2 } from 'react-icons/bs'
import { toast } from 'react-toastify'
import { getAllOrders } from '../../redux/slice/orderSlice'
import { unwrapResult } from '@reduxjs/toolkit'

function ListCategory() {

    const { categoryId } = useParams()
    const [categoryName, setCategoryName] = useState('')
    const dispatch = useDispatch('')
    const { category } = useSelector(state => state.categoryData)

    useEffect(() => {
        dispatch(getAllCategories())
            .then(unwrapResult)
            .catch(error => toast.error(error.message))
    }, [dispatch])


    useEffect(() => {
        if (categoryId) {
            const name = category.find(cat => cat.categoryId === categoryId).categoryName
            setCategoryName(name)
        }
    }, [categoryId, category])

    const addOrUpdateCategory = () => {
        const category = { categoryName }
        if (categoryId) {
            dispatch(updateCategory({ categoryId: categoryId, category: category }))
                .then(unwrapResult)
                .then(response => toast.success(`Category ${response.categoryName} Updated Successfully`))
                .catch(error => toast.error(error.message))
        } else {
            dispatch(saveCategory(category))
                .then(unwrapResult)
                .then(response => {
                    toast.success(`${response.categoryName} added Successfully`)
                    setCategoryName('')
                }).catch(error => toast.error(error.message))
        }
    }

    const removeCategory = (categoryId) => {
        dispatch(deleteCategory({ categoryId: categoryId }))
            .then(unwrapResult)
            .then(() => {
                toast.success("Category Deleted Successfully")
                dispatch(getAllProducts())
                    .then(unwrapResult)
                    .catch(error => toast.error(error.message))
                dispatch(getAllOrders())
                    .then(unwrapResult)
                    .catch(error => toast.error(error.message))
                dispatch(getAllSubCategory())
                    .then(unwrapResult)
                    .catch(error => toast.error(error.message))
                dispatch(getAllCategories())
                    .then(unwrapResult)
                    .catch(error => toast.error(error.message))
            }).catch(error => toast.error(error.message))
    }

    //col-lg-6 col-md-11 col-12
    return (
        <section>
            <div className="card shadow-lg" style={{ backgroundColor: 'lightpink' }}>
                <h4 className="card-title mx-auto mt-1 mb-0">Category</h4>
                <hr />
                <div className="card-body ">
                    <div className='row d-flex justify-content-center gy-5'>
                        <div className='col-lg-5 col-12'>
                            <div className='bg-light' >
                                <br />
                                {
                                    categoryId ? (
                                        <h5 className='text-center mb-4'>Update Category</h5>
                                    ) : (
                                        <h5 className='text-center mb-4'>Add New Category</h5>
                                    )
                                }
                                <div className="form-floating col-10 mx-auto">
                                    <input type="text" className="form-control" id="category" placeholder="category"
                                        value={categoryName} onChange={(e) => setCategoryName(e.target.value)}
                                    />
                                    <label htmlFor="productPrice">Category Name</label>
                                </div>
                                <br />
                                <div className='d-flex gap-3 justify-content-center'>
                                    {
                                        categoryId ? (
                                            <button className='btn btn-sm btn-success' onClick={() => addOrUpdateCategory()}><GrDocumentUpdate /> Update</button>
                                        ) : (
                                            <button className='btn btn-sm btn-success' onClick={() => addOrUpdateCategory()}><BsSave2 /> Save</button>
                                        )
                                    }
                                    <button className='btn btn-sm btn-danger' onClick={() => setCategoryName('')}><GrPowerReset /> Clear</button>
                                    {
                                        categoryId ? (
                                            <Link to={'/admin/dashboard/category'} className='btn btn-sm btn-secondary' onClick={() => setCategoryName('')}><IoArrowBack /> Cancel Update</Link>
                                        ) : (<></>)
                                    }
                                </div>
                                <br />
                            </div>
                        </div>
                        <div className='col-lg-7 col-md-11 col-12'>
                            <div className='bg-light'>
                                <br />
                                <h5 className='text-center mb-4'>Category List</h5>
                                <div className='overflow-auto' style={{ maxHeight: '450px', padding: '15px', scrollbarWidth: 'none' }}>
                                    <div className='table-responsive mx-auto px-3'>
                                        <table className="table table-bordered table-striped table-hover border-dark">
                                            <thead className='align-middle bg-secondary'>
                                                <tr className='text-center'>
                                                    <th>Category ID</th>
                                                    <th>Category Name</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className='text-center align-middle' style={{ backgroundColor: 'ButtonHighlight' }}>
                                                {
                                                    category && category.map(cat => (
                                                        <tr key={cat.categoryId}>
                                                            <td>{cat.categoryId}</td>
                                                            <td>{cat.categoryName}</td>
                                                            <td>
                                                                <div className='d-flex justify-content-between gap-2'>
                                                                    <Link to={`${cat.categoryId}`} className='btn btn-sm btn-warning'><GrDocumentUpdate /> Update</Link>
                                                                    <button className='btn btn-sm btn-danger' onClick={() => removeCategory(cat.categoryId)}><RiDeleteBinLine /> Delete
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
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className='d-flex justify-content-center'>
                    <Link to={'/admin/dashboard'} className='btn btn-danger'><IoArrowBack /> Back</Link>
                </div>
                <br />
            </div>
        </section>
    )
}
export default ListCategory