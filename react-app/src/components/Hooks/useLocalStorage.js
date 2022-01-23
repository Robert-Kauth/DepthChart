import { useState, useEffect } from "react";

export default function useLocalStorageState(key, defaultValue) {
    const [state, setState] = useState(() => {
        let val;
        try {
            val = JSON.parse(
                window.localStorage.getItem(key) || String(defaultValue)
            );
        } catch (e) {
            val = defaultValue;
        }
        return val;
    });
    const toggle = () => {
        setState(!state);
    };

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state));
    }, [state, key]);

    return [state, toggle];
}
