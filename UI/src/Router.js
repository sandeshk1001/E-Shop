import React from 'react';
import { BrowserRouter ,Routes , Route } from 'react-router-dom'
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
import AdminHome from './pages/admin/AdminHome';

function Router(){

    return(
        <>
        <BrowserRouter>
            <Navbar/>
            <Routes>         
                <Route path="/*" element={<PageNotFound/>}/>                                                         
                <Route path="/" element={<Home/>}/>
                <Route path="/productList" element={<ListOfProduct/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/category" element={<Categories/>}/>
                <Route path="/product/:productid" element={<Product/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/payment/failed" element={<PaymentFailed/>}/>
                <Route path="/checkout/detail" element={<CheckoutDetails/>}/>
                <Route path="/order/summary" element={<Ordersummary/>}/>
                <Route path="/payment/success/:session_id" element={<PaymentSuccess/>}/>

                {/* Admin  */}
                <Route path="/admin/login" element={<AdminLogin/>}/>
                <Route path="/admin/home" element={<AdminHome></AdminHome>}/>

            </Routes>
            <Footer/>
        </BrowserRouter>
        </>
    )
}
export default Router;