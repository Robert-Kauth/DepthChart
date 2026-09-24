import type { AppThunk } from ".";
import type { ById, UserServer } from "../types";
import csrfFetch from "./csrfFetch";

/*-------------ACTION.TYPES-------------*/
const GET = "user_servers/GET";
const LOAD = "user_servers/LOAD";
const ADD = "user_servers/ADD";
const DESTROY = "user_servers/DESTROY";
/*-------------ACTIONS-------------*/
const get = (servers: ById<UserServer>) =>
    ({
        type: GET,
        servers,
    } as const);

const load = (users: ById<UserServer>) =>
    ({
        type: LOAD,
        users,
    } as const);

const add = (new_server: ById<UserServer>) =>
    ({
        type: ADD,
        new_server,
    } as const);

const destroy = (id: number) =>
    ({
        type: DESTROY,
        id,
    } as const);

type UserServerAction =
    | ReturnType<typeof get>
    | ReturnType<typeof load>
    | ReturnType<typeof add>
    | ReturnType<typeof destroy>;

/*-------------THUNK CREATORS-------------*/
export const getUserServers =
    (user_id: number): AppThunk =>
    async (dispatch) => {
        const res = await csrfFetch(`/api/user_servers/${user_id}`);
        const servers = await res.json();
        dispatch(get(servers));
    };

export const loadServerUsers =
    (server_id: number): AppThunk =>
    async (dispatch) => {
        const res = await csrfFetch(`/api/user_servers/${server_id}`);
        const users = await res.json();
        dispatch(load(users));
    };

export const addUserServer =
    (payload: { user_id: number; server_id: number }): AppThunk =>
    async (dispatch) => {
        const { user_id, server_id } = payload;
        const res = await csrfFetch(`/api/user_servers/join`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id, server_id }),
        });
        const new_server = await res.json();
        dispatch(add(new_server));
    };

export const destroyUserServer =
    (server_id: number): AppThunk =>
    async (dispatch) => {
        const res = await csrfFetch(`/api/user_servers/${server_id}`, {
            method: "DELETE",
        });
        const id = await res.json();
        dispatch(destroy(id));
    };
/*-------------REDUCER-------------*/

type UserServersState = ById<UserServer>;

const initialState: UserServersState = {};
export default function reducer(
    state: UserServersState = initialState,
    action: UserServerAction
): UserServersState {
    switch (action.type) {
        case GET:
            return { ...state, ...action.servers };
        case LOAD:
            return { ...state, ...action.users };
        case ADD:
            return { ...state, ...action.new_server };
        case DESTROY: {
            const newState = { ...state };
            delete newState[action.id];
            return newState;
        }
        default:
            return state;
    }
}
