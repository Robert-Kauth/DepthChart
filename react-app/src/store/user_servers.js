/*-------------ACTION.TYPES-------------*/
const GET = "user_servers/GET";
const LOAD = "user_servers/LOAD";
const ADD = "user_servers/ADD";
const DESTROY = "user_servers/DESTROY";
/*-------------ACTIONS-------------*/
const get = (servers) => ({
    type: GET,
    servers,
});

const load = (users) => ({
    type: LOAD,
    users,
});

const add = (new_server) => ({
    type: ADD,
    new_server,
});

const destroy = (id) => ({
    type: DESTROY,
    id,
});
/*-------------THUNK CREATORS-------------*/
export const getUserServers = (user_id) => async (dispatch) => {
    const res = await fetch(`/api/user_servers/${user_id}`);
    const servers = await res.json();
    dispatch(get(servers));
};

export const loadServerUsers = (server_id) => async (dispatch) => {
    const res = await fetch(`/api/user_servers/${server_id}`);
    const users = await res.json();
    dispatch(load(users));
};

export const addUserServer = (payload) => async (dispatch) => {
    const { user_id, server_id } = payload;
    const res = await fetch(`/api/user_servers/join`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, server_id }),
    });
    const new_server = await res.json();
    dispatch(add(new_server));
};

export const destroyUserServer = (server_id) => async (dispatch) => {
    const res = await fetch(`/api/user_servers/${server_id}`, {
        method: "DELETE",
    });
    const id = await res.json();
    dispatch(destroy(id));
};
/*-------------REDUCER-------------*/

const initialState = {};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET:
            return { ...state, ...action.servers };
        case LOAD:
            return { ...state, ...action.users };
        case ADD:
            return { ...state, ...action.new_server };
        case DESTROY:
            const newState = { ...state };
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
}
