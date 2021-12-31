import React from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import { hideModal } from "../../store/modal";

import styles from "./Modal.module.css";
// className={styles. }

export default function Modal() {
    const dispatch = useDispatch();

    const mount = useSelector((state) => state.modal.mount);
    const display = useSelector((state) => state.modal.display);
    const Current = useSelector((state) => state.modal.current);

    const onClose = () => {
        dispatch(hideModal());
    };

    return (
        mount &&
        display &&
        ReactDOM.createPortal(
            <div onClick={onClose} className={styles.modalBackground}>
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={styles.modalContent}>
                    <Current />
                </div>
            </div>,
            mount
        )
    );
}
