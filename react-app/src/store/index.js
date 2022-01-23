import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
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

let enhancer;

if (process.env.NODE_ENV === "production") {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require("redux-logger").default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
