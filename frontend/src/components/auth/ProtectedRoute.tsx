import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "../../store/hooks";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const isOnline = useAppSelector((state) => state.session.online);
    const user = useAppSelector((state) => state.session.user);

    return user && isOnline ? (
        children
    ) : isOnline && !user ? (
        <Navigate to="/login" replace />
    ) : null;
}
