import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiCircleEditOutline } from "@mdi/js";

import { showModal, setCurrentModal } from "../../store/modal";
import EditChannelForm from "./EditChannelForm";
import { loadAllChannelMessages } from "../../store/messages";
import { loadChannel } from "../../store/channels";

import styles from "./ChannelCard.module.css";
// className={styles. }

const Button = styled.button`
    background-color: rgb(1, 68, 33);
    color: rgb(2, 158, 126);
    margin: 0px;
    padding-top: 5px;
    border: 2px solid darkgreen;
    border-radius: 2px;
    box-shadow: lightgreen 0px 0px 5px;
    &:hover {
        background-color: rgb(1, 68, 33);
        color: #0bda51;
    }
`;

const StyledIcon = styled(Icon)`
    width: 1rem;
    height: 1rem;
`;

export default function ChannelCard({ channel }) {
    const dispatch = useDispatch();

    const [selectedChannel, setSelectedChannel] = useState();
    console.log(selectedChannel, "selected Channel outside of fx");

    const selectChannel = () => {
        setSelectedChannel(channel.id);
    };

    useEffect(() => {
        if (selectedChannel) {
            dispatch(loadAllChannelMessages(selectedChannel));
        }
    }, [dispatch, selectedChannel]);

    const showEditChannel = (channel) => {
        console.log(channel.id, "Channel inside of fx");
        dispatch(loadChannel(channel.id));
        dispatch(setCurrentModal(EditChannelForm));
        dispatch(showModal());
    };

    return (
        <div className={styles.wrapper} onClick={selectChannel}>
            <div className={styles.selectButton} value={channel.id}>
                <div className={styles.iconWrapper}>
                    <img src={channel.icon} alt="Channel icon" />
                </div>
                <div className={styles.name}>{channel.name}</div>
                <div className={styles.topic}>{channel.topic}</div>
                <div className={styles.crud}>
                    <Button
                        className={styles.edit}
                        onClick={() => showEditChannel(channel)}>
                        <StyledIcon path={mdiCircleEditOutline} size={1} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
