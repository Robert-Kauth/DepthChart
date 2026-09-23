import type { ComponentType } from "react";

/*-------------ACTION.TYPES-------------*/

const SHOW = "modal/SHOW";
const HIDE = "modal/HIDE";
const CURRENT = "modal/CURRENT";
const MOUNT = "modal/MOUNT";
/*-------------ACTIONS-------------*/

export const showModal = () =>
    ({
        type: SHOW,
    } as const);

export const hideModal = () =>
    ({
        type: HIDE,
    } as const);

export const setCurrentModal = (current: ComponentType) =>
    ({
        type: CURRENT,
        current,
    } as const);

export const setModalMount = (mount: HTMLElement | null) =>
    ({
        type: MOUNT,
        mount,
    } as const);

type ModalAction =
    | ReturnType<typeof showModal>
    | ReturnType<typeof hideModal>
    | ReturnType<typeof setCurrentModal>
    | ReturnType<typeof setModalMount>;

/*-------------REDUCER-------------*/

interface ModalState {
    mount: HTMLElement | null;
    current: ComponentType | null;
    display: boolean;
}

export default function reducer(
    state: ModalState = { mount: null, current: null, display: false },
    action: ModalAction
): ModalState {
    switch (action.type) {
        case SHOW:
            return { ...state, display: true };
        case HIDE:
            return { ...state, display: false };
        case CURRENT:
            return { ...state, current: action.current };
        case MOUNT:
            return { ...state, mount: action.mount };
        default:
            return state;
    }
}
