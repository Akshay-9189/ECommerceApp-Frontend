import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterProductbySubCatName, getAllProducts } from '../../redux/slice/categorySlice'

function CategoryFilterNav() {

    const dispatch = useDispatch()
    const { category, subCategory } = useSelector(state => state.categoryData)

    return (
        <nav className="navbar navbar-expand-lg shadow" style={{ backgroundColor: 'azure' }}>
            <div className="container-fluid">
                <h3 className="navbar-brand mx-auto my-0" onClick={() => dispatch(getAllProducts())}>Categories</h3>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar1" aria-controls="offcanvasNavbar1" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-start " id="offcanvasNavbar1" aria-labelledby="offcanvasNavbarLabel" style={{ backgroundColor: 'goldenrod' }}>
                    <div className="offcanvas-header ">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">All Categories</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className='offcanvas-body'>
                        <ul className="navbar-nav me-auto mb-2 ms-2 mb-lg-0">
                            {
                                category.length !== 0 ? (
                                    <>
                                        {
                                            category && category.map(cat => (
                                                <div key={cat.categoryId}>
                                                    <li className="nav-item dropdown mx-1">
                                                        <button className="nav-link dropdown-toggle btn" data-bs-toggle="dropdown" aria-expanded="false">
                                                            {cat.categoryName}
                                                        </button>
                                                        <ul className="dropdown-menu mt-2" >
                                                            {
                                                                subCategory && subCategory.map(sub => (
                                                                    <div key={sub.subCategoryId}>
                                                                        {
                                                                            cat.categoryId === sub.category.categoryId ? (
                                                                                <li>
                                                                                    <button className="btn dropdown-item" onClick={() => dispatch(filterProductbySubCatName({ subCategoryName: sub.subCategoryName }))}>
                                                                                        {sub.subCategoryName}
                                                                                    </button>
                                                                                </li>
                                                                            ) : (<></>)
                                                                        }
                                                                    </div>
                                                                ))
                                                            }
                                                        </ul>
                                                    </li>
                                                </div>
                                            ))
                                        }
                                    </>
                                ) : (<></>)
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default CategoryFilterNav