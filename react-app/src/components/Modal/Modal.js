import ReactDOM from "react-dom";
import { useSelector } from "react-redux";

export default function Modal() {
    const mount = useSelector((state) => state.modal.mount);
    const display = useSelector((state) => state.modal.display);
    const Current = useSelector((state) => state.modal.current);

    return (
        mount &&
        display &&
        ReactDOM.createPortal(
            <div className="modal-background">
                <div className="modal-content">
                    <Current />
                </div>
            </div>,
            mount
        )
    );
}
