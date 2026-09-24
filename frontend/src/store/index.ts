import {
    combineReducers,
    configureStore as configureReduxStore,
    Store,
    ThunkAction,
    ThunkDispatch,
    UnknownAction,
} from "@reduxjs/toolkit";
import session from "./session";
import users from "./users";
import servers from "./servers";
import user_servers from "./user_servers";
import channels from "./channels";
import messages from "./messages";
import modal from "./modal";
import chats from "./chats";

const rootReducer = combineReducers({
    session,
    users,
    servers,
    user_servers,
    channels,
    messages,
    modal,
    chats,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>;
export type AppThunk<R = void> = ThunkAction<
    Promise<R>,
    RootState,
    unknown,
    UnknownAction
>;

// Explicit return type: inferring it recurses through modal.mount (HTMLElement)
// -> Window -> window.store
export type AppStore = Store<RootState, UnknownAction> & { dispatch: AppDispatch };

// The modal slice holds a DOM node and a React component. The development-only
// serializability and immutability checks would flag them (and walk the DOM
// node's internals), so they skip that slice and the actions that set it.
const MODAL_ACTIONS = ["modal/CURRENT", "modal/MOUNT"];

// Includes thunk middleware; action logging comes from Redux DevTools in development
const configureStore = (): AppStore => {
    return configureReduxStore({
        reducer: rootReducer,
        devTools: import.meta.env.DEV,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                immutableCheck: { ignoredPaths: ["modal"] },
                serializableCheck: {
                    ignoredPaths: ["modal"],
                    ignoredActions: MODAL_ACTIONS,
                },
            }),
    }) as AppStore;
};

export default configureStore;
