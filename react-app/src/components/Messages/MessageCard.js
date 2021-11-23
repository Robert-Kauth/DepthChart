import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMessagedUsers } from "../../store/messages";

import styles from "./MessageCard.module.css";
// className={styles. }

export default function MessageCard({ message }) {
    const dispatch = useDispatch();

    const messagedUser = useSelector((state) => state.messages.messaged_users);
    console.log(messagedUser, "messageduser");

    let avatar;
    if (messagedUser) {
        avatar = messagedUser[messagedUser.id]?.avatar;
    }
    console.log(avatar);
    useEffect(() => {
        dispatch(getMessagedUsers(message.id));
    }, [dispatch, message.id]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.channelInfo}>
                <div className={styles.name}>
                    {messagedUser ? messagedUser.username : null}
                </div>
                <div className={styles.iconWrapper}>
                    {messagedUser ? (
                        <img
                            className={styles.icon}
                            src={messagedUser[messagedUser.id]?.avatar}
                            alt="user avatar"
                        />
                    ) : (
                        <img
                            src="https://fantasydepthchart.s3.us-west-1.amazonaws.com/NFL_logos/nfl.png"
                            alt="default nfl logo"
                        />
                    )}
                </div>
            </div>
            <div className={styles.messageInfo}>
                <div className={styles.content}>{message.content}</div>
                <div className={styles.updated}>{message.updated_at}</div>
            </div>
        </div>
    );
}
