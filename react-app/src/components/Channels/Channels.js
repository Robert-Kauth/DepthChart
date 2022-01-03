import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiPlusBox } from "@mdi/js";

import ChannelCard from "./ChannelCard";
import { showModal, setCurrentModal } from "../../store/modal";
import CreateChannelForm from "./CreateChannelForm";
// import AddChannelModal from "./AddChannelModal";
import { loadChannels } from "../../store/channels";

import styles from "./Channels.module.css";
// className={styles. }

const Button = styled.button`
    background-color: #014421;
    color: #029e7e;
    margin: 0;
    padding-top: 5px;
    border: 2px solid darkgreen;
    border-radius: 2px;
    box-shadow: 0 0 5px lightgreen;
    &:hover {
        background-color: #0bda51;
        color: #014421;
    }
`;

const StyledIcon = styled(Icon)`
    width: 1rem;
    height: 1rem;
`;

export default function Channels({ serverId }) {
    const dispatch = useDispatch();

    const channels = useSelector((state) => state.channels.all);

    let serverChannels;
    if (channels) {
        serverChannels = Object.values(channels).reduce((a, channel) => {
            if (channel?.server_id === +serverId) {
                a.push(channel);
            }
            return a;
        }, []);
    }

    useEffect(() => {
        dispatch(loadChannels());
    }, [dispatch]);

    const showCreateChannel = () => {
        dispatch(setCurrentModal(CreateChannelForm));
        dispatch(showModal());
    };

    return (
        <div className={styles.channelsWrapper}>
            <p className={styles.title}>Channels</p>
            {serverChannels ? (
                serverChannels.map((channel) => (
                    <ChannelCard key={channel.id} channel={channel} />
                ))
            ) : (
                <div className={styles.msgContainer}>
                    <p className={styles.msg}>No Channels Exist</p>
                    <p className={styles.msg}>Click + to create one</p>
                </div>
            )}
            <div className={styles.wrapper}>
                <Button className={styles.button} onClick={showCreateChannel}>
                    <StyledIcon path={mdiPlusBox} size={1} />
                </Button>
            </div>
        </div>
    );
}
