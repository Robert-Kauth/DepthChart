/*-------------ACTION.TYPES-------------*/
const LOAD_ALL = "chat/LOAD_ALL";
const LOAD_ONE = "chat/LOAD_ONE";
const ADD = "chat/ADD";
const EDIT = "chat/EDIT";
const DESTROY = "chat/DESTROY";
/*-------------ACTIONS-------------*/

const loadAll = (chats) => ({
    type: LOAD_ALL,
    chats,
});

const loadOne = (chat) => ({
    type: LOAD_ONE,
    chat,
});

const add = (chat) => ({
    type: ADD,
    chat,
});

const edit = (chat) => ({
    type: EDIT,
    chat,
});

const destroy = (id) => ({
    type: DESTROY,
    id,
});

/*-------------THUNK CREATORS-------------*/

export const loadAllChats = (user_id) => async (dispatch) => {
    const res = await fetch(`/api/chats/users/${user_id}`);
    if (res.ok) {
        const chats = await res.json();
        dispatch(loadAll(chats));
    }
};

export const loadChat = (chat_id) => async (dispatch) => {
    const res = await fetch(`/api/chats/${chat_id}`);
    if (res.ok) {
        const chat = await res.json();
        dispatch(loadOne(chat));
    }
};

export const addChat = (chat_content) => async (dispatch) => {
    const res = await fetch("/api/chats/", {
        methods: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(chat_content),
    });
    if (res.ok) {
        const chat = await res.json();
        dispatch(add(chat));
    }
};

export const editChat = (payload) => async (dispatch) => {
    const res = await fetch("/api/chats/", {
        methods: "PUT",
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

export const destroyChat = (chat_id) => async (dispatch) => {
    const res = await fetch(`/api/messages/${chat_id}`, {
        method: "DELETE",
    });
    const id = await res.json();
    dispatch(destroy(id));
};
/*-------------REDUCER-------------*/
const initialState = {};

export default function reducer(state = initialState, action) {
    const newState = { ...state };
    switch (action.type) {
        case LOAD_ALL:
            return { ...state, ...action.chats };
        case LOAD_ONE:
            return { ...state, ...action.chat };
        case ADD:
        case EDIT:
            newState[action.chat.id] = action.chat;
            return newState;
        case DESTROY:
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
}
