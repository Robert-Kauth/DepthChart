// Shapes returned by the Flask models' to_dict() methods

export interface User {
    id: number;
    username: string;
    email: string;
    avatar: string;
    servers: number[];
    owned_servers: number[];
    follows: number[];
}

export interface Server {
    id: number;
    name: string;
    topic: string;
    icon: string;
    owner_id: number;
    user_ids: number[];
    channel_ids: number[];
}

export interface Channel {
    id: number;
    server_id: number;
    name: string;
    topic: string;
    icon: string;
    channel_messages: number[];
}

export interface Message {
    id: number;
    channel_id: number | null;
    is_channel_message: boolean;
    sender_id: number;
    recipient_id: number | null;
    content: string;
    sent_at: string;
    updated_at: string;
}

export interface Chat {
    id: number;
    content: string;
    sender_id: number;
    recipient_id: number;
    sent_at: string;
    created_at: string;
    updated_at: string;
}

export interface UserServer {
    id: number;
    user_id: number;
    server_id: number;
}

// API collections are keyed by id
export type ById<T> = Record<number, T>;
