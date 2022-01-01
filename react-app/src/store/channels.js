/*-------------ACTION.TYPES-------------*/
const LOAD_ALL = "channels/LOAD_ALL";
const LOAD = "channels/LOAD";
const CREATE = "channels/CREATE";
const EDIT = "channels/EDIT";
const DESTROY = "channels/DESTROY";
/*-------------ACTIONS-------------*/
const load = (channels) => ({
    type: LOAD_ALL,
    channels,
});

const loadOne = (channel) => ({
    type: LOAD,
    channel,
});

const create = (channel) => ({
    type: CREATE,
    channel,
});

const edit = (channel) => ({
    type: EDIT,
    channel,
});

const destroy = (id) => ({
    type: DESTROY,
    id,
});
/*-------------THUNK CREATORS-------------*/
export const loadChannels = () => async (dispatch) => {
    const res = await fetch("/api/channels/");
    const channels = await res.json();
    dispatch(load(channels));
};

export const loadChannel = (id) => async (dispatch) => {
    const res = await fetch(`/api/channels/${id}`);
    const channel = await res.json();
    dispatch(loadOne(channel));
};

export const createChannel = (payload) => async (dispatch) => {
    const res = await fetch("/api/channels/", {
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

export const editChannel = (payload) => async (dispatch) => {
    const res = await fetch(`/api/channels/${payload.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    const channel = await res.json();
    dispatch(edit(channel));
};

export const destroyChannel = (channelId) => async (dispatch) => {
    const res = await fetch(`/api/channels/${channelId}`, {
        method: "DELETE",
    });
    const id = await res.json();
    dispatch(destroy(id));
};
/*-------------REDUCER-------------*/
const initialState = { all: null, one: null };

export default function reducer(state = initialState, action) {
    const newState = { ...state };
    switch (action.type) {
        case LOAD_ALL:
            return { ...state, all: action.channels };
        case LOAD:
            return { ...state, one: action.channel };
        case CREATE:
            newState[action.channel.id] = action.channel;
            return newState;
        case EDIT:
            return { ...state, [action.channel.id]: action.channel };
        case DESTROY:
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
}
