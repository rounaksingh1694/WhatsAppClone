import React, { Component } from "react";
import "../css/Chat.css";

const MessageSent = ({ message }) => {
	return (
		<p className="chat_message_sent">
			<span className="chat_message_main">{message.message}</span>
			<span className="chat_timestamp">
				{new Date(message.updatedAt).toLocaleTimeString()}
			</span>
		</p>
	);
};

export default MessageSent;
