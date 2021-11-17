/*-------------ACTION.TYPES-------------*/
const LOAD_ALL = "servers/LOAD_ALL";
const LOAD = "server/LOAD";
const CREATE = "server/CREATE";
const EDIT = "server/EDIT";
const DESTROY = "server/DESTROY";
/*-------------ACTIONS-------------*/

const load = (servers) => ({
    type: LOAD_ALL,
    servers,
});

const loadOne = (server) => ({
    type: LOAD,
    server,
});

const create = (server) => ({
    type: CREATE,
    server,
});

const edit = (server) => ({
    type: EDIT,
});

const destroy = (id) => ({
    type: DESTROY,
    id,
});

/*-------------THUNK CREATORS-------------*/
/*-------------REDUCER-------------*/
