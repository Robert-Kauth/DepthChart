/*-------------ACTION.TYPES-------------*/
const LOAD_ALL = "messages/LOAD_ALL";
const LOAD_ONE = "messages/LOAD_ONE";
const LOAD_CHANNEL = "messages/LOAD_CHANNEL";
const LOAD_BETWEEN = " messages/LOAD_BETWEEN";
const CREATE = "messages/CREATE";
const EDIT = "messages/EDIT";
const DESTROY = "messages/DESTROY";
/*-------------ACTIONS-------------*/

const loadAll = (messages) => ({
    type: LOAD_ALL,
    messages,
});

const loadOne = (message) => ({
    type: LOAD_ONE,
    message,
});

const loadChannel = (messages) => ({
    type: LOAD_CHANNEL,
    messages,
});

const loadBetween = (messages) => ({
    type: LOAD_BETWEEN,
    messages,
});

const create = (message) => ({
    type: CREATE,
    message,
});

const edit = (message) => ({
    type: EDIT,
    message,
});

const destroy = (id) => ({
    type: DESTROY,
    id,
});
/*-------------THUNK CREATORS-------------*/

export const loadAllUserMessages = (user_id) => async (dispatch) => {
    const res = await fetch(`/api/messages/users/${user_id}`);
    const messages = await res.json();
    dispatch(loadAll(messages));
};

export const loadMessage = (message_id) => async (dispatch) => {
    const res = await fetch(`/api/messages/${message_id}`);
    if (res.ok) {
        const message = await res.json();
        dispatch(loadOne(message));
    }
};

export const loadAllChannelMessages = (channel_id) => async (dispatch) => {
    const res = await fetch(`/api/messages/channel/${channel_id}`);
    const messages = await res.json();
    dispatch(loadChannel(messages));
};

export const loadMessagesBetween = (user1_id, user2_id) => async (dispatch) => {
    const res = await fetch(`/api/messages/users/DM/${user1_id}/${user2_id}`);
    if (res.ok) {
        const messages = await res.json();
        dispatch(loadBetween(messages));
    }
};

export const createMessage = (payload) => async (dispatch) => {
    const res = await fetch("/api/messages/", {
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

export const editMessage = (payload) => async (dispatch) => {
    const res = await fetch(`/api/messages/${payload.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    const message = await res.json();
    dispatch(edit(message));
};

export const destroyMessage = (message_id) => async (dispatch) => {
    const res = await fetch(`/api/messages/${message_id}`, {
        method: "DELETE",
    });
    const id = await res.json();
    dispatch(destroy(id));
};
/*-------------REDUCER-------------*/
const initialState = {
    all: null,
    message: null,
    channel: null,
    between: null,
};
export default function reducer(state = initialState, action) {
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
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
}
