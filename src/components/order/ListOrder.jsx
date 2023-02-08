import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { filterOrderByCurrentDate, filterOrderByProductName, filterOrderByUserId, getAllOrders, getReverseOrder } from '../../redux/slice/orderSlice'
import { useState } from 'react'
import { TbCurrencyRupee } from 'react-icons/tb'
import { IoArrowBack } from 'react-icons/io5'
//import { AiOutlineCloseCircle } from 'react-icons/ai'

function ListOrder() {

    //const [name, setName] = useState('')
    const [userId, setUserId] = useState('')
    const dispatch = useDispatch()
    const orders = useSelector(state => state.orderData.orderDetails)
    const { products } = useSelector(state => state.categoryData)

    const getProductDetails = (productId, name) => {
        const product = products.find(prod => prod.productId === productId)
        switch (name) {
            case 'image':
                return product.imageURL

            case 'name':
                return product.productName

            case 'price':
                return product.productPrice

            default:
                break;
        }
    }

    const filterByProductName = (productName) => {
        dispatch(filterOrderByProductName({ productName }))
        //  setName(productName)
    }

    // const removeProductName = () => {
    //     dispatch(getAllOrders())
    //     setName('')
    //     setUserId('')
    // }

    return (
        <div className='card shadow-lg col-md-12 col-lg-10 col-12 col-xxl-9 mx-auto' style={{ backgroundColor: "linen" }}>
            <h4 className='card-title display-6 text-center mb-0 mt-1'>Orders</h4>
            <hr />
            <div className='card-body' >
                <ul className="nav mb-4 gap-2 mx-auto shadow" style={{ backgroundColor: 'lightcyan' }}>
                    <li className="nav-item" >
                        <button className=' btn' onClick={() => dispatch(getAllOrders())}><strong>Filter: </strong></button>
                    </li>
                    <li className='nav-item btn' onClick={() => dispatch(filterOrderByCurrentDate())} style={{ color: 'darkmagenta' }}>Today's Orders</li>
                    <li className="nav-item" >
                        <div className="dropdown">
                            <button className="btn  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: 'darkmagenta' }}>
                                All Orders
                            </button>
                            <ul className="dropdown-menu">
                                <li className='dropdown-item' onClick={() => dispatch(getAllOrders())}>Latest Orders</li>
                                <li className='dropdown-item' onClick={() => dispatch(getReverseOrder())}>Old Orders</li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <div className="dropdown">
                            <button className="btn  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: 'darkmagenta' }}>
                                Product Name
                            </button>
                            <ul className="dropdown-menu">
                                {
                                    products.map(prod => (
                                        <div key={prod.productId}>
                                            <li>
                                                <span className="dropdown-item " onClick={() => filterByProductName(prod.productName)}>
                                                    {prod.productName}
                                                </span>
                                            </li>
                                        </div>
                                    ))
                                }
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <div className="dropdown">
                            <button className="btn  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: 'darkmagenta' }}>
                                User
                            </button>
                            <ul className="dropdown-menu px-2" style={{ width: '250px' }}>
                                <span>Please Enter User Id</span>
                                <li className='d-flex flex-column gap-3 pt-2' >
                                    <input type="text" name="userId" className='ps-2' value={userId} onChange={(e) => setUserId(e.target.value)} />
                                    <div className='d-flex gap-2 justify-content-center'>
                                        <button className='btn btn-success btn-sm' onClick={() => dispatch(filterOrderByUserId({ userId: userId })).then(() => setUserId(''))}>Search</button>
                                        <button className='btn btn-danger btn-sm' onClick={() => setUserId('')}>Reset</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                    {/* {
                        name !== '' ? (
                            <div className='ms-auto'>
                                <li className='nav-item'>
                                    <button className='btn nav-link ' onClick={() => removeProductName()}>{name} <AiOutlineCloseCircle /></button>
                                </li>
                            </div>
                        ) : (<></>)
                    } */}
                </ul>
                <div className='overflow-auto' style={{ maxHeight: '700px', padding: '15px', scrollbarWidth: 'none' }} >
                    {
                        orders.length !== 0 ? (
                            orders.map(ord => (
                                <div key={ord.orderId}>
                                    <div className="card mb-3 bg-light shadow" >
                                        <div className="row g-0">
                                            <div className="col-md-2">
                                                <img src={getProductDetails(ord.productId, 'image')} className="img-fluid rounded-start p-2" alt="..." style={{ width: '170px', height: '132px' }} />
                                            </div>
                                            <div className="col-md-10">
                                                <div className="card-body row">
                                                    <div className='col-7 m-0'>
                                                        <p className="card-title mb-0"><strong>Order Id :</strong> {ord.orderId}</p>
                                                        <p className="card-title mb-0"><strong>User Id : </strong>{ord.userId}
                                                            {/* <Link to={`${ord.userId}`} className=' btn-link '>{ord.userId} </Link> */}
                                                        </p>
                                                        <p className='mb-0'><strong>Total: </strong><TbCurrencyRupee />{ord.totalPrice}</p>

                                                    </div>
                                                    <div className='col-5'>
                                                        <p className='mb-0'><strong>Product Name: </strong>{getProductDetails(ord.productId, 'name')}</p>
                                                        <p className='mb-0'><strong>Price: </strong><TbCurrencyRupee />{getProductDetails(ord.productId, 'price')}</p>
                                                        <p className='mb-0'><strong>Quantity: </strong>{ord.productQuantity}</p>
                                                    </div>
                                                    <p className="card-text mt-1">
                                                        <small className="text-muted">Created on {ord.orderCreatedAt}</small>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='container'>
                                <div className='card card-body' style={{ height: '250px' }}>
                                    <div className='d-flex justify-content-center'>
                                        <h3>No Orders Found !!!!</h3>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className='d-flex col-8 mx-auto justify-content-center my-3'>
                <Link to={"/admin/dashboard"} className="btn btn-danger col-4"><IoArrowBack />  Back</Link>
            </div>
        </div>
    )
}
export default ListOrder