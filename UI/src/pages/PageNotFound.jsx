import React from 'react';
import styled from "styled-components";
import { mobile } from "../responsive";
 
const Container = styled.div``;

const Wrapper = styled.div`
  padding-left: 100px;
  text-align:center;
  text-size:80px;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const PageNotFound =() => {
    return(<>
    <Container>
        <Wrapper>
            <br/><br/>
            <h1>Page Not Found</h1>
            <img src="404.gif" alt="no found" width="80%" style={{marginTop:"0%" ,paddingTop:"0%"}}/>
        </Wrapper>
    </Container>
    </>)
}
export default PageNotFound;