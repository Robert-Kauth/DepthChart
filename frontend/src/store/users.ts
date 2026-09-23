import type { AppThunk } from ".";
import type { ById, User } from "../types";

/*-------------ACTION.TYPES-------------*/
const LOAD_ALL = "users/LOAD_ALL";
const LOAD_ONE = "user/LOAD_ONE";
const DESTROY = "user/DESTROY";
const UPLOAD = "user/UPLOAD";

/*-------------ACTIONS-------------*/

const loadAll = (users: ById<User>) =>
    ({
        type: LOAD_ALL,
        users,
    } as const);

const loadOne = (user: User) =>
    ({
        type: LOAD_ONE,
        user,
    } as const);

const destroyOne = (id: number) =>
    ({
        type: DESTROY,
        id,
    } as const);

const upload = (fileUrl: string) =>
    ({
        type: UPLOAD,
        fileUrl,
    } as const);

type UserAction =
    | ReturnType<typeof loadAll>
    | ReturnType<typeof loadOne>
    | ReturnType<typeof destroyOne>
    | ReturnType<typeof upload>;

/*-------------THUNK CREATORS-------------*/

export const loadUsers = (): AppThunk => async (dispatch) => {
    const res = await fetch("/api/users/");
    const users = await res.json();
    dispatch(loadAll(users));
};

export const loadUser =
    (userId: number | string): AppThunk =>
    async (dispatch) => {
        const res = await fetch(`/api/users/${userId}`);
        const user = await res.json();
        dispatch(loadOne(user));
    };

export const uploadFile =
    (fileForm: { user_id: number; file: File }): AppThunk =>
    async (dispatch) => {
        const { user_id, file } = fileForm;

        const form = new FormData();
        form.append("user_id", String(user_id));
        form.append("file", file);

        const res = await fetch(`/api/users/${user_id}`, {
            method: "POST",
            body: form,
        });

        const fileUrl = await res.json();
        dispatch(upload(fileUrl));
    };

export const destroyUser =
    (userId: number): AppThunk =>
    async (dispatch) => {
        const res = await fetch(`/api/users/${userId}`, {
            method: "DELETE",
        });
        const id = await res.json();
        dispatch(destroyOne(id));
    };
/*-------------REDUCER-------------*/
interface UsersState {
    all: ById<User> | null;
    user: User | null;
}

const initialState: UsersState = { all: null, user: null };

export default function reducer(
    state: UsersState = initialState,
    action: UserAction
): UsersState {
    switch (action.type) {
        case LOAD_ALL:
            return { ...state, all: action.users };
        case LOAD_ONE:
            return { ...state, user: action.user };
        case DESTROY: {
            const newState = { ...state };
            delete (newState as Record<number, unknown>)[action.id];
            return newState;
        }
        default:
            return state;
    }
}
