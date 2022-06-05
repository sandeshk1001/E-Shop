import React from 'react';
import {FavoriteBorderOutlined,SearchOutlined, ShoppingCartOutlined,} from "@material-ui/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
  
  const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
  `;
  
  const Container = styled.div`
  margin: 5px;
  max-width: 300px;
  height: 330px;
  background-color: #f5fbfd;
  position: relative;
  `;

  const ContainerInner = styled.div`
  flex: 1;
  max-width: 300px;
  height: 270px;
  background-color: #f5fbfd;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover ${Info}{
    opacity: 1;
  }
`;
  
  const Details = styled.div`
    color:red;
  `;

  const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
  `;
  
  const Image = styled.img`
    height: 75%;
    z-index: 2;
  `;
  
  const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
      background-color: #e9f5f5;
      transform: scale(1.1);
    }
  `;
  
  const Product = ({ item }) => {
    // console.log(item)

    // const navigate = useNavigate()

    // function openProductDetail(){
    //   navigate("/product");
    // }

    return (
      <Link to={`product/${item.id}`}>
      <Container>
        <ContainerInner>
        <Circle />
        <Image src={item.imageUrl} />
        <Info>
          <Icon>
            <ShoppingCartOutlined />
          </Icon>
          <Icon>
            <SearchOutlined/>
          </Icon>
          <Icon>
            <FavoriteBorderOutlined />
          </Icon>
        </Info>
        </ContainerInner>
        <Details>₹ {item.unitPrice}</Details>
        <Details>{item.name}</Details>
      </Container>
      </Link>
    );
  };
  
  export default Product;