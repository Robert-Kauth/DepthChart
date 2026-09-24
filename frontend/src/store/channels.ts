import type { AppThunk } from ".";
import type { ById, Channel } from "../types";
import csrfFetch from "./csrfFetch";

/*-------------ACTION.TYPES-------------*/
const LOAD_ALL = "channels/LOAD_ALL";
const LOAD = "channels/LOAD";
const CREATE = "channels/CREATE";
const EDIT = "channels/EDIT";
const DESTROY = "channels/DESTROY";
/*-------------ACTIONS-------------*/
const load = (channels: ById<Channel>) =>
    ({
        type: LOAD_ALL,
        channels,
    } as const);

const loadOne = (channel: Channel) =>
    ({
        type: LOAD,
        channel,
    } as const);

const create = (channel: Channel) =>
    ({
        type: CREATE,
        channel,
    } as const);

const edit = (channel: Channel) =>
    ({
        type: EDIT,
        channel,
    } as const);

const destroy = (id: number) =>
    ({
        type: DESTROY,
        id,
    } as const);

type ChannelAction =
    | ReturnType<typeof load>
    | ReturnType<typeof loadOne>
    | ReturnType<typeof create>
    | ReturnType<typeof edit>
    | ReturnType<typeof destroy>;

export interface NewChannel {
    name: string;
    server_id: string;
    topic: string;
    icon: string;
}

export interface ChannelEdit {
    id: number;
    server_id: number;
    name: string;
    topic: string;
    icon: string;
}

/*-------------THUNK CREATORS-------------*/
export const loadChannels = (): AppThunk => async (dispatch) => {
    const res = await csrfFetch("/api/channels/");
    const channels = await res.json();
    dispatch(load(channels));
};

export const loadChannel =
    (id: number): AppThunk =>
    async (dispatch) => {
        const res = await csrfFetch(`/api/channels/${id}`);
        const channel = await res.json();
        dispatch(loadOne(channel));
    };

export const createChannel =
    (payload: NewChannel): AppThunk<string[] | undefined> =>
    async (dispatch) => {
        const res = await csrfFetch("/api/channels/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        const channel = await res.json();
        if (channel.errors) {
            return channel.errors;
        }
        dispatch(create(channel));
    };

export const editChannel =
    (payload: ChannelEdit): AppThunk =>
    async (dispatch) => {
        const res = await csrfFetch(`/api/channels/${payload.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        const channel = await res.json();
        dispatch(edit(channel));
    };

export const destroyChannel =
    (channelId: number): AppThunk =>
    async (dispatch) => {
        const res = await csrfFetch(`/api/channels/${channelId}`, {
            method: "DELETE",
        });
        const id = await res.json();
        dispatch(destroy(id));
    };
/*-------------REDUCER-------------*/
interface ChannelsState {
    all: ById<Channel> | null;
    channel: Channel | null;
}

const initialState: ChannelsState = { all: null, channel: null };

export default function reducer(
    state: ChannelsState = initialState,
    action: ChannelAction
): ChannelsState {
    const newState = { ...state };
    switch (action.type) {
        case LOAD_ALL:
            return { ...state, all: action.channels };
        case LOAD:
            return { ...state, channel: action.channel };
        case CREATE:
        case EDIT:
            return {
                ...state,
                all: { ...state.all, [action.channel.id]: action.channel },
                channel: action.channel,
            };
        case DESTROY:
            delete (newState as Record<number, unknown>)[action.id];
            return newState;
        default:
            return state;
    }
}
