import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeCartItem } from '../../redux/slice/cartSlice'
import { getAllCategories, getAllProducts, getAllSubCategory } from '../../redux/slice/categorySlice'
import { toast } from 'react-toastify'
import { TbCurrencyRupee } from 'react-icons/tb'
import { BsCartPlus, BsCartX } from 'react-icons/bs'
import { addProductToWishList, removeProductFromWishList } from '../../redux/slice/wishlistSlice'
import { RiHeart2Fill, RiHeart2Line } from 'react-icons/ri'
import FilterNav from './FilterNav'
import CategoryFilterNav from './CategoryFilterNav'
//import { FcShop } from 'react-icons/fc'

function Home() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cartData.shoppingCart)
    const { login, jwtRequest } = useSelector(state => state.publicData)
    const { products } = useSelector(state => state.categoryData)
    const { wishlist } = useSelector(state => state.wishlistData)

    useEffect(() => {
        document.title = "Products"
        dispatch(getAllProducts())
        dispatch(getAllSubCategory())
        dispatch(getAllCategories())
    }, [dispatch])

    const addProductToCart = (productId) => {
        if (login === true) {
            dispatch(addToCart({ shoppingCartId: cart.shoppingCartId, productId: productId }))
        } else {
            toast.warning("Please Sign In !!!!!")
            navigate('/signin')
        }
    }

    const removeProductFromCart = (productId) => {
        const obj = cart.cartItems.find(c => c.productId === productId)
        dispatch(removeCartItem({ shoppingCartId: cart.shoppingCartId, cartItemsId: obj.cartItemsId }))
    }

    const addToWishList = (productId) => {
        if (login === true) {
            const addorRemoveProductDTO = { wishListId: wishlist.wishListId, productId }
            dispatch(addProductToWishList({ addorRemoveProductDTO }))
                .then(() => toast.success("Product Added To WishList"))
        } else {
            toast.warning("Please Sign In !!!!!")
            navigate('/signin')
        }
    }

    const removeFromWishList = (productId) => {
        const addorRemoveProductDTO = { wishListId: wishlist.wishListId, productId }
        dispatch(removeProductFromWishList({ addorRemoveProductDTO }))
            .then(() => toast.success('Product Removed From Wishlist'))
    }

    //height={"250"} width={"420"} tabindex="-1"
    return (
        <div className='container-fluid'>
            <CategoryFilterNav />
            <br />
            <FilterNav />
            <div className="row row-cols-1 row-cols-md-2  row-cols-lg-3 row-cols-xl-4 g-4 mt-3">
                {
                    products.length !== 0 ? (
                        products && products.map(prod => (
                            <div key={prod.productId}>
                                <div className="col">
                                    <div className="card shadow-lg h-100">
                                        <img className="card-img-top p-2 " src={prod.imageURL} alt={prod.imageURL} height={'240'} width={'140'} />
                                        <div className="card-body">
                                            <div className="card-body p-0 " >
                                                <div className='d-flex justify-content-between'>
                                                    <h5 className="card-title">{prod.productName}</h5>
                                                    <p className="card-text"><em><TbCurrencyRupee />{prod.productPrice}</em></p>
                                                </div>
                                                <p className='card-text'>Products available -  {prod.productTotalQuantityAvailable}</p>
                                                {
                                                    jwtRequest.userInfo.roles !== 'ADMIN' ? (
                                                        <div className='d-grid d-md-flex justify-content-between'>
                                                            {
                                                                cart.cartItems.find(pro => pro.productId === prod.productId) ? (
                                                                    <button className='btn btn-danger col-md-8 col-sm-12'
                                                                        onClick={() => removeProductFromCart(prod.productId)}><BsCartX />
                                                                    </button>
                                                                ) : (
                                                                    <button disabled={prod.productTotalQuantityAvailable === 0} className='btn btn-success col-md-8 col-sm-12'
                                                                        onClick={() => addProductToCart(prod.productId)}><BsCartPlus />
                                                                    </button>
                                                                )
                                                            }
                                                            {
                                                                wishlist.productList.find(({ productId }) => productId === prod.productId) ? (
                                                                    <button className='btn btn-light col-md-3 col-sm-12' style={{ backgroundColor: '#f56ca5' }}
                                                                        onClick={() => removeFromWishList(prod.productId)} ><RiHeart2Fill />
                                                                    </button>
                                                                ) : (
                                                                    <button className='btn btn-light col-md-3 col-sm-12' style={{ backgroundColor: '#f56ca5' }}
                                                                        onClick={() => addToWishList(prod.productId)}><RiHeart2Line />
                                                                    </button>
                                                                )
                                                            }
                                                        </div>
                                                    ) : (<></>)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))) : (
                        <div className='mx-auto'>
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Products Not Found !!</h4>
                                    {/* <p className="card-text">Please Select Another Category</p> */}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
export default Home