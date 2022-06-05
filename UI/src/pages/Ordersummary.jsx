import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import styled from "styled-components";
import { useEffect, useState } from "react";
import { mobile } from "../responsive";
import axios from 'axios';
// import { SpinnerDotted } from 'spinners-react';

const Container = styled.div`
    padding-top:30px;
`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  width:100%;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;


const Ordersummary = ()=> {
    let token =localStorage.getItem("token") ? localStorage.getItem("token") :null;
  
    var [order, setOrder] = useState([])
    var orders = [{
        orderid :1,
        price:100,
        mode:1,
        name:"sandesh",
        phone:"7828240652",
        pincode:"455001",
        address:"Dewas",
        city:"Dewas",
        cakes:[{
            image:"/products/placeholder.png",
            price:"50",
            name:"aaa",
            quantity:"2",
        }]
    }]
    // var [spinner, setSpinner] = useState(false)

    useEffect(()=>{
        axios({
            url:"http://localhost:8080/order/getOrderList",
            method: "get",
            headers: {token:token}
        }).then((res) =>{
            console.log(res)
            setOrder(res.data)
            console.log(res.data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate)))
        }).catch((error) =>{console.log(error)})
    },[])
    return (<>
        <Container>
            <center>
                <h1 style={{ textAlign: "center" }}>Orders ({order.length})</h1>
            </center>
            <Wrapper>
                <Accordion defaultActiveKey="0" style={{ width: "100%" }}>
                    {
                        order.map((each, index) => {
                            return (<>
                                <Accordion.Item eventKey={each.orderId} >
                                    <Accordion.Header style={{ width: "100%" }}> Item #{each.orderId}  Price ({each.totalAmount})</Accordion.Header>
                                    <Accordion.Body style={{ backgroundColor: "white", paddingLeft: "30px" }}>
                                        <div class="card-body">
                                            <div class="row m-0">
                                                <div class="col-md-6">
                                                    <b>Order Information</b>
                                                    <div>Price: ₹ {each.totalAmount}</div>
                                                    <div>Payment mode: {each.status}</div>
                                                    <div>Status: Pending</div>
                                                    <div>Purchased on: {each.totalAmount}</div>
                                                </div>
                                                <div class="col-md-6"><b>Shipping Address:</b>
                                                    <div>Sandesh Kumawat</div>
                                                    <div>Phone: 7878787878</div>
                                                    <div>Dewas, Dewas, 455001</div>
                                                </div>
                                            </div>
                                            <br />
                                            <div class="col-md-12">
                                                <div class="title">
                                                    <div class="row m-0">
                                                        <div class="col"><h6><b>Items</b></h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    each.products.map((item, i) => {
                                                        //console.log(eachcake);
                                                        return (<>
                                                            <div class="row m-0">
                                                                <div class="row main align-items-center">
                                                                    <div class="col-2">
                                                                        <img class="" src={item.product.imageUrl} alt="" width="60" height="60" />
                                                                    </div>
                                                                    <div class="col">
                                                                        <div class="row">{item.product.name}</div>
                                                                    </div>
                                                                    <div class="col">Qty: <span class="btn btn-sm border ml-2 mr-2 qty">{item.quantity}</span>
                                                                    </div>
                                                                    <div class="col">₹ {item.product.unitPrice}</div>
                                                                </div>
                                                            </div>
                                                        </>)
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </>)
                        })
                    } 
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Accordion Item #2</Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                            est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Wrapper>
        </Container>
    </>)
}
export default Ordersummary;