/*-------------ACTION.TYPES-------------*/
const LOAD = "messages/LOAD";
const CREATE = "messages/CREATE";
const EDIT = "messages/EDIT";
const DESTROY = "messages/DESTROY";
/*-------------ACTIONS-------------*/

const load = (messages) => ({
    type: LOAD,
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

export const loadUserMessages = (userId) => async (dispatch) => {
    const res = await fetch(`/api/messages/${userId}`);
    const messages = await res.json();
    dispatch(load(messages));
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
const initialState = {};
export default function reducer(state = initialState, action) {
    const newState = { ...state };
    switch (action.type) {
        case LOAD:
            return { ...state, ...action.messages };
        case CREATE:
        case EDIT:
            return { ...state, [action.message.id]: action.message };
        case DESTROY:
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
}
