import type { AppThunk } from ".";
import type { ById, Chat } from "../types";
import csrfFetch from "./csrfFetch";

/*-------------ACTION.TYPES-------------*/
const LOAD_ALL = "chat/LOAD_ALL";
const LOAD_ONE = "chat/LOAD_ONE";
const ADD = "chat/ADD";
const EDIT = "chat/EDIT";
const DESTROY = "chat/DESTROY";
/*-------------ACTIONS-------------*/

const loadAll = (chats: ById<Chat>) =>
    ({
        type: LOAD_ALL,
        chats,
    } as const);

const loadOne = (chat: Chat) =>
    ({
        type: LOAD_ONE,
        chat,
    } as const);

const add = (chat: Chat) =>
    ({
        type: ADD,
        chat,
    } as const);

const edit = (chat: Chat) =>
    ({
        type: EDIT,
        chat,
    } as const);

const destroy = (id: number) =>
    ({
        type: DESTROY,
        id,
    } as const);

type ChatAction =
    | ReturnType<typeof loadAll>
    | ReturnType<typeof loadOne>
    | ReturnType<typeof add>
    | ReturnType<typeof edit>
    | ReturnType<typeof destroy>;

export interface NewChat {
    content: string;
    sender_id: number;
    recipient_id: number;
}

/*-------------THUNK CREATORS-------------*/

export const loadAllChats =
    (user_id: number): AppThunk<string | undefined> =>
    async (dispatch) => {
        const res = await csrfFetch(`/api/chats/users/${user_id}`);

        const chats = await res.json();
        if (chats.error) {
            return chats.error;
        } else dispatch(loadAll(chats));
    };

export const loadChat =
    (chat_id: number): AppThunk =>
    async (dispatch) => {
        const res = await csrfFetch(`/api/chats/${chat_id}`);
        if (res.ok) {
            const chat = await res.json();
            dispatch(loadOne(chat));
        }
    };

export const addChat =
    (payload: NewChat): AppThunk =>
    async (dispatch) => {
        const res = await csrfFetch("/api/chats/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        if (res.ok) {
            const chat = await res.json();
            dispatch(add(chat));
        }
    };

export const editChat =
    (payload: Chat): AppThunk =>
    async (dispatch) => {
        const res = await csrfFetch("/api/chats/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        if (res.ok) {
            const chat = await res.json();
            dispatch(edit(chat));
        }
    };

export const destroyChat =
    (chat_id: number): AppThunk =>
    async (dispatch) => {
        const res = await csrfFetch(`/api/messages/${chat_id}`, {
            method: "DELETE",
        });
        const id = await res.json();
        dispatch(destroy(id));
    };
/*-------------REDUCER-------------*/
interface ChatsState {
    all: ById<Chat> | null;
    chat: Chat | null;
}

const initialState: ChatsState = { all: null, chat: null };

export default function reducer(
    state: ChatsState = initialState,
    action: ChatAction
): ChatsState {
    const newState = { ...state };
    switch (action.type) {
        case LOAD_ALL:
            return { ...state, all: action.chats };
        case LOAD_ONE:
            return { ...state, chat: action.chat };
        case ADD:
        case EDIT:
            return {
                ...state,
                all: { ...state.all, [action.chat.id]: action.chat },
                chat: action.chat,
            };
        case DESTROY:
            delete (newState as Record<number, unknown>)[action.id];
            return newState;
        default:
            return state;
    }
}
