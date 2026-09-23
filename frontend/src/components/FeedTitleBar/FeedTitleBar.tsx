import Title from "../Title";
import UserInfo from "../UserInfo";
import FollowButton from "../FollowButton";
import MutualServers from "../MutualServers";
import StyledButton from "../StyledComponents/StyledButton";
import EditChannelForm from "../EditChannelForm";
import type { Channel, User } from "../../types";

import { mdiCircleEditOutline } from "@mdi/js";

import styles from "./FeedTitleBar.module.css";
// className={styles. }

interface FeedTitleBarProps {
    user?: User | null;
    channel?: Channel | null;
}

export default function FeedTitleBar({ user, channel }: FeedTitleBarProps) {
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
                        <FollowButton />
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
