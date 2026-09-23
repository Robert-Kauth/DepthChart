import { useEffect, MouseEvent } from "react";
import { mdiPlusBox } from "@mdi/js";

import { loadChannel, loadChannels } from "../../store/channels";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { Channel } from "../../types";

import StyledButton from "../StyledComponents/StyledButton";
import Title from "../Title";
import ChannelCard from "../ChannelCard";
import CreateChannelForm from "../CreateChannelForm";

import styles from "./Channels.module.css";
// className={styles. }

export default function Channels({ serverId }: { serverId: string }) {
    const dispatch = useAppDispatch();

    const channels = useAppSelector((state) => state.channels.all);

    let serverChannels: Channel[] | undefined;
    if (channels) {
        serverChannels = Object.values(channels).reduce<Channel[]>(
            (a, channel) => {
                if (channel?.server_id === +serverId) {
                    a.push(channel);
                }
                return a;
            },
            []
        );
    }

    useEffect(() => {
        dispatch(loadChannels());
    }, [dispatch]);

    const selectChannel = (e: MouseEvent, channel: Channel) => {
        e.preventDefault();
        if (channel) {
            dispatch(loadChannel(channel.id));
        }
    };

    return (
        <div className={styles.channelsWrapper}>
            <div className={styles.titleWrapper}>
                <Title
                    title="Channels"
                    button={
                        <StyledButton
                            icon={mdiPlusBox}
                            form={CreateChannelForm}
                        />
                    }
                />
            </div>
            {serverChannels
                ? serverChannels.map((channel) => (
                      <div className={styles.buttonWrapper} key={channel.id}>
                          <button
                              className={styles.button}
                              onClick={(e) => selectChannel(e, channel)}>
                              <ChannelCard channel={channel} />
                          </button>
                      </div>
                  ))
                : null}
        </div>
    );
}
