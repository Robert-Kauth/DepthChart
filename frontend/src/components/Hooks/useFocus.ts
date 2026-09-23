import { useEffect, RefObject } from "react";

export default function useFocus(ref: RefObject<HTMLElement>) {
    useEffect(() => {
        ref.current!.focus();
    }, [ref]);
}
