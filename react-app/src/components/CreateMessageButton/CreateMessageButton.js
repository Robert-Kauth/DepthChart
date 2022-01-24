import React from "react";
import { mdiPlusBox } from "@mdi/js";
import StyledButton from "../StyledButton";
import NewMessageForm from "../NewMessageForm";

export default function CreateMessageButton() {
    return <StyledButton icon={mdiPlusBox} form={NewMessageForm} />;
}
