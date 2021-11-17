/*-------------ACTION.TYPES-------------*/
const LOAD_ONE = "user/LOAD_ONE";
const DESTROY = "user/DESTROY";
const UPLOAD = "user/UPLOAD";
/*-------------ACTIONS-------------*/
const loadOne = (user) => ({
    type: LOAD_ONE,
    user,
});

const destroyOne = (id) => ({
    type: DESTROY,
    id,
});

const upload = (form) => ({
    type: UPLOAD,
    form,
});
/*-------------THUNK CREATORS-------------*/
export const loadUser = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`);
    const user = await res.json();
    dispatch(loadOne(user));
};

export const uploadFile = (fileForm) => async (dispatch) => {
    const { user_id, file } = fileForm;

    const form = new FormData();
    form.append("user_id", user_id);
    form.append("file", file);

    const res = await fetch(`/api/users/${user_id}`, {
        method: "POST",
        body: form,
    });
};

export const destroyUser = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
    });
    const id = await res.json();
    dispatch(destroyOne(id));
};
/*-------------REDUCER-------------*/
const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ONE:
            return { ...state, ...action.user };
        case DESTROY:
            const newState = { ...state };
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
}
