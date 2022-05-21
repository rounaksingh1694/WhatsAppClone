import React, { Component, useEffect, useState } from "react";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import "./css/App.css";
import axios from "./axios";
import requests from "./requests";
import { instanceOf } from "prop-types";
import { withCookies, Cookies, useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

const App = () => {
	const [users, setUsers] = useState([]);
	const [chatUser, setChatUser] = useState({});
	const [cookies, setCookies] = useCookies(["userData"]);
	const history = useHistory;

	useEffect(() => {
		function getData() {
			console.log("COOKIES", cookies);
			if (cookies) {
				axios
					.get(`${requests.user.all}/${cookies.userData.user._id}`, {
						headers: {
							Authorization: `Bearer ${cookies.userData.accessToken}`,
						},
					})
					.then((sync) => sync.data)
					.then((data) => {
						const users = data.users;
						console.log("USERS", users);
						setUsers(users);
					});
			} else {
				history.replace("/auth");
			}
		}
		getData();
	}, []);

	const handleChatClick = (user) => {
		setChatUser({});
		console.log("Chat clicked", user);
		setChatUser(user);
	};

	return (
		<div className="app">
			<div className="app_body">
				<Sidebar users={users} onChatClick={handleChatClick} />
				<Chat user={chatUser} />
			</div>
		</div>
	);
};

export default App;
