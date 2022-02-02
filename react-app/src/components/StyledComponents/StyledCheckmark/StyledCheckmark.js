import React from "react";
import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiCheckBold } from "@mdi/js";

const Checkmark = styled(Icon)`
    width: 1rem;
    height: 1rem;
    color: green;
`;

export default function StyledCheckmark() {
    return <Checkmark path={mdiCheckBold} />;
}
