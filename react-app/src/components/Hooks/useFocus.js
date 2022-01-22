import { useEffect } from "react";

export default function useFocus(ref) {
    useEffect(() => {
        ref.current.focus();
    }, [ref]);
}
