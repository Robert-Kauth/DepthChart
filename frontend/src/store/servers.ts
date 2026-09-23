import type { AppThunk } from ".";
import type { ById, Server } from "../types";

/*-------------ACTION.TYPES-------------*/
const LOAD_ALL = "servers/LOAD_ALL";
const LOAD_ONE = "server/LOAD_ONE";
const CREATE = "server/CREATE";
const EDIT = "server/EDIT";
const DESTROY = "server/DESTROY";
/*-------------ACTIONS-------------*/

const load = (servers: ById<Server>) =>
    ({
        type: LOAD_ALL,
        servers,
    } as const);

const loadOne = (server: Server) =>
    ({
        type: LOAD_ONE,
        server,
    } as const);

const create = (server: Server) =>
    ({
        type: CREATE,
        server,
    } as const);

const edit = (server: Server) =>
    ({
        type: EDIT,
        server,
    } as const);

const destroy = (id: number) =>
    ({
        type: DESTROY,
        id,
    } as const);

type ServerAction =
    | ReturnType<typeof load>
    | ReturnType<typeof loadOne>
    | ReturnType<typeof create>
    | ReturnType<typeof edit>
    | ReturnType<typeof destroy>;

export interface NewServer {
    name: string;
    topic: string;
    icon: string;
}

export interface ServerEdit extends NewServer {
    id: string | null;
}

/*-------------THUNK CREATORS-------------*/

export const loadServers = (): AppThunk => async (dispatch) => {
    const res = await fetch("/api/servers/");
    const servers = await res.json();
    dispatch(load(servers));
};

export const loadServer =
    (id: number): AppThunk =>
    async (dispatch) => {
        const res = await fetch(`/api/servers/${id}`);
        const server = await res.json();
        dispatch(loadOne(server));
    };

export const createServer =
    (payload: NewServer): AppThunk<string[] | undefined> =>
    async (dispatch) => {
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

export const editServer =
    (payload: ServerEdit): AppThunk =>
    async (dispatch) => {
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

export const destroyServer =
    (serverId: number): AppThunk =>
    async (dispatch) => {
        const res = await fetch(`/api/servers/${serverId}`, {
            method: "DELETE",
        });
        const id = await res.json();
        dispatch(destroy(id));
    };
/*-------------REDUCER-------------*/
interface ServersState {
    all: ById<Server> | null;
    server: Server | null;
}

const initialState: ServersState = { all: null, server: null };

export default function reducer(
    state: ServersState = initialState,
    action: ServerAction
): ServersState {
    const newState = { ...state };
    switch (action.type) {
        case LOAD_ALL:
            return { ...state, all: action.servers };
        case LOAD_ONE:
            return { ...state, server: action.server };
        case CREATE:
        case EDIT:
            return {
                ...state,
                all: { ...state.all, [action.server.id]: action.server },
                server: action.server,
            };
        case DESTROY:
            delete (newState as Record<number, unknown>)[action.id];
            return newState;
        default:
            return state;
    }
}
