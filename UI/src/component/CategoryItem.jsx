import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 40vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}
`;    
                                               
const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;                                             
  justify-content: center;
`;

const Title = styled.h1`
    color:white;
    margin-bottom: 20px;
`;

const Button = styled.button`
    border:none;
    padding: 10px;
    background-color: white;
    color:gray;
    cursor: pointer;
    font-weight: 600;
`;

const CategoryItem = ({ item }) => {
  return (   
    <Container>
      <Image src={"https://media.istockphoto.com/photos/the-black-and-silver-are-light-gray-with-white-the-gradient-is-the-picture-id1332097112?b=1&k=20&m=1332097112&s=170667a&w=0&h=D_26WN2nM805ssHpKsrqFe9mE63_j2bNefybNF0wOLw="} />
      <Info>
        <Title>{item.name}</Title>
        <Link to="/products"><Button>Explore Now</Button></Link>
      </Info>
    </Container>
  );
};

export default CategoryItem;
