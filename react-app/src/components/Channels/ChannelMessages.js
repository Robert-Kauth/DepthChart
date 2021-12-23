import React from "react";
import NewMessage from "../Messages/NewMessage";

export default function ChannelMessages() {
    return (
        <div>
            <div>
                <p>Messages from channel</p>
            </div>
            <div>
                <NewMessage />
            </div>
        </div>
    );
}
