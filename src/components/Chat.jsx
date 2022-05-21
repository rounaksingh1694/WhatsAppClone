import { Avatar, IconButton } from "@material-ui/core";
import React, { Component, useEffect, useState, useRef } from "react";
import "../css/Chat.css";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import SendIcon from "@material-ui/icons/Send";
import axios from "../axios";
import requests from "../requests";
import MessageSent from "./MessageSent";
import MessageReceived from "./MessageReceived";
import { useCookies } from "react-cookie";
import Pusher from "pusher-js";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:8000");

const Chat = ({ user }) => {
	var [messages, setMessages] = useState([]);
	const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
	const [message, setMessage] = useState("");
	const [chatId, setChatId] = useState("");
	const [puseherCall, setPushercall] = useState(0);

	const messagesEndRef = useRef();
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	const listenToPusher = (pusherChatId) => {
		// const pusher = new Pusher("3f189e635e4d79430b92", {
		// 	cluster: "ap2",
		// });

		// console.log("ENTERED PUSHER IF");
		// const channel = pusher.subscribe(pusherChatId);

		// channel.bind("new", function (data) {
		// 	console.log("PUSHER CALL", puseherCall + 1);
		// 	setPushercall(puseherCall + 1);
		// 	setChatId(data.chatId);
		// 	const newMessages = messages;
		// 	newMessages.push(data.message);
		// 	setMessages(messages.concat([data.message]));
		// 	console.log("NEW MESSAGES", messages);
		// 	console.log("MESSAGES", messages);
		// 	console.log("PUSHER DATA", JSON.stringify(data));
		// });

		// console.log("OUSHER CHAT ID", pusherChatId);

		socket.on(pusherChatId, (data) => {
			console.log("DATA", data);
			setMessages((msgs) => [...msgs, data.message]);
		});

		// return () => {
		// 	channel.unbind_all();
		// 	channel.unsubscribe();
		// };
	};

	useEffect(() => {
		scrollToBottom();
		console.log("CHAT USER", user);
		setMessages([]);
		function sync() {
			console.log("MESSAGES", messages);
			console.log("USER", user);
			console.log("COOKIES0", cookies);
			if (cookies.userData.user.chats) {
				console.log("MAPPING THROUGH");
				setChatId("");
				cookies.userData.user.chats.map((chat) => {
					if (chat.with == user._id) {
						console.log("FOUND CHAT");
						listenToPusher(chat.chat);
						setChatId(chat.chat);
						axios
							.post(
								`${requests.chat.sync}/${cookies.userData.user._id}`,
								{
									from: cookies.userData.user._id,
									to: user._id,
									chatId: chat.chat,
								},
								{
									headers: {
										Authorization: `Bearer ${cookies.userData.accessToken}`,
									},
								}
							)
							.then((res) => res.data)
							.then((data) => {
								setMessages(data.chat.messages);
								console.log("SYNC", data);
							});
					}
				});
			}
		}
		sync();
	}, [user]);

	const sendMessage = (message) => {
		console.log("SENDING MESSAGE TO", user);
		const payload = {
			from: cookies.userData.user._id,
			to: user._id,
			message: message,
			chatId: chatId,
		};
		console.log("PAYLOAD", payload);
		axios
			.post(
				`${requests.chat.sendMessage}/${cookies.userData.user._id}`,
				payload,
				{
					headers: {
						Authorization: `Bearer ${cookies.userData.accessToken}`,
					},
				}
			)
			.then((res) => res.data)
			.then((data) => {
				console.log("Message Sent", data);
				setChatId(data._id);
				// setMessages(data.messages);
				let isPresent = false;
				const ck = cookies.userData;
				const userC = cookies.userData.user;
				userC.chats.map((chat) => {
					if (chat.chat == data._id) {
						isPresent = true;
						return;
					}
				});
				if (isPresent == false) {
					if (userC.chats) {
						userC.chats.push({ chat: data._id, with: user._id });
					} else {
						userC.chats = [{ chat: data._id, with: user._id }];
					}
					listenToPusher(data._id);
					setCookie(
						"userData",
						{ accessToken: ck.accessToken, user: userC },
						{ path: "/" }
					);
					console.log("NEW COOKIE", cookies.userData);
				}
			});
	};

	return (
		<div className="chat">
			<header className="chat_header">
				<Avatar />
				<div className="chat_header_info">
					<h3>{user.name}</h3>
				</div>
				<div className="chat_header_right">
					<IconButton>
						<SearchIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</header>

			<div ref={messagesEndRef} className="chat_body">
				{messages.map((message) => {
					console.log("MSGG", message);
					if (message !== undefined) {
						if (message.to == cookies.userData.user._id)
							return <MessageReceived message={message} />;
						else return <MessageSent message={message} />;
					}
				})}
			</div>

			<div className="chat_input_">
				<IconButton>
					<InsertEmoticonIcon />
				</IconButton>
				<IconButton>
					<AttachFileIcon />
				</IconButton>
				<form
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							console.log("MESSAGE", message);
							sendMessage(message);
							setMessage("");
						}
					}}
				>
					<input
						type="text"
						value={message}
						placeholder="Type a massage"
						onChange={(event) => setMessage(event.target.value)}
					/>
					<IconButton onClick={() => console.log("SENDING")}>
						<SendIcon />
					</IconButton>
				</form>
			</div>
		</div>
	);
};

export default Chat;
