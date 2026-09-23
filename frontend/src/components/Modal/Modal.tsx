import ReactDOM from "react-dom";

import { hideModal } from "../../store/modal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import styles from "./Modal.module.css";
// className={styles. }

export default function Modal() {
    const dispatch = useAppDispatch();

    const mount = useAppSelector((state) => state.modal.mount);
    const display = useAppSelector((state) => state.modal.display);
    const Current = useAppSelector((state) => state.modal.current);

    const onClose = () => {
        dispatch(hideModal());
    };

    if (!mount || !display || !Current) {
        return null;
    }

    return ReactDOM.createPortal(
        <div onClick={onClose} className={styles.modalBackground}>
            <div
                onClick={(e) => e.stopPropagation()}
                className={styles.modalContent}>
                <Current />
            </div>
        </div>,
        mount
    );
}
