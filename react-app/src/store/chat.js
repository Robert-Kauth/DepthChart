/*-------------ACTION.TYPES-------------*/
const LOAD_ALL = "chat/LOAD_ALL";
const LOAD_ONE = "chat/LOAD_ONE";
const CREATE = "chat/CREATE";
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

const create = (chat) => ({
    type: CREATE,
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
export const loadChat = (chat_id) => async (dispatch) => {
    const res = fetch(`/api/chats/${chat_id}`);
    if (res.ok) {
        const chat = res.json();
        dispatch();
    }
};
/*-------------REDUCER-------------*/
