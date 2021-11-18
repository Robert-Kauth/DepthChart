/*-------------ACTION.TYPES-------------*/
const LOAD_ALL = "users/LOAD_ALL";
const LOAD_ONE = "user/LOAD_ONE";
const DESTROY = "user/DESTROY";
const UPLOAD = "user/UPLOAD";

/*-------------ACTIONS-------------*/

const loadAll = (users) => ({
    type: LOAD_ALL,
    users,
});

const loadOne = (user) => ({
    type: LOAD_ONE,
    user,
});

const destroyOne = (id) => ({
    type: DESTROY,
    id,
});

const upload = (fileUrl) => ({
    type: UPLOAD,
    fileUrl,
});
/*-------------THUNK CREATORS-------------*/

export const loadUsers = () => async (dispatch) => {
    const res = await fetch("/api/users/");
    const users = await res.json();
    dispatch(loadAll(users));
};

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

    const fileUrl = await res.json();
    dispatch(upload(fileUrl));
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
        case LOAD_ALL:
            return { ...state, ...action.users };
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
