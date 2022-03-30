import React from "react";
import styled from "styled-components";
import Icon from "@mdi/react";

const CustomIcon = styled(Icon)`
    width: 1rem;
    height: 1rem;
    color: ${(props) => props.color};
`;

export default function StyledIcon(props) {
    return <CustomIcon path={props.icon} color={props.color} />;
}
