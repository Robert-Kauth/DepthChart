import type { AppThunk } from ".";
import type { ById, Message } from "../types";
import csrfFetch from "./csrfFetch";

/*-------------ACTION.TYPES-------------*/
const LOAD_ALL = "messages/LOAD_ALL";
const LOAD_ONE = "messages/LOAD_ONE";
const LOAD_CHANNEL = "messages/LOAD_CHANNEL";
const LOAD_BETWEEN = " messages/LOAD_BETWEEN";
const CREATE = "messages/CREATE";
const EDIT = "messages/EDIT";
const DESTROY = "messages/DESTROY";
/*-------------ACTIONS-------------*/

const loadAll = (messages: ById<Message>) =>
    ({
        type: LOAD_ALL,
        messages,
    } as const);

const loadOne = (message: Message) =>
    ({
        type: LOAD_ONE,
        message,
    } as const);

const loadChannel = (messages: ById<Message>) =>
    ({
        type: LOAD_CHANNEL,
        messages,
    } as const);

const loadBetween = (messages: ById<Message>) =>
    ({
        type: LOAD_BETWEEN,
        messages,
    } as const);

const create = (message: Message) =>
    ({
        type: CREATE,
        message,
    } as const);

const edit = (message: Message) =>
    ({
        type: EDIT,
        message,
    } as const);

const destroy = (id: number) =>
    ({
        type: DESTROY,
        id,
    } as const);

type MessageAction =
    | ReturnType<typeof loadAll>
    | ReturnType<typeof loadOne>
    | ReturnType<typeof loadChannel>
    | ReturnType<typeof loadBetween>
    | ReturnType<typeof create>
    | ReturnType<typeof edit>
    | ReturnType<typeof destroy>;

export interface NewMessage {
    content: string;
    sender_id: number;
    recipient_id?: number | string;
    channel_id?: number;
}

/*-------------THUNK CREATORS-------------*/

export const loadAllUserMessages =
    (user_id: number): AppThunk =>
    async (dispatch) => {
        const res = await csrfFetch(`/api/messages/users/${user_id}`);
        const messages = await res.json();
        dispatch(loadAll(messages));
    };

export const loadMessage =
    (message_id: number): AppThunk =>
    async (dispatch) => {
        const res = await csrfFetch(`/api/messages/${message_id}`);
        if (res.ok) {
            const message = await res.json();
            dispatch(loadOne(message));
        }
    };

export const loadAllChannelMessages =
    (channel_id: number): AppThunk =>
    async (dispatch) => {
        const res = await csrfFetch(`/api/messages/channel/${channel_id}`);
        const messages = await res.json();
        dispatch(loadChannel(messages));
    };

export const loadMessagesBetween =
    (user1_id: number, user2_id: number | string): AppThunk =>
    async (dispatch) => {
        const res = await csrfFetch(
            `/api/messages/users/DM/${user1_id}/${user2_id}`
        );
        if (res.ok) {
            const messages = await res.json();
            dispatch(loadBetween(messages));
        }
    };

export const createMessage =
    (payload: NewMessage): AppThunk<string[] | undefined> =>
    async (dispatch) => {
        const res = await csrfFetch("/api/messages/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        const message = await res.json();
        if (message.errors) {
            return message.errors;
        } else dispatch(create(message));
    };

export const editMessage =
    (payload: Message): AppThunk =>
    async (dispatch) => {
        const res = await csrfFetch(`/api/messages/${payload.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        const message = await res.json();
        dispatch(edit(message));
    };

export const destroyMessage =
    (message_id: number): AppThunk =>
    async (dispatch) => {
        const res = await csrfFetch(`/api/messages/${message_id}`, {
            method: "DELETE",
        });
        const id = await res.json();
        dispatch(destroy(id));
    };
/*-------------REDUCER-------------*/
interface MessagesState {
    all: ById<Message> | null;
    message: Message | null;
    channel: ById<Message> | null;
    between: ById<Message> | null;
}

const initialState: MessagesState = {
    all: null,
    message: null,
    channel: null,
    between: null,
};
export default function reducer(
    state: MessagesState = initialState,
    action: MessageAction
): MessagesState {
    const newState = { ...state };
    switch (action.type) {
        case LOAD_ALL:
            return { ...state, all: action.messages };
        case LOAD_ONE:
            return { ...state, message: action.message };
        case LOAD_CHANNEL:
            return { ...state, channel: action.messages };
        case LOAD_BETWEEN:
            return { ...state, between: action.messages };
        case CREATE:
        case EDIT:
            if (action.message.channel_id) {
                return {
                    ...state,
                    all: { ...state.all, [action.message.id]: action.message },
                    channel: {
                        ...state.channel,
                        [action.message.id]: action.message,
                    },
                };
            } else {
                return {
                    ...state,
                    all: { ...state.all, [action.message.id]: action.message },
                    message: action.message,
                    between: {
                        ...state.between,
                        [action.message.id]: action.message,
                    },
                };
            }
        case DESTROY:
            delete (newState as Record<number, unknown>)[action.id];
            return newState;
        default:
            return state;
    }
}
