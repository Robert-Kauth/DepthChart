import { Route, Redirect, RouteProps } from "react-router-dom";

import { useAppSelector } from "../../store/hooks";

export default function ProtectedRoute(props: RouteProps) {
    const isOnline = useAppSelector((state) => state.session.online);
    const user = useAppSelector((state) => state.session.user);

    return (
        <Route {...props}>
            {user && isOnline ? (
                props.children
            ) : isOnline && !user ? (
                <Redirect to="/login" />
            ) : null}
        </Route>
    );
}
