import React, { useState } from "react";

export default function ServerInfo({ server }) {
    const [topic, setTopic] = useState("");

    return (
        <fieldset>
            <label>Topic</label>
            <input
                type="text"
                value={topic}
                placeholder={server.topic}
                onChange={(e) => setTopic(e.target.value)}
            />
        </fieldset>
    );
}
