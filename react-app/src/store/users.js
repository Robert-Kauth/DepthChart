/*-------------ACTION.TYPES-------------*/
const LOAD_ALL = "users/LOAD_ALL";

/*-------------ACTIONS-------------*/

const loadAll = (users) => ({
    type: LOAD_ALL,
    users,
});

/*-------------THUNK CREATORS-------------*/

export const loadUsers = () => async (dispatch) => {
    const res = await fetch("/api/users/");
    const users = await res.json();
    dispatch(loadAll(users));
};

/*-------------REDUCER-------------*/

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ALL:
            return { ...state, ...action.users };
        default:
            return state;
    }
}
