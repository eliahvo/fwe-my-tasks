import React from "react";
import styles from "./Message.module.css";

export enum MessageType {
    INFO = "info",
    ERROR = "error",
    NONE = "",
}

export const Message: React.FC<{
    type?: string
}> = ({ children, type = MessageType.NONE }) => {
    return <div className={`message ${styles[type]}`}>{children}</div>;
};