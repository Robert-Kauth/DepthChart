import type { AppThunk } from ".";
import type { User } from "../types";
import csrfFetch from "./csrfFetch";

/*-------------ACTION.TYPES-------------*/
const CREATE = "session/CREATE";
const DESTROY = "session/DESTROY";

/*-------------ACTIONS-------------*/
const createSession = (user: User) =>
    ({
        type: CREATE,
        user,
    } as const);

const destroySession = () =>
    ({
        type: DESTROY,
    } as const);

type SessionAction =
    | ReturnType<typeof createSession>
    | ReturnType<typeof destroySession>;

export interface LoginInfo {
    email: string;
    password: string;
}

export interface SignupInfo {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
}

/*-------------THUNK CREATORS-------------*/
export const authenticate = (): AppThunk => async (dispatch) => {
    const response = await csrfFetch("/api/auth/", {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const user = await response.json();
    if (!user.errors) dispatch(createSession(user));
};

export const login =
    (userInfo: LoginInfo): AppThunk<string[] | undefined> =>
    async (dispatch) => {
        const response = await csrfFetch("/api/auth/login", {
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

export const demoLogin = (): AppThunk => async (dispatch) => {
    const res = await csrfFetch("/api/auth/login", {
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
    (userInfo: SignupInfo): AppThunk<string[] | undefined> =>
    async (dispatch) => {
        const res = await csrfFetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo),
        });
        const user = await res.json();
        if (user.errors) {
            return user.errors;
        } else dispatch(createSession(user));
    };

export const logout = (): AppThunk => async (dispatch) => {
    await csrfFetch("/api/auth/logout", {
        headers: {
            "Content-Type": "application/json",
        },
    });
    dispatch(destroySession());
};
/*-------------REDUCER-------------*/

interface SessionState {
    user: User | null;
    online: boolean | null;
}

export default function reducer(
    state: SessionState = { user: null, online: null },
    action: SessionAction
): SessionState {
    switch (action.type) {
        case CREATE:
            return { ...state, user: action.user, online: true };
        case DESTROY:
            return { ...state, user: null, online: false };
        default:
            return state;
    }
}
