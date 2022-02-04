import React from "react";
import styled from "styled-components";
import Icon from "@mdi/react";

const CustomIcon = styled(Icon)`
    width: 1rem;
    height: 1rem;
    color: green;
`;

export default function StyledIcon({ icon }) {
    return <CustomIcon path={icon} size={1} />;
}
