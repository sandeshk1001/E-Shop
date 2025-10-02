import React ,{ useState } from "react";
import styled from "styled-components";
// import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";
import { useEffect } from "react";
import ProductCard from "./ProductCard";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = () => {

  const [productList,setProductList] = useState([]) 

  useEffect(()=>{
    axios({
      url: "http://localhost:8080/product/getall",
      method: "get"
    }).then((response)=>{ 
      setProductList(response.data)   
    }).catch((error)=> console.log(error))
  },[])

  return (
    <Container>
      {productList.map((item,index) => (
          <ProductCard products={item}/>
      ))}
    </Container>
  );
};

export default Products;