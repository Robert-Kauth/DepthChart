import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose,
    AnyAction,
    PreloadedState,
    Store,
    StoreEnhancer,
} from "redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import logger from "redux-logger";
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
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export type AppThunk<R = void> = ThunkAction<
    Promise<R>,
    RootState,
    unknown,
    AnyAction
>;

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

let enhancer: StoreEnhancer;

if (import.meta.env.PROD) {
    enhancer = applyMiddleware(thunk);
} else {
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

// Explicit return type: inferring it recurses through modal.mount (HTMLElement)
// -> Window -> window.store
export type AppStore = Store<RootState, AnyAction> & { dispatch: AppDispatch };

const configureStore = (
    preloadedState?: PreloadedState<RootState>
): AppStore => {
    return createStore(rootReducer, preloadedState, enhancer) as AppStore;
};

export default configureStore;
