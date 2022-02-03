import React from "react";
import styled from "styled-components";

const StyledErrorMessage = styled.div`
    position: absolute;
    top: 84px;
    font-size: 12px;
    font-weight: 600;
    color: var(--red-800);
    &:before {
        content: "❌ ";
        font-size: 10px;
    }
    @media (prefers-color-scheme: dark) {
        color: var(--red-400);
    }
`;

export default function StyledError({ error }) {
    return <StyledErrorMessage>{error}</StyledErrorMessage>;
}
