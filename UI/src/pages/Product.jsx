import { Add, Remove } from "@material-ui/icons";
import React ,{ useEffect, useState } from "react";
import styled from "styled-components";
import Announcement from "../component/Announcement";
import Newsletter from "../component/Newsletter";
import { mobile } from "../responsive";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import {toast} from 'react-toastify';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover{
      background-color: #f8f4f4;
  }
`;

const NoDetailDiv = styled.div`
  text-align:center;
`;

const Product = () => {
  toast.configure()
  var [productDetail,setProductDetail]=useState(null);
  const navigate = useNavigate();
  var params = useParams()
  var productid = params.productid;
  useEffect(()=>{
    axios({
      url: "http://localhost:8080/product/getProduct/"+productid,
      method: "get"
    }).then((res)=>{
      console.log(res)
      setProductDetail(res.data)
    }).catch((error)=>console.log(error.getMessage))
  },[])

  function addToCart(){
    let token =localStorage.getItem("token") ? localStorage.getItem("token") :null;
    if(productDetail && token){
      axios({
        url: "http://localhost:8080/cart/add?token="+token,
        method: "post",
        headers:{token:token},
        data: {product :productDetail , quantity :1}
      }).then((res)=>{      
        console.log(res) 
        toast.success("Item added in cart",{position: toast.POSITION.TOP_CENTER})
        navigate("/cart")        
      }).catch((error)=> {console.log("error :",error.getMessage)})
    }
  }
            
  return (<>
  {
        (!(productDetail == null)) ?
    <Container>
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={"/"+productDetail.imageUrl}/>
        </ImgContainer>
        <InfoContainer>
          <Title>{productDetail.name}</Title>
          <Desc>
            {productDetail.description}
          </Desc>
          <Price>̥₹ {productDetail.unitPrice}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color="black" />
              <FilterColor color="darkblue" />
              <FilterColor color="gray" />
            </Filter>
            {/* <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
              </FilterSize>
            </Filter> */}
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove />
              <Amount>1</Amount>
              <Add />
            </AmountContainer>
            <Button onClick={addToCart}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter/>
    </Container>
        : <Wrapper>
          <NoDetailDiv>
            no detail found
          </NoDetailDiv>
        </Wrapper>
        }
    </>
  );
};

export default Product;