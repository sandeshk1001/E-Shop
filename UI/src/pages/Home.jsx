import Announcement from '../component/Announcement';
import React, { useEffect } from 'react';
import Slider from './Slider';
import Categories from '../component/Category';
import Products from '../component/Products';
import Newsletter from '../component/Newsletter';
import { connect } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';

function Home(props) {
  
  let token =localStorage.getItem("token") ? localStorage.getItem("token") :null;
  useEffect(()=>{
    dataFetch()
    UserDataFetch()
  },[])

  function dataFetch(){
    if(token !=null)
      axios({
        url: "http://localhost:8080/cart/get",
        method: "get",
        headers: {token:token}
      }).then((res)=>{
        props.dispatch({
          type: "CART",
          payload: res.data
        })
      }).catch((error)=>console.log(error))
  }

  const HR = styled.span`
    background:#fff; 
    padding:0 10px; 
  `;

  const HEADING=styled.h2`
  width: 100%; 
  text-align: center; 
  border-bottom: 1px solid #000; 
  line-height: 0.1em;
  margin: 30px 0 20px; 
  `;

  function UserDataFetch(){
    if(token !=null)
      axios({
        url: "http://localhost:8080/user/getDetails",
        method: "get",
        headers: {token:token}
      }).then((res)=>{
        props.dispatch({
          type: "USER",
          payload: res.data
        })
      }).catch((error)=>console.log(error))
  }
  return (
    <div>
        <Announcement/>
        <Slider/>
        <HEADING><HR>Category</HR></HEADING>
        <Categories/>
        <HEADING><HR>Products</HR></HEADING>
        <Products/>
        <Newsletter/>
    </div>
  )
}
export default connect()(Home)