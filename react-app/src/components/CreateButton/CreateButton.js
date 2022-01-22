import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Icon from "@mdi/react";

import { showModal, setCurrentModal } from "../../store/modal";

import styles from "./CreateButton.module.css";
// className={styles. }

const Button = styled.button`
    background-color: #014421;
    color: #029e7e;
    margin: 0;
    padding-top: 5px;
    border: 2px solid darkgreen;
    border-radius: 2px;
    box-shadow: 0 0 5px lightgreen;
    &:hover {
        background-color: #0bda51;
        color: #014421;
    }
`;

const StyledIcon = styled(Icon)`
    width: 1rem;
    height: 1rem;
`;

export default function CreateButton({ icon, form }) {
    const dispatch = useDispatch();

    const showForm = () => {
        dispatch(setCurrentModal(form));
        dispatch(showModal());
    };

    return (
        <Button onClick={showForm}>
            <StyledIcon path={icon} size={1} />
        </Button>
    );
}
