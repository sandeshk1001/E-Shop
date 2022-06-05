import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const Container = styled.div`
margin-top:40px;
text-align:center;
background-color:#90EE90;
margin-top:50px;
`;

const PaymentSuccess = () => {
  let check=[];
  toast.configure()
  var params = useParams()
  var sessionid = params.session_id;
  var checkoutList = JSON.parse(localStorage.getItem("checkoutData"));
  let token = localStorage.getItem("token") ? localStorage.getItem("token") : null;
  var cartList = localStorage.getItem("cartList") ? JSON.parse(localStorage.getItem("cartList")) : [];
  let [resMessage, setResMessage] = useState(null);

  useEffect(() => {
    // sessionDataFetch(sessionid);      
    if (checkoutList !== "" || checkoutList !== null) {
      axios({
        url: "http://localhost:8080/order/get/" + sessionid,
        method: "get"
      }).then((res) => {
        console.log(res.data);
        checkoutList.status = res.data.message;
        if(saveOrder() == true){
          console.log("Saved data")
        }
        // setTimeout(2000)
      }).catch((error) => console.log(error))
    }
    //setResMessage("errorrrrrr")
  }, check)

  function sessionDataFetch(sessionid){
      if(checkoutList !== "" || checkoutList !== null){
          axios({
              url: "http://localhost:8080/order/get/"+sessionid,
              method: "get"
            }).then((res)=>{
              console.log(res.data);
              checkoutList.status=res.data.message;
              // removeCartItem();
              saveOrder();
            }).catch((error)=>console.log(error))
      }
      // setResMessage("errorrrrrr")        
    }

  function saveOrder() {
    axios({
      url: "http://localhost:8080/order/create",
      method: "post",
      headers: { token: token },
      data: checkoutList
    }).then((res) => {
      console.log(res);
      setResMessage(res.data.message);
      // localStorage.removeItem("checkoutData")
      // window.setTimeout(function(){
      //     window.location.href = '/';
      //  }, 5000);
      toast.success("Order Success Placed", { position: toast.POSITION.TOP_CENTER })
      return true;
    }).catch((error) => {
    return false;
    console.log(error)})
  }

  function removeCartItem() {
    axios({
      url: "http://localhost:8080/cart/deleteAll",
      method: "delete",
      headers: { token: token },
      data: cartList
    }).then((res) => {
      console.log(res);
      // setResMessage(res.data.message);
      // localStorage.removeItem("cartList")
    }).catch((error) => console.log(error))
  }

  return (
    <div>
      <Container>
        <h5>{resMessage}</h5>
        {/* <a>click</a> */}
      </Container>
    </div>
  );
}

export default PaymentSuccess;