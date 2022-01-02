/*-------------ACTION.TYPES-------------*/
const LOAD_ALL = "chat/LOAD_ALL";
const LOAD_ONE = "chat/LOAD_ONE";
const CREATE = "chat/CREATE";
const EDIT = "chat/EDIT";
const DESTROY = "chat/DESTROY";
/*-------------ACTIONS-------------*/
export const loadChats = () => async (dispatch) => {
    const res = fetch("/api/chats/");
};
/*-------------THUNK CREATORS-------------*/
/*-------------REDUCER-------------*/
