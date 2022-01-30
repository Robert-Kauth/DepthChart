import React from "react";

import Title from "../Title";
import UserInfo from "../UserInfo";
import FollowButton from "../FollowButton";
import MutualServers from "../MutualServers";
import StyledButton from "../StyledComponents/StyledButton";
import EditChannelForm from "../EditChannelForm";

import { mdiCircleEditOutline } from "@mdi/js";

import styles from "./FeedTitleBar.module.css";
// className={styles. }

export default function FeedTitleBar({ user, channel }) {
    return (
        <>
            {user ? (
                <div className={styles.wrapper}>
                    <UserInfo user={user} />
                    <div className={styles.text}>
                        This is the beginning of your direct message history
                        with {`${user.username}`}
                    </div>
                    <div className={styles.lower}>
                        <MutualServers user={user} />
                        <FollowButton user={user} />
                    </div>
                </div>
            ) : channel ? (
                <div className={styles.channelWrapper}>
                    <Title title={channel.name} />
                    <div className={styles.button}>
                        <StyledButton
                            icon={mdiCircleEditOutline}
                            form={EditChannelForm}
                        />
                    </div>
                </div>
            ) : null}
        </>
    );
}
