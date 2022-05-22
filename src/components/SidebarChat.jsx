import { Avatar } from "@material-ui/core";
import React, { Component, useEffect, useState } from "react";
import "../css/SidebarChat.css";
import axios from "../axios";
import requests from "../requests";
import { useCookies } from "react-cookie";

const SidebarChat = ({ user, onChatClick }) => {
	console.log("SIDE USER CHAT", user);

	const [cookies, setCookies] = useCookies(["userData"]);
	const [lastMessage, setLastMessage] = useState("");

	useEffect(() => {
		console.log("COOKIES!", cookies);
		function getLastMessage() {
			console.log("COOKIES!", cookies);
			if (cookies.userData.user.chats) {
				console.log("MAPPING THROUGH");
				cookies.userData.user.chats.map((chat) => {
					if (chat.with == user._id) {
						console.log("FOUND CHAT");
						const chatId = chat.chat;
						axios
							.post(
								`${requests.chat.last}/${cookies.userData.user._id}`,
								{
									from: cookies.userData.user._id,
									to: user._id,
									chatId: chatId,
								},
								{
									headers: {
										Authorization: `Bearer ${cookies.userData.accessToken}`,
									},
								}
							)
							.then((res) => res.data)
							.then((data) => {
								console.log("LAST MESSAGE", data);
								setLastMessage(data.chat.lastMessage);
							});
					}
				});
			}
		}
		getLastMessage();
	});

	return (
		<div className="sidebar_chat" onClick={() => onChatClick(user)}>
			<Avatar src={user.profilePhoto} />
			<div className="sidebar_chat_info">
				<h3>{user.name}</h3>
				<p>
					{lastMessage.from == cookies.userData.user._id
						? "You: " + lastMessage.message
						: lastMessage.message}
				</p>
			</div>
		</div>
	);
};

export default SidebarChat;
