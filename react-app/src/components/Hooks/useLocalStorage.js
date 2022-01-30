import { useState, useEffect } from "react";

export default function useLocalStorage(key, defaultValue) {
    const [state, setState] = useState(() => {
        let val;
        try {
            val = JSON.parse(
                window.localStorage.getItem(key) || String(defaultValue)
            );
            console.log(val, "@@@@@VAL@@@@@@");
        } catch (e) {
            val = defaultValue;
            console.log(val, "!!!!!!!!VAL in catch block!!!!!");
        }
        console.log(val, "***********VAL in success*****");
        return val;
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state));
    }, [state, key]);

    return [state, setState];
}
