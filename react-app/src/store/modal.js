/*-------------ACTION.TYPES-------------*/

const SHOW = "modal/SHOW";
const HIDE = "modal/HIDE";
const CURRENT = "modal/CURRENT";
const MOUNT = "modal/MOUNT";
/*-------------ACTIONS-------------*/

export const showModal = () => ({
    type: SHOW,
});

export const hideModal = () => ({
    type: HIDE,
});

export const setCurrentModal = (current) => ({
    type: CURRENT,
    current,
});

export const setModalMount = (mount) => ({
    type: MOUNT,
    mount,
});

/*-------------REDUCER-------------*/

export default function reducer(
    state = { mount: null, current: null, display: false },
    action
) {
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
