import React from "react";
import styled from "styled-components";
import { FaExclamation } from "react-icons/fa";

const ErrorIcon = styled(FaExclamation)`
    color: red;
    height: 0.75rem;
    width: 0.75rem;
    vertical-align: baseline;
`;

const StyledErrorMessage = styled.span`
    font-size: 12px;
    font-weight: 600;
    color: var(--red-800);

    @media (prefers-color-scheme: dark) {
        color: var(--red-400);
    }
`;

export default function StyledError({ error }) {
    return (
        <>
            <ErrorIcon />
            <StyledErrorMessage>{error}</StyledErrorMessage>
        </>
    );
}
