/*-------------ACTION.TYPES-------------*/
const GET = "user_servers/GET";
const ADD = "user_servers/ADD";
const EDIT = "user_servers/EDIT";
const DESTROY = "user_servers/DESTROY";
/*-------------ACTIONS-------------*/
const get = (user_servers) => ({
    type: GET,
    user_servers,
});

const add = (user_server) => ({
    type: ADD,
    user_server,
});

const edit = (user_server) => ({
    type: EDIT,
    user_server,
});

const destroy = (id) => ({
    type: DESTROY,
    id,
});
/*-------------THUNK CREATORS-------------*/
export const getUserServers = (user_id) => async (dispatch) => {
    const res = await fetch(`/servers/user/${user_id}`);
    const user_servers = await res.json();
    dispatch(get(user_servers));
};

export const addUserServer = (user_server) => async (dispatch) => {
    const res = await fetch(`/servers/user/`);
};
/*-------------REDUCER-------------*/

const initialState = {};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET:
            return { ...state, ...action.user_servers };
        default:
            return state;
    }
}
