/*-------------ACTION.TYPES-------------*/
const LOAD = "messages/LOAD";
const GET_USERS = "messages/GET_USERS";
const GET_SENT = "messages/GET_SENT";
const GET_RECIEVED = "messages/GET_RECIEVED";
const CREATE = "messages/CREATE";
const EDIT = "messages/EDIT";
const DESTROY = "messages/DESTROY";
/*-------------ACTIONS-------------*/

const load = (messages) => ({
    type: LOAD,
    messages,
});

const get = (messaged_users) => ({
    type: GET_USERS,
    messaged_users,
});
const getSent = (sent_messages) => ({
    type: GET_SENT,
    sent_messages,
});
const getRecieved = (recieved_messages) => ({
    type: GET_RECIEVED,
    recieved_messages,
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

export const loadAllUserMessages = (userId) => async (dispatch) => {
    const res = await fetch(`/api/messages/${userId}`);
    const messages = await res.json();
    dispatch(load(messages));
};

export const loadAllChannelMessages = (channel_id) => async (dispatch) => {
    const res = await fetch(`/api/messages/channel/${channel_id}`);
    const messages = await res.json();
    dispatch(load(messages));
};

export const getMessagedUsers = (message_id) => async (dispatch) => {
    const res = await fetch(`/api/messages/recipients/${message_id}`);
    const messaged_users = await res.json();
    dispatch(get(messaged_users));
};

export const loadSentMessages = (userId) => async (dispatch) => {
    const res = await fetch(`/api/messages/sent/${userId}`);
    const sentMessages = await res.json();
    dispatch(getSent(sentMessages));
};

export const loadReceivedMessages = (userId) => async (dispatch) => {
    const res = await fetch(`/api/messages/received/${userId}`);
    const receivedMessages = await res.json();
    dispatch(getRecieved(receivedMessages));
};

export const createMessage = (payload) => async (dispatch) => {
    const res = await fetch("/api/messages/", {
        methods: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    const message = await res.json();
    dispatch(create(message));
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
    all_messages: null,
    messaged_users: null,
    sent: null,
    recieved: null,
};
export default function reducer(state = initialState, action) {
    const newState = { ...state };
    switch (action.type) {
        case LOAD:
            return { ...state, all_messages: action.messages };
        case GET_USERS:
            return {
                ...state,
                messaged_users: action.messaged_users,
            };
        case GET_SENT:
            return { ...state, sent: action.sent_messages };
        case GET_RECIEVED:
            return { ...state, recieved: action.recieved_messages };
        case CREATE:
        case EDIT:
            newState[action.message.id] = action.message;
            return newState;
        case DESTROY:
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
}
