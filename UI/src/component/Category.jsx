import axios from "axios";
import React ,{ useEffect, useState } from "react";
import styled from "styled-components";
// import { categories } from "../data";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection:"column" })}
`;

const Categories = () => {
  const [category,setCategory] = useState([])

  useEffect(()=>{
    axios({
      url: "http://localhost:8080/category/getall",
      method: "get"
    }).then((res)=>{
      setCategory(res.data)
    }).catch((error)=>console.log(error))

  },[]);

  return (
    <Container>
      {category.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
}

export default Categories;