import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CreateMessage() {
    const dispatch = useDispatch();

    return (
        <div>
            <select>
                <option>---Select a Friend---</option>
            </select>
        </div>
    );
}
