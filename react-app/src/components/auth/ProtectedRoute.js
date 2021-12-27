import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = (props) => {
    const isOnline = useSelector((state) => state.session.online);
    const user = useSelector((state) => state.session.user);

    return (
        <Route {...props}>
            {user && isOnline ? (
                props.children
            ) : isOnline && !user ? (
                <Redirect to="/login" />
            ) : null}
        </Route>
    );
};

export default ProtectedRoute;
