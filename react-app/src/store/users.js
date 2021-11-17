/*-------------ACTION.TYPES-------------*/
const LOAD_ALL = "users/LOAD_ALL";
const LOAD_ONE = "users/LOAD_ONE";
const DESTROY = "users/DESTROY";
/*-------------ACTIONS-------------*/

const loadAll = (users) => ({
    type: LOAD_ALL,
    users,
});

const loadOne = (user) => ({
    type: LOAD_ONE,
    user,
});

const destroyOne = () => ({
    type: DESTROY,
});
/*-------------THUNK CREATORS-------------*/

export const loadUsers = () => async (dispatch) => {
    const res = await fetch("/api/users");
    if (res.ok) {
        const users = await res.json();
        dispatch(loadAll(users));
    }
};

export const loadUser = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`);
    if (res.ok) {
        const user = await res.json();
        dispatch(loadOne(user));
    }
};

export const destroyUser = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
    });
    if (res.ok) {
        dispatch(destroyOne());
    }
};
/*-------------REDUCER-------------*/

const initialState = { users: null, user: null, loaded: false };
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ALL:
            return { ...state, users: action.users, loaded: true };
        case LOAD_ONE:
            return { ...state, user: action.user, loaded: true };
        case DESTROY:
            return { ...state, user: null, loaded: true };
        default:
            return state;
    }
}
