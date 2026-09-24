import type { ComponentType } from "react";
import { Icon } from "@mdi/react";

import { showModal, setCurrentModal } from "../../../store/modal";
import { useAppDispatch } from "../../../store/hooks";

import styles from "./StyledButton.module.css";

interface StyledButtonProps {
    icon: string;
    form: ComponentType;
}

export default function StyledButton({ icon, form }: StyledButtonProps) {
    const dispatch = useAppDispatch();

    const showForm = () => {
        dispatch(setCurrentModal(form));
        dispatch(showModal());
    };

    return (
        <button className={styles.button} onClick={showForm}>
            <Icon className={styles.icon} path={icon} size={1} />
        </button>
    );
}
