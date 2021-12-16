import React from "react";
import { useSelector } from "react-redux";

export default function CreateMessage() {
    const user = useSelector((state) => state.session.user.id);

    return (
        <div>
            <select>
                <option>---Select a Friend---</option>
            </select>
        </div>
    );
}
