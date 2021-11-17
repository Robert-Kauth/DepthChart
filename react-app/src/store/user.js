/*-------------ACTION.TYPES-------------*/
const LOAD_ONE = "users/LOAD_ONE";
const DESTROY = "users/DESTROY";
/*-------------ACTIONS-------------*/
const loadOne = (user) => ({
    type: LOAD_ONE,
    user,
});

const destroyOne = (id) => ({
    type: DESTROY,
    id,
});
/*-------------THUNK CREATORS-------------*/
export const loadUser = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`);
    const user = await res.json();
    dispatch(loadOne(user));
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
