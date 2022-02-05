import React from "react";
import styled from "styled-components";
import Icon from "@mdi/react";

const CustomIcon = styled(Icon)`
    width: 1.5rem;
    height: 1.5rem;
    color: ${(props) => props.color};
`;

export default function StyledIcon(props) {
    return <CustomIcon path={props.icon} color={props.color} />;
}
