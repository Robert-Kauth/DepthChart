/*-------------ACTION.TYPES-------------*/
const CREATE = "session/CREATE";
const DESTROY = "session/DESTROY";

/*-------------ACTIONS-------------*/
const createSession = (user) => ({
    type: CREATE,
    user,
});

const destroySession = () => ({
    type: DESTROY,
});

/*-------------THUNK CREATORS-------------*/
export const authenticate = () => async (dispatch) => {
    const response = await fetch("/api/auth/", {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const user = await response.json();
    if (!user.errors) dispatch(createSession(user));
};

export const login = (userInfo) => async (dispatch) => {
    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
    });
    const user = await response.json();
    if (user.errors) {
        return user.errors;
    } else dispatch(createSession(user));
};

export const demoLogin = () => async (dispatch) => {
    const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: "demo@aa.io", password: "password" }),
    });
    const user = await res.json();
    dispatch(createSession(user));
};

export const signUp =
    (username, avatar, email, password) => async (dispatch) => {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                avatar,
                email,
                password,
            }),
        });
        const user = await res.json();
        if (user.errors) {
            return user.errors;
        } else dispatch(createSession(user));
    };

export const logout = () => async (dispatch) => {
    await fetch("/api/auth/logout", {
        headers: {
            "Content-Type": "application/json",
        },
    });
    dispatch(destroySession());
};
/*-------------REDUCER-------------*/

export default function reducer(state = { user: null, online: null }, action) {
    switch (action.type) {
        case CREATE:
            return { ...state, user: action.user, online: true };
        case DESTROY:
            return { ...state, user: null, online: false };
        default:
            return state;
    }
}
