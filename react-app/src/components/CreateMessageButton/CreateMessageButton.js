import React from "react";
import { mdiPlusBox } from "@mdi/js";
import StyledButton from "../StyledButton";
import NewMessageForm from "../NewMessageForm";

import styles from "./CreateMessageBar.module.css";
// className={styles. }

export default function CreateMessageButton() {
    return (
        <div className={styles.wrapper}>
            <StyledButton icon={mdiPlusBox} form={NewMessageForm} />
        </div>
    );
}
