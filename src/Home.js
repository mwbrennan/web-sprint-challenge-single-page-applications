import React from 'react';
import styled from "styled-components"


export default function Home() {
    return (
        <HomeStyle>
            <h1>The Pizza Shop</h1>
        </HomeStyle>
    )
}

const HomeStyle = styled.div`
    text-align: center;
    font-size: 4rem;
    color: olivedrab;
`
