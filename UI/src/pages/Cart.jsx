import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../component/Announcement";
import { mobile } from "../responsive";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import { connect } from "react-redux";
import { toast } from 'react-toastify';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 55vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

function Cart(props) {

  toast.configure()
  var [cartList, setCartList] = useState([]);
  var [totalPrice, setTotalPrice] = useState(0);
  var [user, setUser] = useState({})
  var [checkoutList, setCheckoutList] = useState([]);
  var [checkoutProductList, setCheckoutProductList] = useState([]);
  var checkoutData = {
    products: [],
    status: "",
    totalAmount: ""
  }
  let token = localStorage.getItem("token") ? localStorage.getItem("token") : null;
  useEffect(() => {
    dataFetch();
  }, [])

  function dataFetch() {
    axios({
      url: "http://localhost:8080/cart/get",
      method: "get",
      headers: { token: token }
    }).then((res) => {
      console.log(res);
      props.dispatch({
        type: "CART",
        payload: res.data
      })
      setCartList(res.data.products)
      setTotalPrice(res.data.totalPrice)
    }).catch((error) => console.log(error))
  }

  function increaseQuantity(value) {
    value.quantity += 1;
    axios({
      url: "http://localhost:8080/cart/update",
      method: "put",
      data: value,
      headers: { token: token }
    }).then((res) => {
      dataFetch();
      console.log(res);
    }).catch((error) => console.log(error))
  }

  function decreaseQuantity(value) {
    if (value.quantity === 1)
      alert("quantity not 0")
    else {
      value.quantity -= 1;
      axios({
        url: "http://localhost:8080/cart/update",
        method: "put",
        data: value,
        headers: { token: token }
      }).then((res) => {
        dataFetch();
        console.log(res);
      }).catch((error) => console.log(error))
    }
  }

  function removeItemFromCart(value) {
    axios({
      url: "http://localhost:8080/cart/delete/" + value.id,
      method: "delete",
      headers: { token: token }
    }).then((res) => {
      alert(res.data.message)
      dataFetch();
    }).catch((error) => console.log(error))

  }

  function checkout() {
    console.log(cartList)
    if (cartList.length != 0) {
      cartList.map((value) => (
        checkoutList.push({
          productId: value.product.id,
          userId: user.id,
          quantity: value.quantity,
          productName: value.product.name,
          price: value.product.unitPrice
        })
      ))
      cartList.map((value) => (
        checkoutProductList.push(value)
      ))
      checkoutData.products = checkoutProductList;
      checkoutData.status = "pending";
      checkoutData.totalAmount = totalPrice;
      localStorage.setItem("checkoutData", JSON.stringify(checkoutData))
      localStorage.setItem("cartList", JSON.stringify(cartList))
      saveDatabase(checkoutData, token)
      removeCartItem(cartList, token)
    } else {
      toast.warn("Cart is Empty", { position: toast.POSITION.TOP_CENTER })
    }
  }

  function saveDatabase(checkoutData, token) {
    axios({
      url: "http://localhost:8080/order/create",
      method: "post",
      headers: { token: token },
      data: checkoutData
    }).then((res) => {
      console.log(res);
      localStorage.removeItem("checkoutData")
      alert("order hab been Placed")
      window.setTimeout(function () {
        window.location.href = '/';
      }, 1000);
    }).catch((error) => {
      console.log(error)
    })
  }

  function removeCartItem() {
    axios({
      url: "http://localhost:8080/cart/deleteAll",
      method: "delete",
      headers: { token: token },
      data: cartList
    }).then((res) => {
      console.log(res);
      localStorage.removeItem("cartList")
    }).catch((error) => console.log(error))
  }

  function paymentCheckout(checkoutList, token) {
    axios({

      url: "http://localhost:8080/order/create-checkout-session",
      method: "post",
      data: checkoutList,
      headers: { token: token }
    }).then((res) => {
      window.location.href = res.data.url;
    }).catch((error) => console.log(error))
  }

  return (
    <Container>
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={checkout}>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag({cartList.length})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {
              cartList.map((value) => (
                <Product>
                  <ProductDetail>
                    <Image src={value.product.imageUrl} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {value.product.name}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {value.product.id}
                      </ProductId>
                      <ProductColor color="black" />
                      <ProductSize>
                        <b>Size:</b> 37.5
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Add onClick={() => increaseQuantity(value)} />
                      <ProductAmount>{value.quantity}</ProductAmount>
                      <Remove onClick={() => decreaseQuantity(value)} />
                    </ProductAmountContainer>
                    <ProductPrice>₹ {value.product.unitPrice}</ProductPrice>
                  </PriceDetail>
                  <PriceDetail>
                    <DeleteIcon onClick={() => { removeItemFromCart(value) }} />
                  </PriceDetail>
                </Product>
              ))
            }
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>₹ {totalPrice}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>₹ 0.0</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>₹ 0.0</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>₹ {totalPrice}</SummaryItemPrice>
            </SummaryItem>
            <Button onClick={checkout}>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <br /><br />
    </Container>
  );
};

export default connect(function (state, props) {
  return {
    cartData: state["cart"]
  }
})(Cart);