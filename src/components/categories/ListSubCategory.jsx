import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { deleteSubCategory, getAllProducts, getAllSubCategory, saveSubCategory, updateSubCategory } from '../../redux/slice/categorySlice'
import { IoArrowBack } from 'react-icons/io5'
import { GrPowerReset, GrDocumentUpdate } from 'react-icons/gr'
import { BsSave2 } from 'react-icons/bs'
import { RiDeleteBinLine } from 'react-icons/ri'
import { toast } from 'react-toastify'
import { getAllOrders } from '../../redux/slice/orderSlice'
import { unwrapResult } from '@reduxjs/toolkit'

function ListSubCategory() {

    const { subCategoryId } = useParams()
    const [subCategoryName, setSubCategoryName] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const dispatch = useDispatch('')
    const { category, subCategory } = useSelector(state => state.categoryData)

    useEffect(() => {
        dispatch(getAllSubCategory())
    }, [dispatch])

    useEffect(() => {
        if (subCategoryId) {
            const sub = subCategory.find(subCat => subCat.subCategoryId === subCategoryId)
            setSubCategoryName(sub.subCategoryName)
            setCategoryName(sub.category.categoryName)
        } else {
            setCategoryName('')
        }
    }, [subCategoryId, subCategory])

    const addOrUpdateSubCategory = () => {
        const saveSubCategoryDTO = { subCategoryName, categoryName: categoryName }
        if (subCategoryId)
            dispatch(updateSubCategory({ saveSubCategoryDTO: saveSubCategoryDTO, subCategoryId: subCategoryId }))
                .then(unwrapResult)
                .then(() => {
                    setSubCategoryName('')
                    setCategoryName('')
                    toast.success('Sub Category Updated Successsfully')
                }).catch(error => toast.error(error.message))
        else
            dispatch(saveSubCategory(saveSubCategoryDTO))
                .then(unwrapResult)
                .then(response => {
                    toast.success(`${response.subCategoryName} added sucessfully`)
                    setSubCategoryName('')
                    setCategoryName('')
                }).catch(error => toast.error(error.message))


    }

    const removeSubCategory = (subCategoryId) => {
        dispatch(deleteSubCategory({ subCategoryId: subCategoryId }))
            .then(unwrapResult)
            .then(() => {
                toast.success("Sub Category Deleted Successully")
                dispatch(getAllProducts())
                    .then(unwrapResult)
                    .catch(error => toast.error(error.message))
                dispatch(getAllOrders())
                    .then(unwrapResult)
                    .catch(error => toast.error(error.message))
                dispatch(getAllSubCategory())
                    .then(unwrapResult)
                    .catch(error => toast.error(error.message))
            }).catch(error => toast.error(error.message))
    }

    const onClearFun = () => {
        setSubCategoryName('')
        setCategoryName('')
    }

    //style={{ width: '450px' }}
    return (
        <section>
            <div className="card shadow-lg" style={{ backgroundColor: 'lightcyan' }}>
                <h4 className="card-title mx-auto mt-1 mb-0">Sub Category</h4>
                <hr />
                <div className='row d-flex justify-content-center mx-3 gy-5'>
                    <div className='col-lg-5 col-12'>
                        <div className="card-body" style={{ backgroundColor: 'aqua' }}>
                            {
                                subCategoryId ? (
                                    <h5 className='text-center'>Update Sub Category</h5>
                                ) : (
                                    <h5 className='text-center'>Add New Sub Category</h5>
                                )
                            }
                            <br />
                            <form >
                                <div className="form-group form-floating ">
                                    <input type="text" className="form-control" id="subcategory" placeholder="subCategory"
                                        value={subCategoryName} onChange={(e) => setSubCategoryName(e.target.value)}
                                    />
                                    <label htmlFor="productPrice">Sub Category Name</label>
                                </div>
                                <br />
                                <div className='form-group form-floating'>
                                    <select className="form-select" aria-label="Default select example" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} id="categoryName">
                                        <option defaultValue={() => setCategoryName("")}>-- Select --</option>
                                        {
                                            category.map(cat => (
                                                <option value={cat.categoryName} key={cat.categoryId}>{cat.categoryName}</option>
                                            ))
                                        }
                                    </select>
                                    <label htmlFor='categoryName'>Category</label>
                                </div>
                            </form>
                            <br />
                            <div className='d-flex gap-3 justify-content-center'>
                                {
                                    subCategoryId ? (
                                        <button className='btn btn-sm btn-success' onClick={() => addOrUpdateSubCategory()}><BsSave2 /> Update</button>
                                    ) : (
                                        <button className='btn btn-sm btn-success' onClick={() => addOrUpdateSubCategory()}><GrDocumentUpdate /> Save</button>
                                    )
                                }
                                <button className='btn btn-sm btn-danger' onClick={() => onClearFun()}><GrPowerReset /> Clear</button>
                                {
                                    subCategoryId ? (
                                        <Link to={'/admin/dashboard/subcategory'} className='btn btn-sm btn-secondary' onClick={() => setSubCategoryName('')}><IoArrowBack /> Cancle Update</Link>
                                    ) : (<></>)
                                }
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-7 col-md-11 col-12'>
                        <div className='card-body' style={{ backgroundColor: 'aqua' }}>
                            <h5 className='text-center'>Sub Category List</h5>
                            <div className='overflow-auto' style={{ maxHeight: '650px', scrollbarWidth: 'none' }} >
                                {
                                    subCategory && subCategory.map(subCat => (
                                        <div className="accordion" id='accordionFlushExample' key={subCat.subCategoryId}>
                                            <div className="accordion-item col-11 mx-auto" style={{ backgroundColor: 'whitesmoke' }}>
                                                <h2 className="accordion-header " id={`name-${subCat.subCategoryName}`} >
                                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#id-${subCat.subCategoryId}`} aria-expanded="true" aria-controls={`id-${subCat.subCategoryId}`}>
                                                        <em style={{ fontWeight: '10' }}>{subCat.subCategoryName}</em>
                                                    </button>
                                                </h2>
                                                <div id={`id-${subCat.subCategoryId}`} className="accordion-collapse collapse" aria-labelledby={`name-${subCat.subCategoryName}`} data-bs-parent="#accordionFlushExample">
                                                    <div className="accordion-body">
                                                        <div className='d-flex justify-content-center gap-3 mb-2'>
                                                            <Link to={`${subCat.subCategoryId}`} className='btn btn-sm btn-warning'><GrDocumentUpdate /> Update</Link>
                                                            <button className='btn btn-sm btn-danger' onClick={() => removeSubCategory(subCat.subCategoryId)}><RiDeleteBinLine />Delete
                                                            </button>
                                                        </div>
                                                        <div className='d-flex'>
                                                            <h6 >SubCategory Id:-</h6>
                                                            <span>{subCat.subCategoryId}</span>
                                                        </div>
                                                        <div className='d-flex'>
                                                            <h6 >Category Id:-</h6>
                                                            <span>{subCat.category.categoryId}</span>
                                                        </div>
                                                        <div className='d-flex'>
                                                            <h6 >Category Name:- </h6>
                                                            <span>{subCat.category.categoryName}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <br /><br />
                <div className='d-flex justify-content-center'>
                    <Link to={'/admin/dashboard'} className='btn btn-danger'><IoArrowBack /> Back</Link>
                </div>
                <br />
            </div>
        </section>
    )
}

export default ListSubCategory