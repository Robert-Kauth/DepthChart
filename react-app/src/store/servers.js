/*-------------ACTION.TYPES-------------*/
const LOAD_ALL = "servers/LOAD_ALL";
const LOAD_ONE = "server/LOAD_ONE";
const CREATE = "server/CREATE";
const EDIT = "server/EDIT";
const DESTROY = "server/DESTROY";
/*-------------ACTIONS-------------*/

const load = (servers) => ({
    type: LOAD_ALL,
    servers,
});

const loadOne = (server) => ({
    type: LOAD_ONE,
    server,
});

const create = (server) => ({
    type: CREATE,
    server,
});

const edit = (server) => ({
    type: EDIT,
    server,
});

const destroy = (id) => ({
    type: DESTROY,
    id,
});

/*-------------THUNK CREATORS-------------*/

export const loadServers = () => async (dispatch) => {
    const res = await fetch("/api/servers/");
    const servers = await res.json();
    dispatch(load(servers));
};

export const loadServer = (id) => async (dispatch) => {
    const res = await fetch(`/api/servers/${id}`);
    const server = await res.json();
    dispatch(loadOne(server));
};

export const createServer = (payload) => async (dispatch) => {
    const res = await fetch("/api/servers/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    const server = await res.json();
    if (server.errors) {
        return server.errors;
    }
    dispatch(create(server));
};

export const editServer = (payload) => async (dispatch) => {
    const res = await fetch(`/api/servers/${payload.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    const server = await res.json();
    dispatch(edit(server));
};

export const destroyServer = (serverId) => async (dispatch) => {
    const res = await fetch(`/api/servers/${serverId}`, {
        method: "DELETE",
    });
    const id = await res.json();
    dispatch(destroy(id));
};
/*-------------REDUCER-------------*/
const initialState = { all: null, server: null };

export default function reducer(state = initialState, action) {
    const newState = { ...state };
    switch (action.type) {
        case LOAD_ALL:
            return { ...state, all: action.servers };
        case LOAD_ONE:
            return { ...state, server: action.server };
        case CREATE:
            newState[action.server.id] = action.server;
            return newState;
        case EDIT:
            return { ...state, [action.server.id]: action.server };
        case DESTROY:
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
}
