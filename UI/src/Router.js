import React from 'react';
import { connect } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/LogIn';
import ListOfProduct from './component/ListOfProducts';
import Home from './pages/Home';
import Navbar from './component/Navbar';
import Register from './pages/Register';
import Categories from './component/Category';
import Product from './pages/Product';
import Cart from './pages/Cart';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import PageNotFound from './pages/PageNotFound';
import Footer from './component/Footer';
import CheckoutDetails from './pages/CheckoutDetails';
import Ordersummary from './pages/Ordersummary';
import AdminLogin from './pages/admin/AdminLogin';
import Products from './pages/ProductList';
import Pro from './component/ProductCard';
// Admin dashboard Pages
import HomeAdmin from './dashboard/pages/home/Home';
import List from './dashboard/pages/list/List'
import Single from './dashboard/pages/single/Single';
import New from './dashboard/pages/new/New';
import ProductNew from './dashboard/pages/new/ProductNew';
import { productInputs, userInputs } from "./dashboard/formSource";
import ProductList from './dashboard/pages/list/ProductList'
function Router(props) {
    var role = props.user.role ? props.user.role : "USER";

    return (
        <>
            <BrowserRouter>
                {props.user.role == 'ADMIN' ? <></> : <Navbar />}
                <Routes>
                    <Route path="/*" element={<PageNotFound />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/ListOfProduct" element={<ListOfProduct />} />
                    <Route path="/Products" element={<Products/>} />
                    <Route path="/items" element={<Pro/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/category" element={<Categories />} />
                    <Route path="/product/:productid" element={<Product />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/payment/failed" element={<PaymentFailed />} />
                    <Route path="/checkout/detail" element={<CheckoutDetails />} />
                    <Route path="/order/summary" element={<Ordersummary />} />
                    <Route path="/payment/success/:session_id" element={<PaymentSuccess />} />

                    {/* Admin  */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/home" element={<HomeAdmin />} />
                    <Route path="/admin/">
                        <Route path="users">
                            <Route index element={<List/>} />
                            <Route path=":userId" element={<Single />} />
                            <Route
                                path="new"
                                element={<New inputs={userInputs} title="Add New User" />}
                            />
                        </Route>
                        <Route path="products">
                            <Route index element={<ProductList />} />
                            <Route path=":productId" element={<Single />} />
                            <Route
                                path="new"
                                element={<ProductNew inputs={productInputs} title="Add New Product" />}
                            />
                        </Route>
                    </Route>
            </Routes>
            {props.user.role == 'ADMIN' ? <></> : <Footer />}
        </BrowserRouter>
        </>
    )
}
export default connect(function (state, props) {
    if (state != null)
        return {
            user: state["user"]
        }
    else
        return {
            isLogin: false,
            cart: [],
            user: {}
        };

})(Router);