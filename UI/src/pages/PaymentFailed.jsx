import React from 'react';
import styled from "styled-components";

export default function PaymentFailed(){
    const Container = styled.div`
    margin-top:40px;
    text-align:center;
    `;

    return (
        <Container>
            <h1>Payment Failed</h1>
        </Container>
        );
}