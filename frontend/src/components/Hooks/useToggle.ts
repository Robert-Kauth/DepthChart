import { useState } from "react";

export default function useToggle(initialVal: boolean) {
    const [state, setState] = useState(initialVal);
    const toggle = () => {
        setState(!state);
    };
    return [state, toggle] as const;
}
