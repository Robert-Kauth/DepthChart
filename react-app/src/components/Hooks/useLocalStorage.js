import { useState, useEffect } from "react";

export default function useLocalStorage(key, defaultValue) {
    const [state, setState] = useState(() => {
        let val;
        // Gets avatar value from browser local storage or assigns defaultValue
        val =
            JSON.parse(window.localStorage.getItem(key)) ||
            JSON.stringify(defaultValue);
        return val;
    });

    // used to update state
    const updateLS = () => {
        setState(window.localStorage.setItem(key, JSON.stringify(state)));
    };

    //Updates browsers stored value of avatar upon changes
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state));
    }, [state, key]);

    return [state, updateLS];
}
