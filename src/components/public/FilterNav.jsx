import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { filterProductAbovePrice, filterProductBelowPrice, filterProductByPrice, filterProductByProductName, getAllProducts, sortByProductPriceAscending, sortByProductPriceDescending, sortProductByNameAscending, sortProductByNameDescending } from '../../redux/slice/categorySlice';

function FilterNav() {

    const dispatch = useDispatch()
    const [prodName, setProdName] = useState('')
    const [min, setMin] = useState()
    const [max, setMax] = useState()
    const [belowPrice, setBelowPeice] = useState()
    const [abovePrice, setAbovePrice] = useState()

    const clearPrice = () => {
        setMax('')
        setMin('')
    }

    return (
        <nav className="navbar navbar-expand-lg shadow" style={{ backgroundColor: 'azure' }}>
            <div className="container-fluid">
                <h3 className="navbar-brand mx-auto my-0" onClick={() => dispatch(getAllProducts())}>Filter</h3>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarr" aria-controls="offcanvasNavbarr" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-start " id="offcanvasNavbarr" aria-labelledby="offcanvasNavbarLabel" style={{ backgroundColor: 'goldenrod' }}>
                    <div className="offcanvas-header ">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Filter Products</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className='offcanvas-body'>
                        <ul className="navbar-nav me-auto mb-2 ms-2 mb-lg-0">
                            <div className='d-md-flex flex-md-column flex-lg-row gap-2'>
                                <li className="nav-item dropdown mx-1">
                                    <button className="nav-link dropdown-toggle btn" data-bs-toggle="dropdown" aria-expanded="false">
                                        Search Product
                                    </button>
                                    <ul className="dropdown-menu mt-2 px-3 bg-light" style={{ minWidth: '300px' }}>
                                        <li>
                                            <div className="form-floating mb-3">
                                                <input type="email" className="form-control" id="floatingInput"
                                                    value={prodName} onChange={(e) => setProdName(e.target.value)} placeholder="ProductName"
                                                />
                                                <label htmlFor="floatingInput">Product Name</label>
                                                <div className='d-flex gap-3 mt-2 justify-content-center'>
                                                    <button className="btn btn-success" onClick={() => dispatch(filterProductByProductName({ productName: prodName })).then(() => setProdName(''))}>Search</button>
                                                    <button className='btn btn-danger' onClick={() => setProdName('')}>Clear</button>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                                <li className='nav-item dropdown mx-1'>
                                    <button className="nav-link dropdown-toggle btn" data-bs-toggle="dropdown" aria-expanded="false">
                                        Filter By Price
                                    </button>
                                    <ul className="dropdown-menu mt-2 bg-light" style={{ minWidth: '300px' }}>
                                        <li>
                                            <h6 className='text-center'>Products Below Price</h6>
                                            <div className='d-flex px-3'>
                                                <input className="form-control me-2" type="number" placeholder="Min Price" aria-label="beprice"
                                                    value={belowPrice} onChange={(e) => setBelowPeice(e.target.value)}
                                                />
                                            </div>
                                            <div className='d-flex gap-3 justify-content-center mt-3'>
                                                <button className='btn btn-success' onClick={() => dispatch(filterProductBelowPrice({ price: belowPrice })).then(() => setBelowPeice(''))}>Find</button>
                                                <button className='btn btn-danger' onClick={() => setBelowPeice('')}>Clear</button>
                                            </div>
                                        </li>
                                        <hr />
                                        <li>
                                            <h6 className='text-center'>Products Above Price</h6>
                                            <div className='d-flex px-3'>
                                                <input className="form-control me-2" type="number" placeholder="Max Price" aria-label="abprice"
                                                    value={abovePrice} onChange={(e) => setAbovePrice(e.target.value)}
                                                />
                                            </div>
                                            <div className='d-flex gap-3 justify-content-center mt-3'>
                                                <button className='btn btn-success' onClick={() => dispatch(filterProductAbovePrice({ price: abovePrice })).then(() => setAbovePrice(''))}>Find</button>
                                                <button className='btn btn-danger' onClick={() => setAbovePrice('')}>Clear</button>
                                            </div>
                                        </li>
                                        <hr />
                                        <li>
                                            <h6 className='text-center'>Product Price Range</h6>
                                            <div className="d-flex px-3">
                                                <input className="form-control me-2" type="number" value={min} onChange={(e) => setMin(e.target.value)} placeholder="Min Price" aria-label="min" />
                                                <input className="form-control me-2" type="number" value={max} onChange={(e) => setMax(e.target.value)} placeholder="Max Price" aria-label="max" />
                                            </div>
                                            <div className='d-flex justify-content-center gap-3 mt-3'>
                                                <button className="btn btn-success" onClick={() => dispatch(filterProductByPrice({ minPrice: min, maxPrice: max })).then(() => clearPrice())} >Find</button>
                                                <button className='btn btn-danger' onClick={() => clearPrice()}>Clear</button>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                                <li className='nav-item dropdown mx-1'>
                                    <button className="nav-link dropdown-toggle btn" data-bs-toggle="dropdown" aria-expanded="false">
                                        Sort By Name
                                    </button>
                                    <ul className="dropdown-menu mt-2 bg-light">
                                        <li>
                                            <button className='btn' onClick={() => dispatch(sortProductByNameAscending())}>Ascending Order</button>
                                            <button className='btn' onClick={() => dispatch(sortProductByNameDescending())}>Descending Order</button>
                                        </li>
                                    </ul>
                                </li>
                                <li className='nav-item dropdown mx-1'>
                                    <button className="nav-link dropdown-toggle btn" data-bs-toggle="dropdown" aria-expanded="false">
                                        Sort By Price
                                    </button>
                                    <ul className="dropdown-menu mt-2 bg-light">
                                        <li>
                                            <button className='btn' onClick={() => dispatch(sortByProductPriceAscending())}>Ascending Order</button>
                                            <button className='btn' onClick={() => dispatch(sortByProductPriceDescending())}>Descending Order</button>
                                        </li>
                                    </ul>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default FilterNav